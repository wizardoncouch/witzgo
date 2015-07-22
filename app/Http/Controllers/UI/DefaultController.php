<?php

namespace App\Http\Controllers\UI;


use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;

class DefaultController extends Controller
{
    /**
     * @return mixed
     */
    public function wall()
    {
        return View::make('default', ['view' => 'wall']);
    }

    /**
     * @return mixed
     */
    public function signup()
    {
        return View::make('default', ['view' => 'signup']);
    }

    /**
     * @return mixed
     */
    public function signin()
    {
        return View::make('default', ['view' => 'signin']);
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
        return View::make('default', ['view' => 'browse', 'sub' => $view]);
    }

}
