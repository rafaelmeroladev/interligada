<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Top10;

class Top10Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $musicas = [
            ['Blinding Lights', 'The Weeknd'],
            ['Flowers', 'Miley Cyrus'],
            ['Montero', 'Lil Nas X'],
            ['Perfect', 'Ed Sheeran'],
            ['Drivers License', 'Olivia Rodrigo'],
            ['Levitating', 'Dua Lipa'],
            ['Shivers', 'Ed Sheeran'],
            ['Stay', 'Justin Bieber'],
            ['Peaches', 'Justin Bieber'],
            ['Shape of You', 'Ed Sheeran'],
        ];
    
        foreach ($musicas as $i => [$title, $artist]) {
            Top10::create([
                'title' => $title,
                'artist' => $artist,
                'position' => $i + 1,
                'duration' => rand(3, 4) . ':' . str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT),
                'image' => 'https://via.placeholder.com/300x300?text=' . urlencode($title),
                'url' => null,
            ]);
        }
    }
}
