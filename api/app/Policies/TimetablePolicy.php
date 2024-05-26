<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Timetable;
use Illuminate\Auth\Access\HandlesAuthorization;

class TimetablePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any timetables.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(?User $user)
    {
        return true;
    }

     /**
     * Determine whether the user can view any timetables.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function showDay(?User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the timetable.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Timetable  $timetable
     * @return mixed
     */
    public function view(?User $user, Timetable $timetable)
    {
        return true;
    }

    /**
     * Determine whether the user can create timetables.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the timetable.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Timetable  $timetable
     * @return mixed
     */
    public function update(User $user, Timetable $timetable)
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the timetable.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Timetable  $timetable
     * @return mixed
     */
    public function delete(User $user, Timetable $timetable)
    {
        return $user->isAdmin();
    }
}
