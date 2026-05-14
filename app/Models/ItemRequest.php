<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'unit_name',
        'recipient_name',
        'phone_number',
        'request_date',
        'status',
        'notes',
        'signature'
    ];

    public function details()
    {
        return $this->hasMany(ItemRequestDetail::class);
    }
}
