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


/***** backend frontend *****/
Route::group(['namespace' => 'UI'], function () {
    Route::get('/', 'DefaultController@wall');
    Route::get('wall', 'DefaultController@wall');
    Route::get('browse', 'DefaultController@browse');
    Route::get('browse/{article}', 'DefaultController@browse');
    Route::get('signin', 'DefaultController@signin');
    Route::get('signup', 'DefaultController@signup');
    Route::get('activate', 'DefaultController@activate');

    Route::group(['prefix' => '/user/{username}'], function () {
        Route::get('/', 'UserController@dashboard');
        Route::get('dashboard', 'UserController@dashboard');
    });

});


/***** backend routes *****/
Route::group(['prefix' => 'api/1.0'], function () {
    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {
        Route::post('signin', 'AuthController@signin');
        Route::post('fbsignin', 'AuthController@fbSignin');
        Route::post('signup', 'AuthController@signup');

        Route::get('signout', ['middleware' => 'auth.token', 'uses' => 'AuthController@signout']);
    });
});
