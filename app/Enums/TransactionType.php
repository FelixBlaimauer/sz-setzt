<?php

namespace App\Enums;

enum TransactionType
{
    case DEPOSIT;
    case WITHDRAW;
    case SPEND;
    case EARN;
}
