<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\APIController;
use App\Http\Requests\ActivateAccountRequest;
use App\Http\Requests\FBSigninRequest;
use App\Http\Requests\SigninRequest;
use App\Http\Requests\SignupRequest;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends APIController
{

    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    */

    /**
     * Handles the login request.
     * @param SigninRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signin(SigninRequest $request)
    {
        try {
            $field = filter_var($request->get('user'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
            $request->merge([$field => $request->get('user')]);

            // Grab credentials from the request.
            $credentials = $request->only($field, 'password');
            $credentials['active'] = 1;
            // Attempt to verify the credentials and create a token for the user.
            $customClaims = ['company' => 'WITZGO.COM', 'timestamp' => time()];
            if (!$token = JWTAuth::attempt($credentials, $customClaims)) {
                return response()->json(['Invalid Credentials'], 422);
            }
            if ($user = JWTAuth::toUser($token)) {
                $user->token = $token;
                session(['token' => $token]);

                return response()->json($user);
            }

            return response()->json(['User not found'], 401);
        } catch (JWTException $e) {
            // Something went wrong whilst attempting to encode the token.
            return response()->json([$e->getMessage()], 500);
        } catch (Exception $e) {
            // Server Error
            return response()->json([$e->getMessage()], 500);
        }

    }

    /**
     * Handles the registration request.
     *
     * @param SignupRequest $request
     * @return User
     */
    public function signup(SignupRequest $request)
    {
        try {
            // Process the requests provided.
            $email = $request->get('email');
            $data = [
                'first_name'      => $request->get('first_name'),
                'last_name'       => $request->get('last_name'),
                'email'           => $email,
                'password'        => Hash::make($request->get('password')),
                'gender'          => $request->get('gender'),
                'activation_code' => Hash::make($email . Carbon::now())
            ];
            // Create a new user.
            $response = User::create($data);

            // Set default values after creating an entry in the users table.
            $response->register();

            // Add to queue the user activation email.
            Mail::queue('emails.activate-user', $data, function ($message) use ($email) {
                $message->from(env('MAIL_ADDRESS', 'mail@example.com'), env('MAIL_NAME', 'Wizard Mailer'));
                $message->to($email);
                $message->subject(trans('app.account_activation'));
            });

            $statusCode = 200;
        } catch (\Exception $e) {
            $response = $e->getMessage();
            $statusCode = 500;
        }

        return response()->json(compact('response'), $statusCode);
    }

    public function fbSignin(FBSigninRequest $request)
    {
        try {
            // Process the requests provided.
            $email = $request->get('email');
            $fb_id = (int)$request->get('id');
            if (User::whereFbId($fb_id)->count() == 0) {
                $data = [
                    'first_name' => $request->get('first_name'),
                    'last_name'  => $request->get('last_name'),
                    'email'      => $email,
                    'password'   => Hash::make($fb_id),
                    'gender'     => $request->get('gender'),
                    'fb_id'      => $fb_id,
                    'active'     => 1
                ];
                // Create a new user.
                $response = User::create($data);
                //get and set profile picture
                if ($profile = @file_get_contents($request->get('url'))) {
                    $dir = public_path() . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'profile';
                    if (!is_dir($dir)) {
                        @mkdir($dir, 0777, true);
                    }
                    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    $crypt = '';
                    for ($i = 0; $i < 10; $i++) {
                        $crypt .= $characters[rand(0, strlen($characters) - 1)];
                    }
                    $avatar = $dir . DIRECTORY_SEPARATOR . md5($fb_id.$crypt) . '-avatar.jpg';
                    if (@file_put_contents($avatar, $profile)) {
                        $response->avatar = $avatar;
                    }
                }
                $response->activated_at = Carbon::now();
                // Set default values after creating an entry in the users table.
                $response->register();
            }
            $credentials = [
                'fb_id'    => $fb_id,
                'password' => $fb_id
            ];
            $customClaims = [
                'company'   => 'WITZGO.COM',
                'timestamp' => time()
            ];
            if($token = JWTAuth::attempt($credentials, $customClaims)){
                if ($response = JWTAuth::toUser($token)) {
                    $response->token = $token;

                    return response()->json($response);
                }
            }

            return response()->json(['User not found.'], 401);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

    }

    /**
     * Activate the user, the link comes from the email sent upon registration.
     * @param ActivateAccountRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function activate(ActivateAccountRequest $request)
    {
        try {
            if (
            User::where('email', $request->get('email'))
                ->where('activation_code', $request->get('code'))
                ->where('active', 0)
                ->update([
                    'active'          => 1,
                    'activation_code' => '',
                    'activated_at'    => Carbon::now()
                ])
            ) {
                $response = 'Activated';
            } else {
                $response = 'Activation Failed';
            }
            $statusCode = 200;

        } catch (\PDOException $e) {
            $response = $e->getMessage();
            $statusCode = $e->getCode();
        } catch (\Exception $e) {
            $response = $e->getMessage();
            $statusCode = $e->getCode();
        }

        return response()->json(compact('response'), $statusCode);
    }

    /**
     * Deactivate active user.
     * @return \Illuminate\Http\JsonResponse
     */
    public function signout()
    {
        try {
            $response = JWTAuth::setToken($this->logged->token)->invalidate();
            $statusCode = 200;
        } catch (JWTException $e) {
            $response = $e->getMessage();
            $statusCode = $e->getCode();
        } catch (\Exception $e) {
            $response = $e->getMessage();
            $statusCode = $e->getCode();
        }

        return response()->json(compact('response'), $statusCode);
    }

}
