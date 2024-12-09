<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TeamController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->cannot('create', Team::class)) {
            abort(403);
        }

        Team::create($request->all());

        return Redirect::route('admin.index');
    }

    public function destroy(Request $request, Team $team): RedirectResponse
    {
        if ($request->user()->cannot('delete', $team)) {
            abort(403);
        }

        $team->delete();

        return Redirect::route('admin.index');
    }
}
