<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShoppingList extends Model
{
    protected $fillable = ['title', 'dueDate', 'total_price', 'creator_id', 'helper_id'];

    public function creator() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function helper() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function items() : HasMany {
        return $this->hasMany(Item::class);
    }

    public function feedbacks() : HasMany {
        return $this->hasMany(Feedback::class);
    }

}
