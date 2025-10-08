<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    // Fields that can be mass-assigned
    protected $fillable = [
        'title',
        'content',
        'image',
        'user_id',
    ];

    // Each blog belongs to a user (the admin who created it)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
