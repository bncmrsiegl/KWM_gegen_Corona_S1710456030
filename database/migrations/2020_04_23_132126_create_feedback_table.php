<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeedbackTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feedback', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('text');

            $table->bigInteger('writer_id')->unsigned();
            $table->foreign('writer_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->bigInteger('shopping_list_id')->unsigned();
            $table->foreign('shopping_list_id')
                ->references('id')
                ->on('shopping_lists')
                ->onDelete('cascade');

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
        Schema::dropIfExists('feedback');
    }
}
