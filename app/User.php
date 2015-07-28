<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Support\Facades\Hash;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{

    use Authenticatable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'gender',
        'activation_code',
        'fb_id',
        'active'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function myplan()
    {
        return $this->hasMany('App\Plan');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function plans()
    {
        return $this->belongsToMany('App\Plan', 'users_plans');
    }

    /**
     * register a user with default falues
     */
    public function register()
    {
        $this->setUsername();
        $this->myplan()->save(new Plan([
            'title'       => 'Initial Plan',
            'description' => '',
            'privacy'     => 'all'
        ]));
        $this->save();

    }

    /**
     * To set the username of the user
     */
    private function setUsername()
    {
        $this->username = $initial = substr($this->email, 0, strpos($this->email, '@'));
        $possibilities = [
            $this->first_name,
            substr($this->first_name, 0, 1) . $this->last_name,
            $this->first_name . '.' . $this->last_name,
        ];
        $i = $j = 0;
        while (self::whereUsername($this->username)->count() > 0) {
            if ($i < count($possibilities)) {
                $username = strtolower($possibilities[$i]);
            } else {
                $j ++;
                $username = strtolower($initial . str_pad($j, 2, '0', STR_PAD_LEFT));
            }
            $this->username = $username;
            $i ++;
        }
    }

}
