<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use Doctrine\DBAL\Driver\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['middleware' => 'auth:api'], function() {
  // User control by Admin
  Route::apiResource('users', 'App\Http\Controllers\UserController');
  Route::apiResource('roles', 'App\Http\Controllers\RoleController');
  Route::apiResource('products', 'App\Http\Controllers\ProductController');
  Route::apiResource('orders', 'App\Http\Controllers\OrderController')->only('index', 'show');
  Route::apiResource('permissions', 'App\Http\Controllers\PermissionController')->only('index');

  Route::post('upload', [ImageController::class, 'upload']);
  Route::get('export', [OrderController::class, 'export']);
  Route::get('chart', [DashboardController::class, 'chart']);

  // Get & Update by a User
  Route::get('user', [UserController::class, 'user']);
  Route::put('users/info', [UserController::class, 'updateInfo']);
  Route::put('users/password', [UserController::class, 'updatePassword']); 
  Route::post('logout', [AuthController::class, 'logout']);
});

// Route::get('users', [UserController::class, 'index']);
// Route::get('users/{id}', [UserController::class, 'show']);
// Route::post('users', [UserController::class, 'store']);
// Route::put('users/{id}', [UserController::class, 'update']);
// Route::delete('users/{id}', [UserController::class, 'delete']);

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });