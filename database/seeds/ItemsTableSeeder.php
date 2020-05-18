<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $item = new \App\Item;
        $item->description = "Bananen";
        $item->quantity = 5;
        $item->max_price = 3.50;

        $list = App\ShoppingList::all()->first();
        $item->shopping_list()->associate($list);

        $item->save();


    }
}
