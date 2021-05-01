<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\RoleResource;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;


class RoleController extends Controller
{
    public function index()
    {
        Gate::authorize('view', 'roles');
        return RoleResource::collection(Role::all());
    }

    public function store(Request $request)
    {        
        Gate::authorize('edit', 'roles');
        $role = Role::create($request->only('name'));

        if ($permissions = $request->input('permissions')) {
            foreach($permissions as $permission_id) {
                DB::table('role_permission')->insert([
                    'role_id' => $role->id,
                    'permission_id' => $permission_id
                ]);
            }    
        }
        return response(new RoleResource($role), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        Gate::authorize('view', 'roles');
        $role = Role::find($id);
        return new RoleResource($role);
    }

    public function update(Request $request, $id)
    {
        Gate::authorize('edit', 'roles');
        $role = Role::find($id);
        $role->update($request->only('name')); 
        
        DB::table('role_permission')->where('role_id', $role->id)->delete();
        if ($permissions = $request->input('permissions')) {
            foreach($permissions as $permission_id) {
                DB::table('role_permission')->insert([
                    'role_id' => $role->id,
                    'permission_id' => $permission_id
                ]);
            }    
        }
        return response($role, Response::HTTP_ACCEPTED); // 202
    }

    public function destroy($id)
    {
        Gate::authorize('edit', 'roles');
        DB::table('role_permission')->where('role_id', $id)->delete();
        Role::destroy($id);        
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
