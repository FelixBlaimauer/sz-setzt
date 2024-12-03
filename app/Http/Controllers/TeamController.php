<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->can('create', Team::class)) {
            abort(403);
        }

        return redirect('/teams');
    }
}
