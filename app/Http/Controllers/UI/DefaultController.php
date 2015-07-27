<?php

namespace App\Http\Controllers\UI;


use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;

class DefaultController extends Controller
{

    private $view;

    public function __construct()
    {
        $this->view = 'en';
    }

    /**
     * @return mixed
     */
    public function wall()
    {
        return View::make($this->view, ['view' => 'wall']);
    }

    /**
     * @return mixed
     */
    public function signup()
    {
        return View::make($this->view, ['view' => 'signup']);
    }

    /**
     * @return mixed
     */
    public function signin()
    {
        return View::make($this->view, ['view' => 'signin']);
    }

    /**
     * @param null $article
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Routing\Redirector
     */
    public function browse($article = null)
    {
        if ($article == null):
            return redirect('/browse/groups');
        endif;

        $view = null;
        switch ($article):
            case 'groups';
                $view = 'groups';
                break;
            case 'itineraries':
                $view = 'itineraries';
                break;
            case 'destinations':
                $view = 'destinations';
                break;
        endswitch;

        if ($view == null) {
            return response()->view('errors.404', [], 404);
        }

        return View::make($this->view, ['view' => 'browse', 'sub' => $view]);
    }

}
