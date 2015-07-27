<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('email')->unique();
            $table->string('username')->unique();
            $table->string('password', 60);
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('gender', ['m', 'f']);
            $table->string('avatar')->default('/images/avatar.jpg');
            $table->string('permissions')->default(json_encode(['personal']));
            $table->boolean('active')->default(0);
            $table->string('activation_code')->nullable();
            $table->timestamp('activated_at')->nullable();
            $table->boolean('is_fb')->default(0);
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
        Schema::drop('users');
    }
}
