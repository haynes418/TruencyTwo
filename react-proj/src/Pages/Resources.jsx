import React from 'react';
import { useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CsvTable from './CsvTable';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Resource = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const topic = query.get('topic');
  return (
    <div>
      <button onClick={() => navigate(-1)} className="Back-button Back-button--filled">Back</button>
      <h1>Resources</h1>
      <CsvTable filePath="ChampaignCountyResourceSheet.xlsx" filterTopic={topic}/>
    </div>
  );
};

export default Resource;
