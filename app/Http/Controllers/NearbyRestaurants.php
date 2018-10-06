<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class NearbyRestaurants extends Controller
{
    public function index()
    {
        return view('nearby_restaurants.index');
    }

    public function google(Request $request)
    {
        $request->validate([
            'key' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'radius' => 'required|between:50,50000',
            'rankby' => Rule::in(['prominence', 'distance']),
            'minprice' => 'between:0,4|lte:maxprice',
            'maxprice' => 'between:0,4',
        ]);

        $data = $request->only(['key', 'latitude', 'longitude', 'radius', 'rankby', 'opennow', 'minprice', 'maxprice', 'pagetoken']);

        dd($data);
    }

    public function zomato(Request $request)
    {
    }
}
