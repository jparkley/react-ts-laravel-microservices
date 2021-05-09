<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UpdatePasswordRequest;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index() {
        Gate::authorize('view', 'users');
        //return User::with('role')->paginate(5);
        // Use UserResource instead of 'with'        
        $users = User::paginate(5);
        return UserResource::collection($users);
    }

    public function show($id) {
        Gate::authorize('view', 'users');
        //$user = User::with('role')->find($id);
        // Use UserResource instead of 'with'        
        $user = User::find($id);
        return new UserResource($user);
    }

    public function store(UserCreateRequest $request) {

        Gate::authorize('edit', 'users');
        //$user = User::create($request->all());
        $user = User::create($request->only('first_name', 'last_name', 'email', 'role_id') + [
            'password' => Hash::make('password'), // Default password given by system
        ]);
        return response(new UserResource($user), Response::HTTP_CREATED); // 201
    }

    public function update(UserUpdateRequest $request, $id) {
        Gate::authorize('edit', 'users');
        $user = User::find($id);
        $user->update($request->only('first_name', 'last_name', 'email', 'role_id'));
        return response(new UserResource($user), Response::HTTP_ACCEPTED); // 202
    }

    public function delete($id) {
        Gate::authorize('edit', 'users');
        User::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function user() {
        $user = Auth::user();        
        return (new UserResource($user))->additional([
            'data' => [
                'permissions' => $user->permissions()
            ]
        ]);
    }

    public function updateInfo(UpdateInfoRequest $request) {
        $user = Auth::user();
        $user->update($request->only('first_name', 'last_name', 'email'));
        return response(new UserResource($user), Response::HTTP_ACCEPTED); // 202        
    }

    public function updatePassword(UpdatePasswordRequest $request) {
        $user = Auth::user();
        $user->update([
            'password' => Hash::make($request->input('password'))
        ]);
        return response(new UserResource($user), Response::HTTP_ACCEPTED); // 202
    }
}
