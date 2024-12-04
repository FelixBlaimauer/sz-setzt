<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(Request $request): Response
    {
        if (!$request->user()->can('create', Team::class)) {
            abort(403);
        }

        return Inertia::render('Admin/Index', [
            'teams' => Team::all(),
        ]);
    }
}
