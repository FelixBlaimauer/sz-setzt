<?php

namespace App\Enums;

enum TournamentStage
{
    case GROUP_STAGE;
    case QUARTER_FINAL;
    case SEMI_FINAL;
    case GRAND_FINAL;
    case LOOSERS_FINAL;
}
