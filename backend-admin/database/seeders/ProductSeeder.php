<?php

namespace Database\Seeders;

use Carbon\Factory;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //factory(Product::class, 30)->create(); <- Version 7..
        Product::factory(30)->create();
    }
}
