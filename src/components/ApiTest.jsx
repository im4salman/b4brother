import React, { useState } from 'react';
import apiClient from '../utils/apiClient';

const ApiTest = () => {
    const [testResults, setTestResults] = useState(null);
    const [testing, setTesting] = useState(false);

    const runQuickTest = async () => {
        setTesting(true);
        setTestResults(null);

        try {
            console.log('🧪 Running quick API test...');
            
            // Test basic connectivity
            const healthCheck = await apiClient.testApiHealth();
            
            // Test a simple GET request to each endpoint
            const testResults = {
                health: healthCheck,
                basicTests: {}
            };

            // Test each endpoint with a simple request
            const endpoints = ['applications', 'feedback', 'contact', 'reach-us'];
            
            for (const endpoint of endpoints) {
                try {
                    console.log(`Testing ${endpoint}...`);
                    const result = await fetch(`${apiClient.baseURL}/${endpoint}`);
                    testResults.basicTests[endpoint] = {
                        status: result.status,
                        success: result.status < 500,
                        message: `${result.status} ${result.statusText}`
                    };
                } catch (error) {
                    testResults.basicTests[endpoint] = {
                        status: null,
                        success: false,
                        message: error.message
                    };
                }
            }

            setTestResults(testResults);
        } catch (error) {
            console.error('Test failed:', error);
            setTestResults({
                error: error.message,
                timestamp: new Date().toISOString()
            });
        } finally {
            setTesting(false);
        }
    };

    if (process.env.NODE_ENV === 'production') {
        return null; // Hide in production
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-800">API Test (Dev Only)</h3>
                    <button
                        onClick={runQuickTest}
                        disabled={testing}
                        className="text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-1 rounded"
                    >
                        {testing ? 'Testing...' : 'Test API'}
                    </button>
                </div>

                {testing && (
                    <div className="text-xs text-gray-600 mb-2">
                        Running API connectivity tests...
                    </div>
                )}

                {testResults && (
                    <div className="text-xs space-y-2">
                        {testResults.error ? (
                            <div className="text-red-600">
                                Error: {testResults.error}
                            </div>
                        ) : (
                            <>
                                <div className="font-medium text-gray-800">Results:</div>
                                {testResults.basicTests && Object.entries(testResults.basicTests).map(([endpoint, result]) => (
                                    <div key={endpoint} className="flex justify-between">
                                        <span className="text-gray-600">{endpoint}:</span>
                                        <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                                            {result.message}
                                        </span>
                                    </div>
                                ))}
                                <div className="text-gray-500 mt-2">
                                    Base URL: {testResults.health?.baseUrl}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApiTest;
