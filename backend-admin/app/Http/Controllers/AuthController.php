<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(Request $request) {
        if( Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('admin')->accessToken;
            return ([
                'token' => $token,
            ]);
        }

        return response([
            'error' => 'Invalid login',             
        ], Response::HTTP_UNAUTHORIZED);
    }

    public function register(RegisterRequest $request) {
        $user = User::create($request->only('first_name', 'last_name', 'email') + [
            'password' => Hash::make($request->password)
        ]);
        return response($user, Response::HTTP_CREATED); // 201        
    }
}
