<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use JWTAuth;

abstract class APIController extends BaseController
{
    use DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $token = JWTAuth::getToken();
        if (!empty($token)) {
            $this->logged = JWTAuth::toUser($token);
            if ($this->logged) {
                $this->logged->token = $token;
            }
        }
    }
}
