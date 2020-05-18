<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    protected $fillable = ['text', 'writer_id'];

    public function shopping_list() : BelongsTo {
        return $this->belongsTo(ShoppingList::class);
    }

    public function writer() : BelongsTo {
        return $this->belongsTo(User::class);
    }
}
