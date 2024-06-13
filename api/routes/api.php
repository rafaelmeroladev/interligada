<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\SponsorController;


Route::get('timetables/day', [TimetableController::class, 'showDay']);
Route::get('listahorarios', [TimetableController::class, 'index'])->name('listahorarios');
Route::resource('notices', NewsController::class)->only(['index', 'show']);
Route::resource('sponsors', SponsorController::class)->only(['index', 'show']);
Route::post('pedidos', [RequestsController::class, 'store']);
Route::get('login',  [AuthController::class, 'login'])->name('login');;
Route::get('/program', [RequestsController::class, 'searchProgram']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
// Protected Routes
Route::middleware('auth:sanctum')->group(function () {

    Route::middleware('checkUserLevel:admin')->group(function () {
        Route::resource('news', NewsController::class);
        Route::resource('timetables', TimetableController::class);
        Route::resource('requests', RequestsController::class);
        Route::resource('users', UsersController::class);
        Route::resource('sponsors', SponsorController::class)->except(['index', 'show']);
    });

    Route::middleware('checkUserLevel:manager')->group(function () {
        Route::resource('news', NewsController::class);
        Route::resource('timetables', TimetableController::class)->only(['store', 'update', 'index', 'show']);
        Route::resource('requests', RequestsController::class)->only(['update', 'index', 'show']);
    });

    Route::middleware('checkUserLevel:speaker')->group(function () {
        Route::resource('requests', RequestsController::class)->only(['index', 'show', 'update']);
        Route::get('activeRequestsSystem',  [RequestsController::class, 'activeRequestsSystem'])->name('activeRequestsSystem');
        Route::resource('horarios', TimetableController::class)->only(['index', 'show']);
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::resource('news', NewsController::class)->only(['index', 'show']);
});