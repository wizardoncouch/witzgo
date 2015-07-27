<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::group(['namespace' => 'UI'], function () {
    Route::get('/', 'DefaultController@wall');
    Route::get('wall', 'DefaultController@wall');
    Route::get('browse', 'DefaultController@browse');
    Route::get('browse/{article}', 'DefaultController@browse');
    Route::get('signin', 'DefaultController@signin');
    Route::get('signup', 'DefaultController@signup');
    Route::get('activate', 'DefaultController@activate');

    Route::group(['prefix' => '{username}'], function () {
        Route::get('/', 'UserController@dashboard');
        Route::get('dashboard', 'UserController@dashboard');
    });

});


Route::group(['prefix' => 'api/1.0'], function () {
    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {
        Route::post('signin', ['middleware' => 'guest', 'uses' => 'AuthController@signin']);
        Route::post('signup', ['middleware' => 'guest', 'uses' => 'AuthController@signup']);
        Route::get('signout', ['middleware' => 'auth.token', 'uses' => 'AuthController@logout']);
    });
});
