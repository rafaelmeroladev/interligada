<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\RequestProgram;
use App\Models\Requests;

class RequestsController extends Controller {
    public function index() {
        $requests = Requests::withTrashed()->get();
        return response()->json($requests);
    }

    public function create() {
        return view('requests.create');
    }

    public function store(Request $request) {
        $requestProgram = RequestProgram::where('status', 'online')
        ->orderBy('created_at', 'desc')
        ->first();

        if (!$requestProgram) {
            return response()->json(['error' => 'No active request program found'], 400);
        }

        // Lógica para criar um novo request
        $data = $request->all();
        $data['request_program_id'] = $requestProgram->id;
        Requests::create($data);

        return response()->json(['message' => 'Request created successfully']);
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
        $requestInstance = Requests::find($id);
        $requestInstance->update($data);
        return response()->json(['message' => 'Request updated successfully']);
    }

    public function destroy($id) {
        $requestInstance = Requests::find($id);
        $requestInstance->delete(); // Soft Delete
        return response()->json(['message' => 'Request deleted successfully']);
    }

    public function restore($id) {
        $request = Requests::withTrashed()->find($id);
        $request->restore(); // Restaurar um request excluído
        return response()->json(['message' => 'Request restored successfully']);
    }

    public function activeRequestsSystem(Request $request) {
        $user = Auth::user();
        $status = $request->input('status');
        $timetableData = $request->input('timetable_id');
        
        // Verificar se o locutor já tem um sistema de pedidos ativo
        $existingProgram = RequestProgram::where('user_id', $user->id)
            ->where('status', 'online')
            ->first();

        if ($existingProgram) {
            // Atualizar o status do sistema de pedidos existente
            $existingProgram->status = $status;
            $existingProgram->timetable_id = $timetableData;
            $existingProgram->save();
        } else {
            // Criar um novo sistema de pedidos
            RequestProgram::create([
                'user_id' => $user->id,
                'status' => $status,
                'timetable_id' => $timetableData
            ]);
        }

        return response()->json(['message' => 'Sistema de pedidos atualizado com sucesso', 'status' => $status, 'timetable' => $timetableData]);
    }

    public function restoreRequestProgram($id) {
        $program = RequestProgram::withTrashed()->find($id);
        if ($program) {
            $program->restore();
            return response()->json(['message' => 'Programa de pedidos restaurado com sucesso']);
        }
        return response()->json(['message' => 'Programa de pedidos não encontrado'], 404);
    }

    public function searchProgram(){
        $requestProgram = RequestProgram::where('status', 'online')->first();
        if ($requestProgram){
            return 'Online';
        }else{
            return 'Offline';
        }
    }

    public function isRequestSystemActive()
    {
        $isOnline = RequestProgram::where('status', 'online')->exists();

        return response()->json(['active' => $isOnline]);
    }
}
