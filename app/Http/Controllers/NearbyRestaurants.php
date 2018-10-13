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
        // validate data
        $request->validate([
            'latitude' => 'required',
            'longitude' => 'required',
            'radius' => 'required|numeric|max:50000|min:50',
            'rankby' => Rule::in(['prominence', 'distance']),
            'minprice' => 'between:0,4|lte:maxprice',
            'maxprice' => 'between:0,4',
        ]);

        // make request
        $r = (new \GuzzleHttp\Client())->request('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json', [
            'query' => array_merge(
                $request->only(['key', 'radius', 'rankby', 'opennow', 'pagetoken']),
                ['location1' => $request->get('latitude') . ',' . $request->get('longitude')],
                ['key' => env('GOOGLE_MAP_API_KEY')]
            ),
        ]);

        // check error
        $data = json_decode((string) $r->getBody());
        $statusCode = 400;
        if ($data->status != 'OK') {
            $message = '';
            switch ($data->status) {
                case 'ZERO_RESULTS':
                    $message = 'No results found';
                    break;
                case 'OVER_QUERY_LIMIT':
                    $message = 'Limit exceeded please contact administrator';
                    $statusCode = 500;
                    break;
                case 'INVALID_REQUEST':
                    $message = 'Request is invalid';
                    break;
                case 'UNKNOWN_ERROR':
                default:
                    $message = 'Unknown error';
                    $statusCode = 500;
            }

            throw new \App\Exceptions\SearchResult($message, $statusCode);
        }

        return (string) $r->getBody();
    }

    public function zomato(Request $request)
    {
    }
}
