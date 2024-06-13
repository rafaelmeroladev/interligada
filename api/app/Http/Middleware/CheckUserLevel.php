<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserLevel
{
    public function handle(Request $request, Closure $next, $level)
    {
        $user = Auth::user();

        $levels = [
            'admin' => 3,
            'manager' => 2,
            'speaker' => 1,
        ];

        if (isset($levels[$user->level]) && $levels[$user->level] >= $levels[$level]) {
            return $next($request);
        }

        return response()->json(['message' => 'This action is unauthorized.'], 403);
    }
}
