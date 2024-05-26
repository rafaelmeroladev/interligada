<?php

namespace App\Http\Controllers;

use App\Models\Timetable;
use Illuminate\Http\Request;

class TimetableController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Timetable::class, 'timetable');
    }

    public function index()
    {
        return Timetable::all();
    }

    public function showDay()
    {
        return response()->json(['day' => date('l')]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Timetable::class);
        $timetable = Timetable::create($request->all());
        return response()->json($timetable, 201);
    }

    public function show(Timetable $timetable)
    {
        return $timetable;
    }

    public function update(Request $request, Timetable $timetable)
    {
        $this->authorize('update', $timetable);

        $timetable->update($request->all());
        return response()->json($timetable, 200);
    }

    public function destroy(Timetable $timetable)
    {
        $this->authorize('delete', $timetable);

        $timetable->delete();
        return response()->json(null, 204);
    }
}
