<?php

namespace app\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Paiement
 * @package app\models
 */
class Paiement extends Model {
    public $timestamps = false;
    protected $table = "paiements";
    protected $primaryKey = "id";

    public function commande(): BelongsTo {
        return $this->belongsTo('\app\models\Commande');
    }
}