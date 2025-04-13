import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CsvTable from './CsvTable';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/data');
    if (!response.ok) {
      return `HTTP error! status: ${response.status}`;
    }
    
    return response;
  } catch (error) {
    return 'Failed to fetch data:' + error;
    throw error;
  }
}


const Resource = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const topic = query.get('topic');
  const [data, setData] = useState(null);


    useEffect(() => {
      fetchData()
        .then(setData)
        .catch((err) => console.error('Error loading data:', err));
    }, []);



  return (
    <div>
      <h1>Resources</h1>
      <CsvTable filePath="ChampaignCountyResourceSheet.xlsx" filterKeywords={topic?.split('-')}/>
      <div>
        <h3>Fetched Data:</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>

  );
};



export default Resource;
