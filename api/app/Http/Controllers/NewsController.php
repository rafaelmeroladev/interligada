<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(News::class, 'news');
    }

    public function index()
    {
        return News::all();
    }

    public function store(Request $request)
    {
        $this->authorize('create', News::class);

        $news = News::create($request->all());
        return response()->json($news, 201);
    }

    public function show(News $news)
    {
        return $news;
    }

    public function update(Request $request, News $news)
    {
        $this->authorize('update', $news);

        $news->update($request->all());
        return response()->json($news, 200);
    }

    public function destroy(News $news)
    {
        $this->authorize('delete', $news);

        $news->delete();
        return response()->json(null, 204);
    }
}
