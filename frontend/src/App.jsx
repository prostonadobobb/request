import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [concurrency, setConcurrency] = useState(1);
  const [requestsPerSecond, setRequestsPerSecond] = useState(1);
  const [started, setStarted] = useState(false);
  const [responses, setResponses] = useState([]);

  const handleStart = async () => {
    setStarted(true);
    const interval = 1000 / requestsPerSecond;
    for (let i = 1; i <= 1000; i++) {
      await sendRequest(i);
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    setStarted(false);
  };

  const sendRequest = async (index) => {
    try {
      const response = await fetch(`http://localhost:3001/api?index=${index}`);

      if (!response.ok) {
        throw new Error('Server response not ok');
      }

      const data = await response.text();
      setResponses(prevResponses => [...prevResponses, data]);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  
  return (
    <div>
      <label>
        Concurrency Limit:
        <input
          type="number"
          value={concurrency}
          min="0"
          max="100"
          onChange={(e) => setConcurrency(parseInt(e.target.value))}
          disabled={started}
        />
      </label>
      <br />
      <label>
        Requests per Second:
        <input
          type="number"
          value={requestsPerSecond}
          min="0"
          max="100"
          onChange={(e) => setRequestsPerSecond(parseInt(e.target.value))}
          disabled={started}
        />
      </label>
      <br />
      <button onClick={handleStart} disabled={started}>
        Start
      </button>
      <ul>
        {responses.map((response, index) => (
          <li key={index}>{response}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
