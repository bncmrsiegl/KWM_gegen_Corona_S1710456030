<?php

use Illuminate\Http\Request;

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

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::get('lists', 'ShoppinglistController@index');
Route::get('list/{id}', 'ShoppinglistController@findByID');
Route::get('list/checkID/{id}', 'ShoppinglistController@checkID');
Route::put('list/{id}', 'ShoppinglistController@update');
Route::get('user/{id}', 'ShoppinglistController@findUserByID');
Route::post('list', 'ShoppinglistController@save');
Route::put('feedback/{id}', 'ShoppinglistController@addFeedback');

Route::group(['middleware' => ['api', 'cors']], function () {
    Route::post('auth/login', 'Auth\ApiAuthController2@login');
});

Route::group(['middleware' => ['api', 'cors', 'jwt.auth']], function () {
    Route::post('auth/logout', 'Auth\ApiAuthController2@logout');
    Route::delete('list/{id}', 'ShoppinglistController@delete');
});
