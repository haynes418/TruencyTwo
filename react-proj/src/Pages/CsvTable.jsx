import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Collapse, Table, Checkbox, Row, Col } from 'antd';

const { Panel } = Collapse;

const CsvTable = ({ filePath }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Error fetching CSV file: ${response.statusText}`);
        }

        const text = await response.text();

        // Parse the CSV data into JSON format
        Papa.parse(text, {
          complete: (result) => {
            const groupedData = groupDataByCategory(result.data);
            setData(groupedData);
            setLoading(false); // Set loading to false after data is loaded

            // Initialize columns
            const allColumns = Object.keys(result.data[0]).map((key) => ({
              title: key,
              dataIndex: key,
              key: key,
              render: (text) => {
                // Render a clickable link for the Website column
                if (key === 'Website' && isValidUrl(text)) {
                  return <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>;
                }
                return text; // Render text for other columns
              },
            }));

            setColumns(allColumns);

            // Set default visibility for columns (all visible by default)
            const initialVisibility = allColumns.reduce((acc, col) => {
              acc[col.key] = true; // Initially all columns are visible
              return acc;
            }, {});
            setColumnVisibility(initialVisibility);
          },
          header: true, // Assuming the first row is the header
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCsvData();
  }, [filePath]);

  // Group data by categories
  const groupDataByCategory = (rows) => {
    const categories = [];
    let currentCategory = null;
    let currentCategoryData = [];

    rows.forEach((row) => {
      if (row && row[Object.keys(row)[0]] && Object.keys(row).slice(1).every((key) => !row[key])) {
        // Detect category row (first column has data, others are empty)
        if (currentCategory) {
          categories.push({ category: currentCategory, data: currentCategoryData });
        }
        currentCategory = row[Object.keys(row)[0]]; // Set the category name
        currentCategoryData = []; // Reset data for the new category
      } else {
        currentCategoryData.push(row);
      }
    });

    // Push the last category's data
    if (currentCategory) {
      categories.push({ category: currentCategory, data: currentCategoryData });
    }

    return categories;
  };

  // Function to check if a string is a valid URL
  const isValidUrl = (url) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  };

  // Toggle column visibility
  const handleColumnVisibilityChange = (columnKey) => {
    setColumnVisibility(prevState => ({
      ...prevState,
      [columnKey]: !prevState[columnKey],
    }));
  };

  // Filter columns to include only those with data
  const getColumnsForCategory = (categoryData) => {
    return columns.filter((col) => {
      // Check if column is "Description" or "Notes" and whether they have any data in the current category
      if (col.title === "Description" || col.title === "Notes") {
        return categoryData.some(row => row[col.key] && row[col.key].trim() !== "");
      }
      return true; // Always show columns that are not "Description" or "Notes"
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data.length) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <Collapse accordion>
        {data.map((categoryGroup, index) => {
          // Get only the columns that have data in "Description" or "Notes"
          const filteredColumns = getColumnsForCategory(categoryGroup.data);

          return (
            <Panel header={categoryGroup.category} key={index}>
              <Table
                columns={filteredColumns} // Filter columns to only show those with data
                dataSource={categoryGroup.data}
                rowKey={(record, rowIndex) => rowIndex}
                pagination={false}
                bordered
              />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default CsvTable;
