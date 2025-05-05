<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{

    public function index()
    {
        $news = News::all();
        return response()->json($news, 201);
    }

    public function store(Request $request)
    {
        $news = News::create($request->all());
        return response()->json($news, 201);
    }

    public function show($id)
    {
        $news = News::with('user')->find($id);

        if (!$news) {
            return response()->json(['message' => 'Notícia não encontrada'], 404);
        }

        return response()->json($news, 200);
    }

    public function update(Request $request, News $news)
    {
        $news->update($request->all());
        return response()->json($news, 200);
    }

    public function destroy(News $news)
    {
        $news->delete();
        return response()->json(null, 204);
    }
}
