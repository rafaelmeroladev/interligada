<?php
namespace App\Http\Controllers;

use App\Models\RequestProgram;
use App\Models\Timetable;
use Illuminate\Http\Request;

class SpeakerController extends Controller
{
    public function listPrograms(Request $request)
    {
        $user = $request->user();
        if (!($user->isSpeaker() || $user->isAdmin())) {
            abort(403);
        }
        $programs = RequestProgram::with('timetable')
                      ->where('user_id', $user->id)
                      ->get();
        return response()->json($programs);
    }

    public function storeProgram(Request $request)
    {
        $user = $request->user();
        if (!($user->isSpeaker() || $user->isAdmin())) {
            abort(403);
        }
        $data = $request->validate([
          'timetable_id' => 'required|exists:timetables,id'
        ]);

        $t = Timetable::find($data['timetable_id']);
        if ($t->user_id !== $user->id) abort(403);

        $program = RequestProgram::create([
          'user_id'      => $user->id,
          'timetable_id' => $t->id,
          'status'       => 1
        ]);

        return response()->json($program, 201);
    }

    public function toggleStatus($id, Request $request)
    {
        $user = $request->user();
        $prog = RequestProgram::findOrFail($id);
        if (!($user->isSpeaker() || $user->isAdmin())) {
            abort(403);
        }
        $prog->status = $prog->status ? 0 : 1;
        $prog->save();
        return response()->json($prog);
    }

    public function listRequests($id, Request $request)
    {
        $user = $request->user();
        $prog = RequestProgram::findOrFail($id);
        if (!($user->isSpeaker() || $user->isAdmin())) {
            abort(403);
        }
        $msgs = \App\Models\Requests::where('request_program_id', $id)
                    ->where('status', 0)
                    ->get();

        return response()->json($msgs);
    }
}
