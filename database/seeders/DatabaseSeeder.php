<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Item;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@simrs.local'],
            [
                'name' => 'Admin SIMRS',
                'password' => Hash::make('password'),
            ]
        );

        \App\Models\Vendor::create([
            'name' => 'PT. Medika Sejahtera',
            'contact_person' => 'Bpk. Ahmad',
            'phone' => '08123456789',
            'address' => 'Jl. Kesehatan No. 123, Jakarta',
        ]);

        \App\Models\Vendor::create([
            'name' => 'CV. Global Computer',
            'contact_person' => 'Ibu Maria',
            'phone' => '08987654321',
            'address' => 'Mangga Dua Square, Jakarta',
        ]);

        Item::create([
            'kode_simaset' => '02.06.02.01.32.0001',
            'nama_simaset' => 'Tinta Cartridge HP 803 Black',
            'nama_riil' => 'HP 803 Black Original',
            'satuan' => 'Box',
            'stok' => 10,
        ]);

        Item::create([
            'kode_simaset' => '02.06.02.01.32.0002',
            'nama_simaset' => 'Tinta Cartridge HP 803 Color',
            'nama_riil' => 'HP 803 Tri-color Original',
            'satuan' => 'Box',
            'stok' => 5,
        ]);

        Item::create([
            'kode_simaset' => '02.06.02.01.33.0001',
            'nama_simaset' => 'Kertas A4 80gr',
            'nama_riil' => 'PaperOne A4 80gr',
            'satuan' => 'Rim',
            'stok' => 50,
        ]);
    }
}
