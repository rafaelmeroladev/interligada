<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;
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

Route::resource('news', NewsController::class)->only(['index', 'show']);
Route::resource('timetables', TimetableController::class)->only(['index', 'show']);
Route::get('timetables/day', [TimetableController::class, 'showDay']);
Route::resource('pedidos', RequestsController::class);
Route::resource('usuarios', UsersController::class);
Route::post('login', [AuthController::class, 'login']);
Route::get('/program', [RequestsController::class, 'searchProgram']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('news', NewsController::class)->except(['index', 'show']);
    Route::resource('timetables', TimetableController::class)->except(['index', 'show']);
});

Route::middleware(['can:update,noticia', 'can:update,horario'])->group(function () {
    Route::post('/restoreRequestProgram/{id}', [RequestsController::class, 'restoreRequestProgram']);
});
Route::middleware(['auth:sanctum', 'can:activeRequestsSystem,App\Models\User', 'can:readRequests,App\Models\User'])->group(function () {
    Route::post('/activeRequests', [RequestsController::class, 'activeRequestsSystem']);
    Route::get('/pedidos', [RequestsController::class, 'index']);
});