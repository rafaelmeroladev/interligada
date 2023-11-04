<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Requests;

class RequestsController extends Controller {
    public function index() {
        $requests = Requests::withTrashed()->get();
        return view('requests.index', compact('requests'));
    }

    public function create() {
        return view('requests.create');
    }

    public function store(Request $request) {
        // Lógica para criar um novo request
        $data = $request->all();
        Pedido::create($data);
        return redirect()->route('requests.index');
    }

    public function show($id) {
        $request = Requests::withTrashed()->find($id);
        return view('requests.show', compact('request'));
    }

    public function edit($id) {
        $request = Requests::find($id);
        return view('requests.edit', compact('request'));
    }

    public function update(Request $request, $id) {
        // Lógica para atualizar um request
        $data = $request->all();
        $request = Requests::find($id);
        $request->update($data);
        return redirect()->route('requests.index');
    }

    public function destroy($id) {
        $request = Requests::find($id);
        $request->delete(); // Soft Delete
        return redirect()->route('requests.index');
    }

    public function restore($id) {
        $request = Requests::withTrashed()->find($id);
        $request->restore(); // Restaurar um request excluído
        return redirect()->route('requests.index');
    }
}
