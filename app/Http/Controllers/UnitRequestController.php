<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemRequest;
use App\Models\ItemRequestDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class UnitRequestController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'items' => Item::where('is_active', true)
                ->where('stok', '>', 0)
                ->orderBy('nama_simaset')
                ->get(),
        ]);
    }

    public function adminIndex(Request $request)
    {
        $query = ItemRequest::with(['details.item']);

        if ($request->filled('date')) {
            $query->whereDate('request_date', $request->date);
        } elseif ($request->filled('month') || $request->filled('year')) {
            if ($request->filled('month')) {
                $query->whereMonth('request_date', $request->month);
            }
            if ($request->filled('year')) {
                $query->whereYear('request_date', $request->year);
            }
        } else {
            // Default: Show today's requests
            $query->whereDate('request_date', now()->toDateString());
        }

        $itemRequests = $query->orderBy('request_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('ItemRequests/Index', [
            'itemRequests' => $itemRequests,
            'filters' => $request->only(['date', 'month', 'year']),
        ]);
    }

    public function destroy($id)
    {
        $request = ItemRequest::findOrFail($id);
        $request->details()->delete();
        $request->delete();

        return redirect()->back()->with('success', 'Permintaan berhasil dihapus.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'unit_name' => 'required|string|max:255',
            'recipient_name' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'request_date' => 'required|date',
            'signature' => 'required|string',
            'details' => 'required|array|min:1',
            'details.*.item_id' => 'required|exists:items,id',
            'details.*.quantity' => 'required|integer|min:1',
            'details.*.notes' => 'nullable|string',
        ]);

        try {
            DB::transaction(function () use ($request) {
                $itemRequest = ItemRequest::create([
                    'unit_name' => $request->unit_name,
                    'recipient_name' => $request->recipient_name,
                    'phone_number' => $request->phone_number,
                    'request_date' => $request->request_date,
                    'signature' => $request->signature,
                    'status' => 'Pending',
                ]);

                foreach ($request->details as $detail) {
                    ItemRequestDetail::create([
                        'item_request_id' => $itemRequest->id,
                        'item_id' => $detail['item_id'],
                        'quantity' => $detail['quantity'],
                        'notes' => $detail['notes'] ?? null,
                    ]);
                }
            });

            return back()->with('success', 'Permintaan barang berhasil dikirim!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal mengirim permintaan: ' . $e->getMessage()]);
        }
    }
}
