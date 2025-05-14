<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Resources\NewsResource;
use Illuminate\Support\Str;

class NewsController extends Controller
{

    public function index()
    {
        $news = News::where('highlight', 1)->orderBy('date_time', 'desc')->get();
        return NewsResource::collection($news);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $data['slug'] = Str::slug($data['title'], '-');

        $news = News::create($data);
        return response()->json($news, 201);
    }

    public function show($slug)
    {
        $news = News::where('slug', $slug)->firstOrFail();
        return new NewsResource($news);
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
