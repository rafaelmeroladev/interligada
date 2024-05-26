<?php

namespace App\Policies;

use App\Models\User;
use App\Models\News;
use Illuminate\Auth\Access\HandlesAuthorization;

class NewsPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any news.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(?User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the news.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\News  $news
     * @return mixed
     */
    public function view(?User $user, News $news)
    {
        return true;
    }

    /**
     * Determine whether the user can create news.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the news.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\News  $news
     * @return mixed
     */
    public function update(User $user, News $news)
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the news.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\News  $news
     * @return mixed
     */
    public function delete(User $user, News $news)
    {
        return $user->isAdmin();
    }
}
