<?php

namespace App\Http\Controllers;
use App\Models\Top10;
use App\Http\Resources\Top10Resource;


use Illuminate\Http\Request;

class Top10Controller extends Controller
{
     // Lista todas as músicas (público)
     public function index()
     {
        $top10 = Top10::orderBy('position')->get();
        return Top10Resource::collection($top10);
     }
 
     // CRUD para o admin
     public function store(Request $request)
     {
         $data = $request->validate([
             'title' => 'required|string',
             'artist' => 'required|string',
             'position' => 'required|integer|between:1,10',
             'duration' => 'required|string',
             'image' => 'nullable|string',
             'url' => 'nullable|string',
         ]);
 
         return Top10::create($data);
     }
 
     public function update(Request $request, $id)
     {
         $data = $request->validate([
             'title' => 'required|string',
             'artist' => 'required|string',
             'position' => 'required|integer|between:1,10',
             'duration' => 'required|string',
             'image' => 'nullable|string',
             'url' => 'nullable|string',
         ]);
 
         $top = Top10::findOrFail($id);
         $top->update($data);
 
         return response()->json(['success' => true, 'updated' => $top]);
     }
 
     public function destroy($id)
     {
         $top = Top10::findOrFail($id);
         $top->delete();
 
         return response()->json(['success' => true]);
     }
 
     // Votação (público)
     public function vote(Request $request, $id)
     {
         $music = Top10::findOrFail($id);
         $type = $request->input('type'); // 'up' ou 'down'
 
         if ($type === 'up') {
             $music->increment('votes_up');
         } elseif ($type === 'down') {
             $music->increment('votes_down');
         }
 
         return response()->json(['success' => true]);
     }
}
