<?php

namespace App\Http\Controllers;

use App\Models\Timetable;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class TimetableController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Timetable::class, 'timetable');
    }

    public function index()
    {
        $timetablesAll = Timetable::get();
        return response()->json($timetablesAll);
    }

    public function showDay(Request $request)
    {
        $dayOfWeek = $request->query('day', Carbon::now()->format('l'));
        $timetables = Timetable::where('day_week', $dayOfWeek)
            ->orderBy('hour_start')
            ->get();
    
        return response()->json($timetables);
    }

    public function uniquePrograms()
    {
        $programs = Timetable::select('program_name', 'description', 'imagem')
            ->groupBy('program_name', 'description', 'imagem')
            ->get();

        return response()->json($programs);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Timetable::class);

        $timetableData = $request->all();
        if ($request->hasFile('imagem')) {
            $timetableData['imagem'] = $request->file('imagem')->store('images', 'public');
        }

        $timetable = Timetable::create($timetableData);
        return response()->json($timetable, 201);
    }

    public function show(Timetable $timetable)
    {
        return $timetable;
    }

    public function update(Request $request, Timetable $timetable)
    {
        $this->authorize('update', $timetable);

        $timetableData = $request->all();
        if ($request->hasFile('imagem')) {
            if ($timetable->imagem) {
                Storage::disk('public')->delete($timetable->imagem);
            }
            $timetableData['imagem'] = $request->file('imagem')->store('images', 'public');
        }

        $timetable->update($timetableData);
        return response()->json($timetable, 200);
    }

    public function destroy(Timetable $timetable)
    {
        $this->authorize('delete', $timetable);

        if ($timetable->imagem) {
            Storage::disk('public')->delete($timetable->imagem);
        }

        $timetable->delete();
        return response()->json(null, 204);
    }
}
