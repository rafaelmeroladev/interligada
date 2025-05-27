<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BannerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
     public function toArray($request)
    {
        return [
            'id'               => $this->id,
            'title'            => $this->title,
            'description'      => $this->description,
            'image'            => $this->image,
            'link'             => $this->url,
            'text_position'    => $this->text_position,
            'show_title'       => (bool)$this->show_title,
            'show_description' => (bool)$this->show_description,
        ];
    }
}
