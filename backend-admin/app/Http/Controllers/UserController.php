<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index() {
        return User::paginate(5);
    }

    public function show($id) {
        $user = User::find($id);
        return $user;
    }

    public function store(UserCreateRequest $request) {
        //$user = User::create($request->all());
        $user = User::create($request->only('first_name', 'last_name', 'email') + [
            'password' => Hash::make('password'), // Default password given by system
        ]);
        return response($user, Response::HTTP_CREATED); // 201
    }

    public function update(UserUpdateRequest $request, $id) {
        $user = User::find($id);
        $user->update($request->only('first_name', 'last_name', 'email'));
        return response($user, Response::HTTP_ACCEPTED); // 202
    }

    public function delete($id) {
        User::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
