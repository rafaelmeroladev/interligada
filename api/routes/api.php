<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\SponsorController;
use App\Http\Controllers\Top10Controller;
use App\Http\Controllers\BannerController;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
| Rotas acessíveis sem autenticação.
*/

// Authentication
Route::post('login', [AuthController::class, 'login'])->name('login');

// News public
Route::get('notices',        [NewsController::class, 'index']);
Route::get('notices/{slug}', [NewsController::class, 'show']);

// Banners public
Route::get('banners', [BannerController::class, 'publicIndex']);

// Sponsors public
Route::get('sponsors',          [SponsorController::class, 'index']);
Route::get('sponsors/{sponsor}',[SponsorController::class, 'show']);

// Timetables and Programs
Route::get('timetables/day',  [TimetableController::class, 'showDay']);
Route::get('programs/unique', [TimetableController::class, 'uniquePrograms']);
// Optional list of all timetables (public if needed)
Route::get('listahorarios',   [TimetableController::class, 'index'])->name('listahorarios');

// Top10 public
Route::get('top10',           [Top10Controller::class, 'index']);
Route::post('top10/vote/{id}',[Top10Controller::class, 'vote']);

// Requests System
Route::get('statusRequestSystem', [RequestsController::class, 'currentRequestProgram']);
Route::post('pedidos',            [RequestsController::class, 'store']);
Route::get('program',             [RequestsController::class, 'searchProgram']);

/*
|--------------------------------------------------------------------------
| Protected API Routes
|--------------------------------------------------------------------------
| Rotas que exigem autenticação via Sanctum.
*/
Route::middleware('auth:sanctum')->group(function() {
    // Logout
    Route::post('logout', [AuthController::class, 'logout']);

    // Any authenticated user can toggle request system
    Route::post('activeRequestsSystem', [RequestsController::class, 'activeRequestsSystem']);

    /*
    |--------------------------------------------------------------------
    | Admin-only Routes
    |--------------------------------------------------------------------
    | CRUD completo para recursos sensíveis.
    */
    Route::middleware('checkUserLevel:admin')->group(function() {
        // News create, update, delete
        Route::post('notices',          [NewsController::class, 'store']);
        Route::match(['put','patch'],'notices/{slug}', [NewsController::class, 'update']);
        Route::delete('notices/{slug}', [NewsController::class, 'destroy']);

        // Timetable management
        Route::resource('timetables', TimetableController::class)
             ->except(['index','show']);

        // User management
        Route::resource('users', UsersController::class);

        // Sponsors management
        Route::resource('sponsors', SponsorController::class)
             ->except(['index','show']);

        // Banners management
        Route::post('banners',            [BannerController::class, 'store']);
        Route::get('banners/{banner}',    [BannerController::class, 'show']);
        Route::match(['put','patch'],'banners/{banner}', [BannerController::class, 'update']);
        Route::delete('banners/{banner}', [BannerController::class, 'destroy']);

        // Top10 management
        Route::post('top10',              [Top10Controller::class, 'store']);
        Route::match(['put','patch'],'top10/{id}', [Top10Controller::class, 'update']);
        Route::delete('top10/{id}',       [Top10Controller::class, 'destroy']);
    });

    /*
    |--------------------------------------------------------------------
    | Manager Routes
    |--------------------------------------------------------------------
    | Acesso restrito para manager
    */
    Route::middleware('checkUserLevel:manager')->group(function() {
        // Can view and update news and timetables
        Route::resource('news', NewsController::class)
             ->only(['index','show','store','update']);
        Route::resource('timetables', TimetableController::class)
             ->only(['index','show','store','update']);
        // Can manage requests
        Route::resource('requests', RequestsController::class)
             ->only(['index','show','update']);
    });

    /*
    |--------------------------------------------------------------------
    | Speaker Routes
    |--------------------------------------------------------------------
    | Acesso para locutores
    */
    Route::middleware('checkUserLevel:speaker')->group(function() {
        Route::resource('requests', RequestsController::class)
             ->only(['index','show','update']);
        Route::resource('horarios', TimetableController::class)
             ->only(['index','show']);
    });
});
