<?php

namespace App\Http\Controllers;

use App\Models\StockTransaction;
use App\Models\Item;
use App\Models\Vendor;
use App\Models\StockTransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class IncomingGoodsController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->input('month', now()->format('Y-m'));
        
        $transactions = StockTransaction::with(['details.item', 'user', 'vendor'])
            ->where('type', 'Masuk')
            ->where('transaction_date', 'like', "$month%")
            ->orderBy('transaction_date', 'desc')
            ->paginate(10)->withQueryString();

        return Inertia::render('IncomingGoods/Index', [
            'transactions' => $transactions,
            'currentMonth' => $month
        ]);
    }

    public function create()
    {
        return Inertia::render('IncomingGoods/Create', [
            'items' => Item::orderBy('nama_simaset')->get(),
            'vendors' => Vendor::orderBy('name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'transaction_date' => 'required|date',
            'details' => 'required|array|min:1',
            'details.*.item_id' => 'required|exists:items,id',
            'details.*.quantity' => 'required|integer|min:1',
            'details.*.notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request) {
            $transaction = StockTransaction::create([
                'type' => 'Masuk',
                'vendor_id' => $request->vendor_id,
                'transaction_date' => $request->transaction_date,
                'user_id' => auth()->id(),
            ]);

            foreach ($request->details as $detail) {
                StockTransactionDetail::create([
                    'stock_transaction_id' => $transaction->id,
                    'item_id' => $detail['item_id'],
                    'quantity' => $detail['quantity'],
                    'notes' => $detail['notes'] ?? null,
                ]);

                $item = Item::find($detail['item_id']);
                $item->increment('stok', $detail['quantity']);
            }
        });

        return redirect()->route('incoming-goods.index')->with('success', 'Barang masuk berhasil dicatat.');
    }

    public function print($id)
    {
        $transaction = StockTransaction::with(['details.item', 'user', 'vendor'])->findOrFail($id);
        return Inertia::render('Transactions/Print', [
            'transaction' => $transaction,
            'type' => 'incoming'
        ]);
    }
}
