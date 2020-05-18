<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    protected $fillable = ['description', 'quantity', 'max_price'];

    public function shopping_list() : BelongsTo {
        return $this->belongsTo(ShoppingList::class);
    }
}
