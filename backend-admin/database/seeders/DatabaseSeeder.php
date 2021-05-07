<?php

namespace Database\Seeders;

use Barryvdh\LaravelIdeHelper\UsesResolver;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        
        $this->call([
            RoleSeeder::class,
            //UserSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
            ProductSeeder::class,
            OrderSeeder::class,
        ]);
        \App\Models\User::factory(10)->create();
    }
}
