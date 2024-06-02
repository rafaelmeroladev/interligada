<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;
use App\Policies\GlobalAdminManagerSpeakerPolicy;
use App\Models\News;
use App\Models\Timetable;
use App\Models\Sponsor;
use App\Policies\NewsPolicy;
use App\Policies\TimetablePolicy;
use App\Policies\AdminPolicy;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // User::class => GlobalAdminManagerSpeakerPolicy::class,
        // News::class => AdminPolicy::class,
        // Timetable::class => AdminPolicy::class,
        // Sponsor::class => AdminPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
