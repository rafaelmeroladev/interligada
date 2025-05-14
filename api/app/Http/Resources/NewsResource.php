<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
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
            'text'      => $this->text,
            'image'     => $this->image,
            'category'  => $this->category,
            'date_time' => $this->date_time,
            'slug'      => $this->slug,
            'image_highlight'      => $this->image_highlight,
        ];
    }
}
