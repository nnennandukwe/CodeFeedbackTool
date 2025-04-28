<?php

namespace App\Services;

use Sentry\Laravel\Integration;

class ContentAnalysisService
{
    public function analyzeContent(string $content, string $contentType, array $analysisOptions, string $processingOption)
    {
        // Simulate processing time based on the option
        $delay = $processingOption === 'fast' ? rand(1, 2) : rand(2, 3);
        sleep($delay);

        $feedback = [
            'overall_score' => $this->calculateOverallScore($content),
            'word_count' => str_word_count($content),
            'sentence_count' => $this->countSentences($content),
            'analysis' => []
        ];

        foreach ($analysisOptions as $option) {
            $feedback['analysis'][$option] = $this->performAnalysis($content, $contentType, $option);
        }

        return $feedback;
    }

    protected function calculateOverallScore(string $content): int
    {
        // Simulate a score between 0-100
        return rand(60, 95);
    }

    protected function countSentences(string $content): int
    {
        return preg_match_all('/[.!?]+/', $content);
    }

    protected function performAnalysis(string $content, string $contentType, string $analysisType): array
    {
        $feedback = [
            'score' => rand(60, 95),
            'suggestions' => []
        ];

        switch ($analysisType) {
            case 'tone':
                $feedback['suggestions'] = $this->getToneSuggestions($content, $contentType);
                break;
            case 'grammar':
                $feedback['suggestions'] = $this->getGrammarSuggestions($content);
                break;
            case 'seo':
                $feedback['suggestions'] = $this->getSEOSuggestions($content, $contentType);
                break;
            case 'readability':
                $feedback['suggestions'] = $this->getReadabilitySuggestions($content);
                break;
        }

        return $feedback;
    }

    protected function getToneSuggestions(string $content, string $contentType): array
    {
        $suggestions = [];
        
        switch ($contentType) {
            case 'blog_post':
                $suggestions[] = 'Consider using more engaging language to capture reader attention';
                $suggestions[] = 'Add more personal anecdotes to make the content relatable';
                break;
            case 'email':
                $suggestions[] = 'The tone is professional but could be more conversational';
                $suggestions[] = 'Consider adding a clear call-to-action';
                break;
            case 'product_description':
                $suggestions[] = 'Use more persuasive language to highlight product benefits';
                $suggestions[] = 'Add more emotional triggers to connect with potential customers';
                break;
            case 'social_media':
                $suggestions[] = 'The tone could be more casual and engaging';
                $suggestions[] = 'Consider using more hashtags and emojis';
                break;
        }

        return $suggestions;
    }

    protected function getGrammarSuggestions(string $content): array
    {
        return [
            'Check for subject-verb agreement',
            'Review punctuation usage',
            'Consider sentence structure variety',
            'Look for common spelling mistakes'
        ];
    }

    protected function getSEOSuggestions(string $content, string $contentType): array
    {
        $suggestions = [
            'Include relevant keywords naturally',
            'Optimize meta description',
            'Use proper heading hierarchy'
        ];

        if ($contentType === 'blog_post') {
            $suggestions[] = 'Add internal and external links';
            $suggestions[] = 'Include alt text for images';
        }

        return $suggestions;
    }

    protected function getReadabilitySuggestions(string $content): array
    {
        return [
            'Break down long paragraphs into shorter ones',
            'Use simpler words where possible',
            'Add more white space for better readability',
            'Consider using bullet points for lists'
        ];
    }
} 