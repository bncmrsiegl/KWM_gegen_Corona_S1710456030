<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ShoppingListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $helper = new App\User;
        $creator = new App\User;
        $users = \App\User::all();

        foreach ($users as $user) {
            if($user->is_helper == true) {
                $helper = $user;
            }
            if($user->is_helper == false) {
                $creator = $user;
            }
        }

        //---------- LIST 1 --------------

        $list1 = new \App\ShoppingList;
        $list1->title = "Dringend";
        $list1->dueDate = "2020-05-01";
        $list1->total_price = 5.23;

//        $item1 = new \App\Item;
//        $item1->description = "Mango";
//        $item1->quantity = 4;
//        $item1->max_price = 2;
//
//        $item2 = new \App\Item;
//        $item2->description = "Bier";
//        $item2->quantity = 24;
//        $item2->max_price = 15;
//
//        $list2->item()->saveMany([$item1, $item2]);

        $list1->creator()->associate($creator);
        $list1->save();

        $list1->helper()->associate($helper);
        $list1->save();

        //---------- LIST 2 --------------

        $list2 = new \App\ShoppingList;
        $list2->title = "Einkaufsliste von Opa";
        $list2->dueDate = "2020-05-28";
        $list2->total_price = 0;
        $list2->creator()->associate($creator);
        $list2->save();

    }
}
