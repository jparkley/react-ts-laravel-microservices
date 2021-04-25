<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ImageUploadRequest;

class ImageController extends Controller
{
    public function upload(ImageUploadRequest $request) {
        $file = $request->file('image');
        $name = Str::random(10);
        $url = Storage::putFileAs('images', $file, $name . '.' . $file->extension());

        return [env('APP_URL') . '/' . $url];
    }
}
