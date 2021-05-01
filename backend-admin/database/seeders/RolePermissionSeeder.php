<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $persmissions = Permission::all();
        $admin = Role::whereName('Admin')->first();
        foreach($persmissions as $persmission) {
            DB::table('role_permission')->insert([
                'role_id' => $admin->id,
                'permission_id' => $persmission->id
            ]);
        }

        $editor = Role::whereName('Editor')->first();
        foreach($persmissions as $persmission) {
            if (!in_array($persmission->name, ['edit_roles'])) {
                DB::table('role_permission')->insert([
                    'role_id' => $editor->id,
                    'permission_id' => $persmission->id
                ]);
            }
        }
        
        $viewer = Role::whereName('Viewer')->first();
        $viewRoles = ['view_users', 'view_roles', 'view_products', 'view_orders'];
        foreach($persmissions as $persmission) {
            if (in_array($persmission->name, $viewRoles)) {
                DB::table('role_permission')->insert([
                    'role_id' => $viewer->id,
                    'permission_id' => $persmission->id
                ]);                
            }
        }
    }
}
