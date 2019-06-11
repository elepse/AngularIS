<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';
    protected $guarded = [''];
    public $timestamps = false;

    public function creator() {
        return $this->belongsTo(User::class, 'creator', 'user_id');
    }
    public function performing() {
        return $this->belongsTo(User::class, 'performing','user_id');
    }
    public function lastEditor() {
        return $this->belongsTo(User::class, 'last_editor', 'user_id');
    }
}
