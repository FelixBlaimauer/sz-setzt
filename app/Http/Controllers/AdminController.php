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
        if ($request->user()->cannot('create', Team::class)) {
            abort(403);
        }

        return Inertia::render('Admin/Index', [
            'teams' => Team::all(),
        ]);
    }

    public function deposit(Request $request): Response
    {
        $userId = $request->query('userId');
        if ($request->user()->cannot('create', Team::class)) {
            abort(403);
        }

        if (!$userId) {
            abort(404);
        }

        return Inertia::render('Admin/Deposit', [
            'userId' => $userId,
        ]);
    }
}
