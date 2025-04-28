import React, { useState } from 'react';
import axios from 'axios';

interface AnalysisResult {
  overall_score: number;
  word_count: number;
  sentence_count: number;
  analysis: {
    [key: string]: {
      score: number;
      suggestions: string[];
    };
  };
}

interface FormData {
  content: string;
  content_type: string;
  analysis_options: string[];
  processing_option: string;
}

const ContentFeedback: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    content: '',
    content_type: 'blog_post',
    analysis_options: ['tone', 'grammar'],
    processing_option: 'fast'
  });

  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      analysis_options: checked
        ? [...prev.analysis_options, value]
        : prev.analysis_options.filter(option => option !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log('Submitting form data:', formData);
      const response = await axios.post('/analyze', formData);
      console.log('Response:', response.data);
      setResults(response.data);
    } catch (err) {
      console.error('Error details:', err);
      setError('An error occurred while analyzing the content');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerError = async (errorType: string) => {
    try {
      await axios.post('/trigger-error', { error_type: errorType });
      alert('Error was successfully triggered and logged to Sentry');
    } catch (err) {
      console.error('Error triggered:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Content Feedback Tool</h1>

      {/* Content Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Content Type</label>
            <select
              name="content_type"
              value={formData.content_type}
              onChange={handleInputChange}
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="blog_post">Blog Post</option>
              <option value="email">Email</option>
              <option value="product_description">Product Description</option>
              <option value="social_media">Social Media</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={6}
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your content here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Analysis Options</label>
            <div className="mt-2 space-y-2">
              {['tone', 'grammar', 'seo', 'readability'].map(option => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.analysis_options.includes(option)}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 capitalize text-black">{option} Analysis</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Processing Option</label>
            <div className="mt-2 space-y-2">
              {['fast', 'detailed'].map(option => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="processing_option"
                    value={option}
                    checked={formData.processing_option === option}
                    onChange={handleInputChange}
                    className="rounded-full border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 capitalize text-black">{option === 'fast' ? 'Fast/Simple' : 'Detailed/Slower'}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Content'}
          </button>
        </form>
      </div>

      {/* Results Display */}
      {results && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Overall Score</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${results.overall_score}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">Score: {results.overall_score}/100</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Word Count</h3>
              <p className="text-2xl font-bold text-indigo-600">{results.word_count}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Sentence Count</h3>
              <p className="text-2xl font-bold text-indigo-600">{results.sentence_count}</p>
            </div>
          </div>

          {Object.entries(results.analysis).map(([type, analysis]) => (
            <div key={type} className="mb-6">
              <h3 className="text-lg font-semibold mb-2 capitalize">{type} Analysis</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${analysis.score}%` }}
                />
              </div>
              <ul className="list-disc list-inside space-y-1">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Error Testing Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Error Testing</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => triggerError('division_by_zero')}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Division by Zero
          </button>
          <button
            onClick={() => triggerError('undefined_variable')}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Undefined Variable
          </button>
          <button
            onClick={() => triggerError('database_error')}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Database Error
          </button>
          <button
            onClick={() => triggerError('async_error')}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Async Error
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default ContentFeedback; 