<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'surname' => 'Merola',
            'email' => 'admin@interligada.com',
            'password' => bcrypt('rafael17'),
            'birthday' => '1993-05-17',
            'city' => 'Maceio',
            'state' => 'AL',
            'phone' => '82999430213',
            'level' => 'admin',
            'gender' => 'male',
            'musical_preference' => 'Pop, Rock, Sertanejo, Eletronica, Dance',
            'favorite_music' => 'Faded',
            'favorite_singer' => 'Imagine Dragon',
        ]);

        $this->call([
            NewsSeeder::class,
        ]);
        $this->call(Top10Seeder::class);

    }
}
