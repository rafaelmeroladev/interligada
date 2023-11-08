<?php

namespace App\Policies;

use App\Models\User;

class GlobalAdminManagerSpeakerPolicy
{
    public function activeRequestsSystem(User $user) {
        return $user->isAdmin() || $user->isManager() || $user->isSpeaker();
    }

    public function readRequests(User $user) {
        return $user->isAdmin() || $user->isManager() || $user->isSpeaker();
    }
}
