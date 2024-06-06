<?php

namespace App\Providers;

use App\Models\User;
use App\Policies\GlobalAdminManagerPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        User::class => GlobalAdminManagerPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();

        Gate::define('isAdmin', function ($user) {
            return $user->isAdmin();
        });

        Gate::define('isManager', function ($user) {
            return $user->isManager();
        });

        Gate::define('isSpeaker', function ($user) {
            return $user->isSpeaker();
        });
    }
}
