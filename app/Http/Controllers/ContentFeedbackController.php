<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ContentAnalysisService;
use Sentry\Laravel\Integration;

class ContentFeedbackController extends Controller
{
    protected $analysisService;

    public function __construct(ContentAnalysisService $analysisService)
    {
        $this->analysisService = $analysisService;
    }

    public function index()
    {
        return response()->json([
            'message' => 'Content Feedback Tool API is ready'
        ]);
    }

    public function analyze(Request $request)
    {
        $request->validate([
            'content' => 'required|min:50',
            'content_type' => 'required|in:blog_post,email,product_description,social_media',
            'analysis_options' => 'required|array',
            'analysis_options.*' => 'in:tone,grammar,seo,readability',
            'processing_option' => 'required|in:fast,detailed'
        ]);

        try {
            $feedback = $this->analysisService->analyzeContent(
                $request->content,
                $request->content_type,
                $request->analysis_options,
                $request->processing_option
            );

            return response()->json($feedback);
        } catch (\Exception $e) {
            Integration::captureException($e);
            return response()->json(['error' => 'An error occurred during analysis'], 500);
        }
    }

    public function triggerError(Request $request)
    {
        $errorType = $request->input('error_type');

        switch ($errorType) {
            case 'division_by_zero':
                $result = 1 / 0;
                break;
            case 'undefined_variable':
                echo $undefinedVariable;
                break;
            case 'database_error':
                \DB::table('non_existent_table')->get();
                break;
            case 'async_error':
                throw new \Exception('Simulated async error');
                break;
            default:
                return response()->json(['error' => 'Invalid error type'], 400);
        }
    }
} 