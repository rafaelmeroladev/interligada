<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sponsor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SponsorController extends Controller
{
    public function index()
    {
        $sponsors = Sponsor::where('status', 'ativo')
            ->where('expirated_date', '>=', now())
            ->orderBy('position', 'asc')
            ->get();

        if ($sponsors->isEmpty()) {
            return response()->json([[
                'nome'           => 'Anuncie Aqui',
                'link'           => '#',
                'ref'            => null,
                'imagem'         => 'sponsoranuncie.png',
                'expirated_date' => null,
                'status'         => 'ativo',
                'position'       => 0,
            ]]);
        }

        return response()->json($sponsors);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome'           => 'required|string|max:255',
            'link'           => 'required|url|max:255',
            'ref'            => 'nullable|string|max:255',
            'imagem'         => 'required|image|max:2048',
            'expirated_date' => 'required|date|after:today',
            'status'         => 'required|in:ativo,inativo',
            'position'       => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $imagePath = $request->file('imagem')->store('sponsors', 'public');

        $sponsor = Sponsor::create([
            'nome'           => $request->nome,
            'link'           => $request->link,
            'ref'            => $request->ref,
            'imagem'         => $imagePath,
            'expirated_date' => $request->expirated_date,
            'status'         => $request->status,
            'position'       => $request->position,
        ]);

        return response()->json($sponsor, 201);
    }

    public function show($id)
    {
        $sponsor = Sponsor::findOrFail($id);
        return response()->json($sponsor);
    }

    public function update(Request $request, $id)
    {
        $sponsor = Sponsor::findOrFail($id);

        // validação…
        $validator = Validator::make($request->all(), [
            'nome'           => 'sometimes|string|max:255',
            'link'           => 'sometimes|url|max:255',
            'ref'            => 'nullable|string|max:255',
            'imagem'         => 'sometimes|image|max:2048',
            'expirated_date' => 'sometimes|date|after:today',
            'status'         => 'required|in:ativo,inativo',
            'position'       => 'sometimes|integer|min:0',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Começa montando só os dados normais
        $data = $request->except('imagem');

        if ($request->hasFile('imagem')) {
            // apaga a velha
            Storage::disk('public')->delete($sponsor->imagem);
            // guarda a nova e inclui no array
            $data['imagem'] = $request->file('imagem')
                ->store('sponsors', 'public');
        }

        // atualiza somente o array limpo
        $sponsor->update($data);

        return response()->json($sponsor);
    }

    public function destroy($id)
    {
        $sponsor = Sponsor::findOrFail($id);
        // Delete image from storage
        Storage::disk('public')->delete($sponsor->imagem);
        $sponsor->delete();

        return response()->json(['message' => 'Sponsor deleted successfully']);
    }
}
