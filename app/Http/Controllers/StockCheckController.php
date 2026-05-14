<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StockCheckController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->input('month', now()->format('Y-m'));
        $date = Carbon::createFromFormat('Y-m', $month);
        $startOfMonth = $date->copy()->startOfMonth()->format('Y-m-d');
        
        $items = Item::paginate(10)->withQueryString()->through(function ($item) use ($month, $startOfMonth) {
            // Stok Awal Bulan Ini: Item->stok_awal + (Semua Masuk Sebelum Bulan Ini) - (Semua Keluar Sebelum Bulan Ini)
            $totalMasukBefore = DB::table('stock_transaction_details')
                ->join('stock_transactions', 'stock_transaction_details.stock_transaction_id', '=', 'stock_transactions.id')
                ->where('stock_transaction_details.item_id', $item->id)
                ->where('stock_transactions.type', 'Masuk')
                ->where('stock_transactions.transaction_date', '<', $startOfMonth)
                ->sum('quantity');

            $totalKeluarBefore = DB::table('stock_transaction_details')
                ->join('stock_transactions', 'stock_transaction_details.stock_transaction_id', '=', 'stock_transactions.id')
                ->where('stock_transaction_details.item_id', $item->id)
                ->where('stock_transactions.type', 'Keluar')
                ->where('stock_transactions.transaction_date', '<', $startOfMonth)
                ->sum('quantity');

            $stokAwalBulan = $item->stok_awal + $totalMasukBefore - $totalKeluarBefore;

            // Mutasi bulan ini
            $masuk = DB::table('stock_transaction_details')
                ->join('stock_transactions', 'stock_transaction_details.stock_transaction_id', '=', 'stock_transactions.id')
                ->where('stock_transaction_details.item_id', $item->id)
                ->where('stock_transactions.type', 'Masuk')
                ->where('stock_transactions.transaction_date', 'like', "$month%")
                ->sum('quantity');

            $keluar = DB::table('stock_transaction_details')
                ->join('stock_transactions', 'stock_transaction_details.stock_transaction_id', '=', 'stock_transactions.id')
                ->where('stock_transaction_details.item_id', $item->id)
                ->where('stock_transactions.type', 'Keluar')
                ->where('stock_transactions.transaction_date', 'like', "$month%")
                ->sum('quantity');

            $stokAkhirBulan = $stokAwalBulan + $masuk - $keluar;

            return [
                'id' => $item->id,
                'kode_simaset' => $item->kode_simaset,
                'nama_simaset' => $item->nama_simaset,
                'nama_riil' => $item->nama_riil,
                'satuan' => $item->satuan,
                'stok_awal' => (int)$stokAwalBulan,
                'masuk' => (int)$masuk,
                'keluar' => (int)$keluar,
                'stok_akhir' => (int)$stokAkhirBulan,
            ];
        });

        return Inertia::render('StockCheck/Index', [
            'items' => $items,
            'currentMonth' => $month
        ]);
    }
}
