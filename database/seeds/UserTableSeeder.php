<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
        DB::table('users')->insert([
            [
                'email'      => 'footless.hero@gmail.com',
                'username'   => 'footless.hero',
                'password'   => Hash::make('0-sum!'),
                'active'     => 1,
                'first_name' => 'Footless',
                'last_name'  => 'Hero',
                'gender'     => 'm'
            ],
            [
                'email'      => 'wizardoncouch@gmail.com',
                'username'   => 'wizardoncouch',
                'password'   => Hash::make('0-sum!'),
                'active'     => 1,
                'first_name' => 'Wizard',
                'last_name'  => 'Couch',
                'gender'     => 'f'
            ]
        ]);
    }
}
