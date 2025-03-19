import React from 'react';
import CsvTable from './CsvTable';

const Resource = () => {
  return (
    <div>
      <h1>Resources</h1>
      <CsvTable filePath="ChampaignCountyResourceSheet.csv"/>
    </div>
  );
};

export default Resource;
