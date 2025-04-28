<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContentFeedbackController;

Route::get('/', function () {
    return Inertia::render('ContentFeedback');
})->name('content-feedback.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::post('/analyze', [ContentFeedbackController::class, 'analyze'])->name('content-feedback.analyze');
Route::post('/trigger-error', [ContentFeedbackController::class, 'triggerError'])->name('content-feedback.trigger-error');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
