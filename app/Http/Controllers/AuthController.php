<?php

namespace App\Http\Controllers;

use App\User;
use function foo\func;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $login = $request->get('loginData', null);
        $password = $request->get('passwordData', null);

        $query = User::query()->where('login', '=', $login)->get();
        $user = $query->get('0');
        if (md5($password) === $user->password) {
            $token = md5(rand(10000, 100000));
            User::find($user->user_id)->update(['token' => $token]);
            return (['status' => true, 'login' => $login, 'token' => $token, 'role' => $user->role]);
        } else {
            return (['status' => false]);
        }
    }

    public function checkAuth(Request $request)
    {
        $token = $request->get('token', null);
        $login = $request->get('login', null);

        if (!is_null($token) && !is_null($login)) {
            $user = User::query()->where('token', '=', $token)->where('login', '=', $login)->get();
            if (!is_null($user->get(0))) {
                return (['status' => true]);
            } else {
                return (['status' => false]);
            }
        }else {
            return (['status' => false]);
        }
    }
}
