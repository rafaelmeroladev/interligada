<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::orderBy('order')->get();
        return response()->json($banners);
    }

    public function publicIndex()
    {
        $banners = Banner::where('active', true)->orderBy('order')->get();
        return response()->json($banners);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url',
            'order' => 'nullable|integer',
            'active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $data['image'] = $path;
        }
        
        $banner = Banner::create([
            'title' => $request->title,
            'description' => $request->description,
            'url' => $request->url,
            'order' => $request->order ?? 0,
            'active' => $request->active ?? true,
            'image' => $path,
        ]);

        return response()->json(['message' => 'Banner criado com sucesso!', 'banner' => $banner]);
    }

    public function show(Banner $banner)
    {
        return response()->json($banner);
    }

    public function update(Request $request, Banner $banner)
    {
        $request->validate([
            'image' => 'nullable|image',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url',
            'order' => 'nullable|integer',
            'active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($banner->image) {
                Storage::disk('public')->delete($banner->image);
            }
            $banner->image = $request->file('image')->store('images', 'public');
        }

        $banner->update($request->except('image') + ['image' => $banner->image]);

        return response()->json(['message' => 'Banner atualizado com sucesso!', 'banner' => $banner]);
    }

    public function destroy(Banner $banner)
    {
        if ($banner->image) {
            Storage::disk('public')->delete($banner->image);
        }

        $banner->delete();
        return response()->json(['message' => 'Banner excluído com sucesso!']);
    }
}
