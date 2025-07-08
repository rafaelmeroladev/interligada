<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('API Token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

       public function loginAdmin(Request $request)
    {
        // 1) validação básica
        $data = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string'
        ]);

        // 2) busca o usuário
        $user = User::where('email', $data['email'])->first();

        // 3) verifica existência e senha
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        // 4) verifica se é admin (usa o seu método)
        if (!$user->isAdmin()) {
            return response()->json(['message' => 'Acesso negado'], 403);
        }

        // 5) cria token Sanctum
        $token = $user->createToken('admin-token')->plainTextToken;

        // 6) retorna token + dados do user
        return response()->json([
            'token' => $token,
            'user'  => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'level' => $user->level,
            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
