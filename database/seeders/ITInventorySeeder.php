<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;
use App\Models\PrinterModel;
use App\Models\Printer;
use App\Models\Consumable;
use App\Models\User;

class ITInventorySeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Brands
        $canon = Brand::create(['name' => 'Canon']);
        $hp = Brand::create(['name' => 'HP']);
        $epson = Brand::create(['name' => 'Epson']);

        // 2. Create Printer Models
        $g2010 = PrinterModel::create(['brand_id' => $canon->id, 'name' => 'G2010']);
        $m404 = PrinterModel::create(['brand_id' => $hp->id, 'name' => 'LaserJet Pro M404']);
        $l3110 = PrinterModel::create(['brand_id' => $epson->id, 'name' => 'EcoTank L3110']);

        // 3. Create Printers
        Printer::create([
            'printer_model_id' => $g2010->id,
            'serial_number' => 'CN-G2010-001',
            'location' => 'Pendaftaran',
            'status' => 'Aktif',
        ]);
        Printer::create([
            'printer_model_id' => $m404->id,
            'serial_number' => 'HP-M404-001',
            'location' => 'Keuangan',
            'status' => 'Aktif',
        ]);
        Printer::create([
            'printer_model_id' => $l3110->id,
            'serial_number' => 'EP-L3110-001',
            'location' => 'Laboratorium',
            'status' => 'Rusak',
        ]);

        // 4. Create Consumables
        $gi790 = Consumable::create([
            'name' => 'Tinta Canon GI-790 Black',
            'sku' => 'GI-790-BK',
            'stock' => 12,
            'min_stock' => 5,
        ]);
        $hp76a = Consumable::create([
            'name' => 'Cartridge HP 76A Black',
            'sku' => 'HP-76A',
            'stock' => 2,
            'min_stock' => 4, // Low stock!
        ]);
        $epson003 = Consumable::create([
            'name' => 'Tinta Epson 003 Black',
            'sku' => 'EP-003-BK',
            'stock' => 8,
            'min_stock' => 3,
        ]);

        // 5. Compatibility
        $g2010->consumables()->attach($gi790->id);
        $m404->consumables()->attach($hp76a->id);
        $l3110->consumables()->attach($epson003->id);
    }
}
