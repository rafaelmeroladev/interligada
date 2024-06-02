<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\SponsorController;
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
// Public Routes
Route::get('timetables/day', [TimetableController::class, 'showDay']);
Route::resource('news', NewsController::class);
Route::resource('timetables', TimetableController::class);
Route::resource('pedidos', RequestsController::class);
Route::resource('usuarios', UsersController::class);
Route::resource('sponsors', 'App\Http\Controllers\SponsorController');
Route::post('login', [AuthController::class, 'login']);
Route::post('/activeRequests', [RequestsController::class, 'activeRequestsSystem']);
Route::post('/restoreRequestProgram/{id}', [RequestsController::class, 'restoreRequestProgram']);
Route::get('/program', [RequestsController::class, 'searchProgram']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
