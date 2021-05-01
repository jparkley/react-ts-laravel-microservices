<?php

namespace App\Models;

use App\Models\Permission;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public $timestamps = false;

    public function permissions() {
        return $this->belongsToMany(Permission::class, 'role_permission');
    }
}
