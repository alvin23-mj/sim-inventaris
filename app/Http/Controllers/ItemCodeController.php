<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemCodeController extends Controller
{
    public function index()
    {
        return Inertia::render('ItemCodes/Index', [
            'items' => Item::orderBy('nama_simaset')->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('ItemCodes/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode_simaset' => 'required|string|unique:items,kode_simaset',
            'nama_simaset' => 'required|string|max:255',
            'nama_riil' => 'required|string|max:255',
            'satuan' => 'required|string|max:50',
            'stok_awal' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $data = $request->all();
        $data['stok'] = $request->stok_awal;

        Item::create($data);

        return redirect()->route('item-codes.index')->with('success', 'Kode barang berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        $request->validate([
            'kode_simaset' => 'required|string|unique:items,kode_simaset,' . $item->id,
            'nama_simaset' => 'required|string|max:255',
            'nama_riil' => 'required|string|max:255',
            'satuan' => 'required|string|max:50',
            'stok_awal' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $oldStokAwal = $item->stok_awal;
        $diff = $request->stok_awal - $oldStokAwal;
        
        $item->update($request->all());
        $item->increment('stok', $diff);

        return redirect()->back()->with('success', 'Kode barang berhasil diperbarui.');
    }

    public function toggleStatus($id)
    {
        $item = Item::findOrFail($id);
        $item->update(['is_active' => !$item->is_active]);

        return redirect()->back()->with('success', 'Status barang berhasil diubah.');
    }

    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();

        return redirect()->back()->with('success', 'Kode barang berhasil dihapus.');
    }
}
