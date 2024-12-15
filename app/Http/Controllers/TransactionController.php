<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Models\Role;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        if ($request->user()->cannot('create', Transaction::class)) {
            abort(403);
        }

        $transaction = new Transaction([
            'user_id' => $request->input('user_id'),
            'amount' => $request->amount,
            'type' => TransactionType::DEPOSIT,
        ]);

        $transaction->save();
    }
}
