<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Resources\UserResource;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index() {
        //return User::with('role')->paginate(5);
        // Use UserResource instead of 'with'
        $users = User::paginate(5);
        return UserResource::collection($users);
    }

    public function show($id) {
        //$user = User::with('role')->find($id);
        // Use UserResource instead of 'with'
        $user = User::find($id);
        return new UserResource($user);
    }

    public function store(UserCreateRequest $request) {
        //$user = User::create($request->all());
        $user = User::create($request->only('first_name', 'last_name', 'email', 'role_id') + [
            'password' => Hash::make('password'), // Default password given by system
        ]);
        return response(new UserResource($user), Response::HTTP_CREATED); // 201
    }

    public function update(UserUpdateRequest $request, $id) {
        $user = User::find($id);
        $user->update($request->only('first_name', 'last_name', 'email', 'role_id'));
        return response(new UserResource($user), Response::HTTP_ACCEPTED); // 202
    }

    public function delete($id) {
        User::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function user() {
        return new UserResource(Auth::user());
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
