<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\TimetableController;
use App\Policies\GlobalAdminManagerPolicy;
use App\Policies\GlobalAdminManagerSpeakerPolicy;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::resource('noticias', NewsController::class);
Route::resource('pedidos', RequestsController::class);
Route::resource('usuarios', UsersController::class);
Route::resource('horarios', TimetableController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['can:update,noticia', 'can:update,horario'])->group(function () {
    Route::put('/noticias/{noticia}', 'NewsController@update');
    Route::put('/horarios/{horario}', 'TimetableController@update');
    Route::put('/usuarios/{usuario}', 'UserController@update');
    Route::delete('/usuarios/{usuario}', 'UserController@destroy');
});
Route::middleware(['can:ativarSistemaPedidos', 'can:leituraPedidos'])->group(function () {
    Route::post('/activeRequests', 'RequestsController@ativarSistema');
    Route::get('/pedidos', 'RequestsController@index');
});