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
            //UsesSeeder::class
        ]);
        \App\Models\User::factory(10)->create();
    }
}
