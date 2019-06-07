<?php

namespace App\Http\Controllers;

use App\User;
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
            return (['status' => true, 'login' => $login]);
        }else {
            return (['status' => false]);
        }
    }
}
