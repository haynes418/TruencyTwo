import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import JsonTable from './JsonTable';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

async function fetchData() {
  try {
    //    const response = await fetch('http://localhost:3000/health');
    const response = await fetch('http://192.5.19.133:3030/health');
    if (!response.ok) {
      return `HTTP error! status: ${response.status}`;
    }

    return response.json();
  } catch (error) {
    return 'Failed to fetch data: ' + error;
  }
}

const Resource = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const topic = query.get('topic');
  const [data, setData] = useState(null);

  const loadData = () => {
    fetchData()
      .then(setData)
      .catch((err) => console.error('Error loading data:', err));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>Resources</h1>
      <JsonTable filterKeywords={topic?.split('-')} />
      
      <div>
        <h3>Fetched Data:</h3>
        <button onClick={loadData}>🔄 Refetch Data</button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Resource;
