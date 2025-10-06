<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

use Illuminate\Auth\AuthenticationException;
use Throwable;

class Handler extends ExceptionHandler
{
	/**
	 * Register the exception handling callbacks for the application.
	 */
	public function register(): void
	{
		// ...existing code...
	}

	   protected function unauthenticated($request, AuthenticationException $exception)
	   {
		   if ($request->expectsJson() || $request->is('api/*')) {
			   return response()->json(['message' => 'Unauthenticated.'], 401);
		   }

		   return redirect()->guest(route('login'));
	   }
}
