<?php

namespace App\Http\Controllers;

use App\Location;
use App\Task;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class TasksController extends Controller
{
    public function search(Request $request)
    {

        $tittle = $request->get('tittle', null);
        $date = $request->get('date', null);
        $creator = $request->get('creator', null);
        $performing = $request->get('performing', null);
        $location = $request->get('location', null);
        $theme = $request->get('theme', null);
        $status = $request->get('status', null);

        $tasks = Task::query()->join('locations','tasks.location', '=', 'locations.location_id')
            ->with('creator')
            ->with('performing')
            ->with('lastEditor');


        if ($tittle !== 'null') {
            $tasks = $tasks->where('tittle', 'like', "%$tittle%");
        }
//        if (!is_null($date)){
//            $date = new Date($date);
//            $tasks = $tasks->where('tittle','like', "%$tittle%");
//        }
        if ($creator !== 'null') {
            $tasks = $tasks->where('creator', '=', "$creator");
        }
        if ($performing !== 'null') {
            $tasks = $tasks->where('performing', '=', "$performing");
        }
        if ($location !== 'null') {
            $tasks = $tasks->where('location', '=', "$location");
        }
        if ($theme !== 'null') {
            $tasks = $tasks->where('theme', '=', "$theme");
        }
        if ($status !== 'null') {
            $tasks = $tasks->where('status', '=', "$status");
        }

        return $tasks->get();
    }

    public function locations()
    {
        $locations = Location::all();
        return $locations;
    }

    public function users()
    {
        $users = User::all();
        return $users;
    }

    public function addTask(Request $request) {
        $description = $request->get('description', null);
        $title = $request->get('title', null);
        $location = $request->get('location', null);

        (new Task())->fill([
           'tittle' => $title,
           'description' => $description,
            'location' => $location,
            'create_at' => \date('Y-m-d'),
            'creator' => 2,
            'status' => 1,
            'theme' => 1
        ])->save();
        return ['status' => true];
    }

}
