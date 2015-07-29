<?php

namespace App\Http\Controllers\UI;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    private $view;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->view = 'en';
    }

    /**
     * @param $username
     */
    public function dashboard($username)
    {
        return View::make($this->view, ['view' => 'user-dashboard']);
    }

    public function about($username)
    {

    }

    public function books($username)
    {

    }

}
