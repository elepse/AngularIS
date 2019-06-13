<?php
use Illuminate\Support\Facades\Route;
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

Route::group(['prefix' => 'api'], function (){

    Route::post('login','AuthController@login')->name('login');
    Route::post('checkAuth', 'AuthController@checkAuth');

    Route::group(['prefix' => 'tasks'], function (){
        Route::get('search', 'TasksController@search');
        Route::get('getUsers', 'TasksController@users');
        Route::get('getLocations', 'TasksController@locations');
        Route::post('addTask', 'TasksController@addTask');
        Route::post('addPerformer', 'TasksController@addPerformer');
    });
});
