<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller {
    public function index() {
        $users = User::withTrashed()->get();
        return json_encode($users);
       // return view('users.index', compact('users'));
    }

    public function create() {
        return view('users.create');
    }

    public function store(Request $request) {
        // Lógica para criar um novo usuário
        $data = $request->all();
        $users = User::create($data);
        return json_encode($users);
       // return redirect()->route('users.index');
    }

    public function show($id) {
        $user = User::withTrashed()->find($id);
        return view('users.show', compact('user'));
    }

    public function edit($id) {
        $user = User::find($id);
        return view('users.edit', compact('user'));
    }

    public function update(Request $request, $id) {
        // Lógica para atualizar um usuário
        $data = $request->all();
        $user = User::find($id);
        $user->update($data);
        return redirect()->route('users.index');
    }

    public function destroy($id) {
        $user = User::find($id);
        $user->delete(); // Soft Delete
        return redirect()->route('users.index');
    }

    public function restore($id) {
        $user = User::withTrashed()->find($id);
        $user->restore(); // Restaurar um usuário excluído
        return redirect()->route('users.index');
    }
}
