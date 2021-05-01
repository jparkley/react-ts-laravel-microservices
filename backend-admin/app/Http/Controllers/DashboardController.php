<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Doctrine\DBAL\Schema\Index;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\ChartResource;
use Illuminate\Auth\Middleware\Authorize;

class DashboardController extends Controller
{
    public function chart() {
        Gate::authorize('view', 'orders');
        $orders = Order::query()
                    ->join('order_items', 'orders.id', '=', 'order_items.order_id')
                    ->selectRaw("DATE_FORMAT(orders.created_at, '%Y-%m-%d') as date, sum(order_items.quantity * order_items.price) as sum")
                    ->groupBy('date')
                    ->get();                   
        return ChartResource::collection($orders);
    }
}
