<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('news')->truncate();

        for ($i = 1; $i <= 10; $i++) {
            News::create([
                'title' => "Notícia Top $i",
                'text' => "Este é o conteúdo da notícia número $i. Texto fake só pra preencher.",
                'date_time' => Carbon::now()->subDays($i),
                'image' => "https://via.placeholder.com/600x300?text=Noticia+$i",
                'audio' => null,
                'user_id' => 1, // ajusta isso se quiser associar a outro usuário
                'category' => ['Música', 'Eventos', 'Entrevistas'][rand(0,2)],
                'highlight' => $i % 2 == 0,
                'image_highlight' => $i % 2 == 0 ? "https://via.placeholder.com/1200x400?text=DESTAQUE+$i" : null,
                'slug' => "noticia-top-$i",
            ]);
        }
    }
}
