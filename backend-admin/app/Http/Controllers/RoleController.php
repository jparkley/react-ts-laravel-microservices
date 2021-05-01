<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\RoleResource;
use Symfony\Component\HttpFoundation\Response;


class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return RoleResource::collection(Role::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::find($id);
        return new RoleResource($role);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('role_permission')->where('role_id', $id)->delete();
        Role::destroy($id);        
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
