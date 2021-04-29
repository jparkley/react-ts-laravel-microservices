<?php

namespace App\Models;

use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }

    public function getTotalAttribute() {
        return $this->orderItems->sum(function (OrderItem $item) {
            return $item->price * $item->quantity;
        });
    }

    public function getNameAttribute() {
        return $this->first_name . ' ' . $this->last_name;
    }
}
