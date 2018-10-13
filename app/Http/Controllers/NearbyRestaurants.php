<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

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
            'minprice' => 'between:0,4|lte:maxprice',
            'maxprice' => 'between:0,4',
        ]);

        // construct params
        $queryParams = [];
        if ($request->get('pagetoken', false) && $request->get('pagetoken') !== '') {
            $queryParams = ['pagetoken' => $request->get('pagetoken')];
        } else {
            $queryParams = array_merge(
                $request->only(['key', 'radius', 'pagetoken']),
                ['location' => $request->get('latitude') . ',' . $request->get('longitude'), 'opennow' => true, 'type' => 'restaurant']
            );

            if ($request->get('minprice', false)) {
                $queryParams['minprice'] = $request->get('minprice');
            }

            if ($request->get('maxprice', false)) {
                $queryParams['maxprice'] = $request->get('maxprice');
            }
        }
        // add key back
        $queryParams['key'] = env('GOOGLE_MAP_API_KEY');

        // load cache
        $cacheKey = json_encode($queryParams);
        $dataStr = Cache::get($cacheKey, false);
        if (!$dataStr) {
            // make request
            $r = (new \GuzzleHttp\Client())->request('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json', [
                'query' => $queryParams,
            ]);

            // check error
            $dataStr = (string) $r->getBody();
            $data = json_decode($dataStr);
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
        }

        Cache::store('redis')->put($cacheKey, $dataStr, 10);
        return $dataStr;
    }

    public function zomato(Request $request)
    {
    }
}
