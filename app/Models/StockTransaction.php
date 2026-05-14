<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'vendor_id',
        'reference',
        'transaction_date',
        'user_id',
        'notes',
        'signature',
        'recipient_name',
        'recipient_signature',
    ];

    public function details()
    {
        return $this->hasMany(StockTransactionDetail::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
