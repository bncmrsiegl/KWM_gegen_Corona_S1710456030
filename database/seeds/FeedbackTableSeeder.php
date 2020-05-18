<?php

use Illuminate\Database\Seeder;

class FeedbackTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $feedback = new \App\Feedback;
        $feedback->text = "Danke";

        //fk user
        $user = App\User::all()->first();
        $feedback->writer()->associate($user);

        //fk list
        $list = App\ShoppingList::all()->first();
        $feedback->shopping_list()->associate($list);

        $feedback->save();
    }
}
