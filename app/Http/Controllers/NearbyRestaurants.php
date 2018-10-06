<?php

namespace App\Http\Controllers;

class NearbyRestaurants extends Controller
{
    public function index()
    {
        return view('nearby_restaurants.index');
    }

    public function google()
    {
    }

    public function zomato()
    {
    }
}
