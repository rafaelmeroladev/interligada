<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GlobalAdminManagerPolicy
{
    public function update(User $user) {
        return $user->isAdmin() || $user->isManager();
    }
    
}
