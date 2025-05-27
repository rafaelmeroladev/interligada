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
            'text_position' =>'nullable|string|max:255',
            'show_title' =>'boolean',
            'show_description' =>'boolean',
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
            'text_position' => $request->text_position,
            'show_title' =>  $request->show_title ?? true,
            'show_description' =>  $request->show_description ?? true,
        ]);

        return response()->json(['message' => 'Banner criado com sucesso!', 'banner' => $banner]);
    }

    public function show(Banner $banner)
    {
        return response()->json($banner);
    }

    public function update(Request $request, Banner $banner)
    {
        // 1) Validação dos campos — imagem é opcional
        $request->validate([
            'image'           => 'sometimes|image',
            'title'           => 'sometimes|string|max:255',
            'description'     => 'sometimes|string',
            'url'             => 'sometimes|url',
            'order'           => 'sometimes|integer',
            'active'          => 'nullable|boolean',
            'text_position'   => 'sometimes|string|max:255',
            'show_title'      => 'nullable|boolean',
            'show_description'=> 'nullable|boolean',
        ]);

        // 2) Se veio imagem, apaga a antiga e armazena a nova
        if ($request->hasFile('image')) {
            if ($banner->image) {
                Storage::disk('public')->delete($banner->image);
            }
            $banner->image = $request->file('image')
                                ->store('images', 'public');
        }

        // 3) Prepara todos os dados para atualizar
        //    exceto o arquivo (já foi tratado acima)
        $data = $request->except('image');

        //    garante que o campo image exista no array final
        $data['image'] = $banner->image;

        // 4) Executa o update
        $banner->update($data);

        // 5) Retorna o banner já recarregado do banco
        return response()->json([
            'message' => 'Banner atualizado com sucesso!',
            'banner'  => $banner->fresh(),
        ]);
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
