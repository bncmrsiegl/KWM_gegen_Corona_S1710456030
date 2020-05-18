<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShoppingListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopping_lists', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->string('title');
            $table->date('dueDate');
            $table->float('total_price');

            //fk fields for relations + constraints
            $table->bigInteger('creator_id')->unsigned();
            $table->foreign('creator_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->bigInteger('helper_id')->unsigned()->nullable();
            $table->foreign('helper_id')
                ->references('id')
                ->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopping_lists');
    }
}
