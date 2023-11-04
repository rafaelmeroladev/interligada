<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;

class NewsController extends Controller {
    public function index() {
        $news = News::withTrashed()->get(); // Obter todas as notícias, incluindo as excluídas
        return json_encode($news);
        //return view('news.index', compact('news'));
    }

    public function create() {
        return view('news.create');
    }

    public function store(Request $request) {
        // Lógica para criar uma nova notícia
        $data = $request->all();
        News::create($data);
        return redirect()->route('news.index');
    }

    public function show($id) {
        $noticia = Noticia::withTrashed()->find($id); // Encontrar uma notícia (inclusive excluída) por ID
        return view('news.show', compact('news'));
    }

    public function edit($id) {
        $news = News::find($id);
        return view('news.edit', compact('news'));
    }

    public function update(Request $request, $id) {
        // Lógica para atualizar uma notícia
        $data = $request->all();
        $news = News::find($id);
        $news->update($data);
        return redirect()->route('news.index');
    }

    public function destroy($id) {
        $news = News::find($id);
        $news->delete(); // Soft Delete
        return redirect()->route('news.index');
    }

    public function restore($id) {
        $news = News::withTrashed()->find($id);
        $news->restore(); // Restaurar uma notícia excluída
        return redirect()->route('news.index');
    }
}
