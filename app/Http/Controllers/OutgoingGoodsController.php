<?php

namespace App\Http\Controllers;

use App\Models\StockTransaction;
use App\Models\Item;
use App\Models\StockTransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OutgoingGoodsController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->input('month', now()->format('Y-m'));
        
        $transactions = StockTransaction::with(['details.item', 'user'])
            ->where('type', 'Keluar')
            ->where('transaction_date', 'like', "$month%")
            ->orderBy('transaction_date', 'desc')
            ->paginate(10)->withQueryString();

        return Inertia::render('OutgoingGoods/Index', [
            'transactions' => $transactions,
            'currentMonth' => $month
        ]);
    }

    public function create(Request $request)
    {
        $requestId = $request->query('request_id');
        $itemRequest = null;
        if ($requestId) {
            $itemRequest = \App\Models\ItemRequest::with('details.item')->find($requestId);
        }

        return Inertia::render('OutgoingGoods/Create', [
            'items' => Item::orderBy('nama_simaset')->get(),
            'itemRequest' => $itemRequest
        ]);
    }

    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('Outgoing Store Request:', $request->all());
        $request->validate([
            'reference' => 'required|string',
            'recipient_name' => 'required|string',
            'recipient_signature' => 'nullable|string',
            'transaction_date' => 'required|date',
            'details' => 'required|array|min:1',
            'details.*.item_id' => 'required|exists:items,id',
            'details.*.quantity' => 'required|integer|min:1',
            'details.*.notes' => 'nullable|string',
            'signature' => 'nullable|string',
        ]);

        // Optional: Check stock before transaction
        foreach ($request->details as $detail) {
            $item = Item::find($detail['item_id']);
            if ($item->stok < $detail['quantity']) {
                return redirect()->back()->withErrors(['details' => "Stok untuk {$item->nama_simaset} tidak mencukupi."]);
            }
        }

        DB::transaction(function () use ($request) {
            $transaction = StockTransaction::create([
                'type' => 'Keluar',
                'reference' => $request->reference,
                'transaction_date' => $request->transaction_date,
                'user_id' => auth()->id(),
                'signature' => $request->signature,
                'recipient_name' => $request->recipient_name,
                'recipient_signature' => $request->recipient_signature,
            ]);

            foreach ($request->details as $detail) {
                StockTransactionDetail::create([
                    'stock_transaction_id' => $transaction->id,
                    'item_id' => $detail['item_id'],
                    'quantity' => $detail['quantity'],
                    'notes' => $detail['notes'] ?? null,
                ]);

                $item = Item::find($detail['item_id']);
                $item->decrement('stok', $detail['quantity']);
            }

            if ($request->item_request_id) {
                \App\Models\ItemRequest::where('id', $request->item_request_id)->update(['status' => 'Approved']);
            }
        });

        return redirect()->route('outgoing-goods.index')->with('success', 'Barang keluar berhasil dicatat.');
    }

    public function print($id)
    {
        $transaction = StockTransaction::with(['details.item', 'user', 'vendor'])->findOrFail($id);
        return Inertia::render('Transactions/Print', [
            'transaction' => $transaction,
            'type' => 'outgoing'
        ]);
    }
}
