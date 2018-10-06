<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/nearby-restaurants', 'NearbyRestaurants@index')->name('NearbyRestaurants.index');
Route::post('/nearby-restaurants/google', 'NearbyRestaurants@google')->name('NearbyRestaurants.google');
Route::post('/nearby-restaurants/zomato', 'NearbyRestaurants@zomato')->name('NearbyRestaurants.zomato');
