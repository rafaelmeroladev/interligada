<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GlobalAdminManagerPolicy
{
    use HandlesAuthorization;

    public function isAdmin(User $user)
    {
        return $user->isAdmin();
    }

    public function isManager(User $user)
    {
        return $user->isManager();
    }

    public function isSpeaker(User $user)
    {
        return $user->isSpeaker();
    }
}
