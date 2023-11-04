<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Timetable;

class TimetableController extends Controller {
    public function index() {
        $timetables = Timetable::withTrashed()->get();
        return view('timetables.index', compact('timetables'));
    }

    public function create() {
        return view('timetables.create');
    }

    public function store(Request $request) {
        // Lógica para criar um novo horário
        $data = $request->all();
        Timetable::create($data);
        return redirect()->route('timetables.index');
    }

    public function show($id) {
        $timetable = Timetable::withTrashed()->find($id);
        return view('timetables.show', compact('timetable'));
    }

    public function edit($id) {
        $timetable = Timetable::find($id);
        return view('timetables.edit', compact('timetable'));
    }

    public function update(Request $request, $id) {
        // Lógica para atualizar um horário
        $data = $request->all();
        $timetable = Timetable::find($id);
        $timetable->update($data);
        return redirect()->route('timetables.index');
    }

    public function destroy($id) {
        $timetable = Timetable::find($id);
        $timetable->delete(); // Soft Delete
        return redirect()->route('timetables.index');
    }

    public function restore($id) {
        $timetable = Timetable::withTrashed()->find($id);
        $timetable->restore(); // Restaurar um horário excluído
        return redirect()->route('timetables.index');
    }
}
