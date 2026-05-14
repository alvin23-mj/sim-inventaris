<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Item;
use App\Models\StockTransaction;

use App\Http\Controllers\UnitRequestController;
use App\Http\Controllers\UserController;

Route::get('/', [UnitRequestController::class, 'index'])->name('home');
Route::post('/requests', [UnitRequestController::class, 'store'])->name('requests.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'totalItems' => Item::count(),
            'totalMasuk' => StockTransaction::where('type', 'Masuk')->count(),
            'totalKeluar' => StockTransaction::where('type', 'Keluar')->count(),
            'totalPending' => \App\Models\ItemRequest::where('status', 'Pending')->count(),
        ],
        'items' => Item::all(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

use App\Http\Controllers\IncomingGoodsController;
use App\Http\Controllers\OutgoingGoodsController;
use App\Http\Controllers\StockCheckController;
use App\Http\Controllers\ItemCodeController;
use App\Http\Controllers\VendorController;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Vendors
    Route::get('/vendors', [VendorController::class, 'index'])->name('vendors.index');
    Route::get('/vendors/create', [VendorController::class, 'create'])->name('vendors.create');
    Route::post('/vendors', [VendorController::class, 'store'])->name('vendors.store');
    Route::put('/vendors/{id}', [VendorController::class, 'update'])->name('vendors.update');
    Route::delete('/vendors/{id}', [VendorController::class, 'destroy'])->name('vendors.destroy');

    // Inventory Flow
    Route::get('/item-codes', [ItemCodeController::class, 'index'])->name('item-codes.index');
    Route::get('/item-codes/create', [ItemCodeController::class, 'create'])->name('item-codes.create');
    Route::post('/item-codes', [ItemCodeController::class, 'store'])->name('item-codes.store');
    Route::put('/item-codes/{id}', [ItemCodeController::class, 'update'])->name('item-codes.update');
    Route::post('/item-codes/{id}/toggle-status', [ItemCodeController::class, 'toggleStatus'])->name('item-codes.toggle-status');
    Route::delete('/item-codes/{id}', [ItemCodeController::class, 'destroy'])->name('item-codes.destroy');

    Route::get('/incoming-goods', [IncomingGoodsController::class, 'index'])->name('incoming-goods.index');
    Route::get('/incoming-goods/create', [IncomingGoodsController::class, 'create'])->name('incoming-goods.create');
    Route::post('/incoming-goods', [IncomingGoodsController::class, 'store'])->name('incoming-goods.store');
    Route::get('/incoming-goods/{id}/print', [IncomingGoodsController::class, 'print'])->name('incoming-goods.print');
    
    Route::get('/outgoing-goods', [OutgoingGoodsController::class, 'index'])->name('outgoing-goods.index');
    Route::get('/outgoing-goods/create', [OutgoingGoodsController::class, 'create'])->name('outgoing-goods.create');
    Route::post('/outgoing-goods', [OutgoingGoodsController::class, 'store'])->name('outgoing-goods.store');
    Route::get('/outgoing-goods/{id}/print', [OutgoingGoodsController::class, 'print'])->name('outgoing-goods.print');
    
    Route::get('/item-requests', [UnitRequestController::class, 'adminIndex'])->name('item-requests.index');
    Route::delete('/item-requests/{id}', [UnitRequestController::class, 'destroy'])->name('item-requests.destroy');
    
    Route::get('/stock-check', [StockCheckController::class, 'index'])->name('stock-check.index');

    // User Management
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/auth.php';
