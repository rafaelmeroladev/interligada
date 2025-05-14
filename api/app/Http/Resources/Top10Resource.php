<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Top10Resource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
     public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'title'     => $this->title,
            'artist'      => $this->text,
            'image'     => $this->image,
            'position'  => $this->position,
            'duration' => $this->duration,
            'url'     => $this->url,
            'votes_up'  => $this->votes_up,
            'votes_down' => $this->votes_down,
        ];
    }
}
