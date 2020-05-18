<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = new \App\User;
        $user1->firstname = "Robin";
        $user1->lastname = "Hood";
        $user1->address = "Haupstraße 104";
        $user1->email = "user1@gmail.com";
        $user1->password = bcrypt("user1");
        $user1->is_helper = false;
        $user1->save();

        $user2 = new \App\User;
        $user2->firstname = "Peter";
        $user2->lastname = "Pan";
        $user2->address = "Alm 4";
        $user2->email = "user2@gmail.com";
        $user2->password = bcrypt("user2");
        $user2->is_helper = true;
        $user2->save();

        $user3 = new \App\User;
        $user3->firstname = "Daniel";
        $user3->lastname = "Düsentrieb";
        $user3->address = "Hauptplatz 10";
        $user3->email = "user3@gmail.com";
        $user3->password = bcrypt("user3");
        $user3->is_helper = false;
        $user3->save();

        $user4 = new \App\User;
        $user4->firstname = "Mary";
        $user4->lastname = "Poppins";
        $user4->address = "Wienerstraße 43";
        $user4->email = "user4@gmail.com";
        $user4->password = bcrypt("user4");
        $user4->is_helper = true;
        $user4->save();
    }
}
