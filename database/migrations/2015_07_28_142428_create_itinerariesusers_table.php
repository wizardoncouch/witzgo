<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItinerariesusersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('itineraries_users', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->integer('user_id')->unsigned()->index();
            $table->integer('itinerary_id')->unsigned()->index();
            $table->enum('role', ['admin', 'member'])->default('member');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('itinerary_id')->references('id')->on('itineraries')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('itineraries_users');
    }
}
