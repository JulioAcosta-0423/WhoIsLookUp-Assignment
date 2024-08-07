import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DomainLookupForm from './components/DomainLookupForm';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = async (domain, infoType) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      // Replace with your actual backend API endpoint
      const response = await axios.post('http://localhost:8000/api/whois-info', {
          domain: domain,
          type: infoType
      });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">WHOIS Domain Lookup</h1>
      <DomainLookupForm onLookup={handleLookup} />
      {isLoading && <div className="alert alert-info mt-3">Loading...</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {results && <ResultsDisplay results={results} />}
    </div>
  );
}

export default App;