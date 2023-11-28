<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;

//  Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//      return $request->user();
//  });


//get all products
// Route::get('products', [ProductController::class, 'getProduct']);
Route::get('products', ['middleware' => 'cors' ,ProductController::class, 'getProduct']);
//get product by id
Route::get('product/{id}', [ProductController::class, 'getProductById']);

// //add a product
Route::post('addProduct', [ProductController::class, 'addProduct']);

// //update a product
Route::put('updateProduct/{id}', [ProductController::class, 'updateProduct']);

// //delete a product
Route::delete('deleteProduct/{id}', [ProductController::class, 'deleteProduct']);

//authentication
 Route::group([

     'middleware' => 'api',

 ], function () {

     Route::post('login', [AuthController::class, 'login']);
     Route::post('signup', [AuthController::class, 'signup']);
     Route::post('logout', [AuthController::class, 'logout']);
     Route::post('refresh', [AuthController::class, 'refresh']);
     Route::post('me', [AuthController::class, 'me']);

 });