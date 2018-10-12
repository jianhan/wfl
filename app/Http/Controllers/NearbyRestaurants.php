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
            'latitude' => 'required',
            'longitude' => 'required',
            'radius' => 'required|numeric|max:50000|min:50',
            'rankby' => Rule::in(['prominence', 'distance']),
            'minprice' => 'between:0,4|lte:maxprice',
            'maxprice' => 'between:0,4',
        ]);

        $data = $request->only(['key', 'radius', 'rankby', 'opennow', 'pagetoken']);
        $r = (new \GuzzleHttp\Client())->request('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json', [
            'query' => array_merge($data, ['location' => $request->get('latitude') . ',' . $request->get('longitude')], ['key' => env('GOOGLE_MAP_API_KEY')]),
        ]);

        return (string) $r->getBody();
    }

    public function zomato(Request $request)
    {
    }
}
