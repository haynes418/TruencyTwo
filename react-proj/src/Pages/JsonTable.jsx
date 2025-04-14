import React, { useState, useEffect } from 'react';
import { Collapse, Table, Checkbox, Row, Col, Input, Modal, Rate } from 'antd';

const { Panel } = Collapse;
const { Search } = Input;

const JsonTable = ({ filterKeywords }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columns, setColumns] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');
  const [currentLink, setCurrentLink] = useState('');


  //Modal for link feedback
  const showModal = (link) => {
    setCurrentLink(link);
    setIsModalOpen(true);
  };
  

  const handleOk = async () => {
    try {
      const response = await fetch('http://10.96.84.170:3030/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: currentLink,
          rating,
          comment: note,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
  
      console.log('Feedback submitted!');
    } catch (err) {
      console.error(err.message);
    } finally {
      // Reset state
      setIsModalOpen(false);
      setRating(0);
      setNote('');
      setCurrentLink('');
    }
  };
  
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await fetch('http://10.96.84.170:3030/data');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const jsonData = await response.json();
        const payloadData = jsonData.data[0].data
        processJsonData(payloadData); // Process the data after fetching
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    // Start loading the data
    fetchFileData();
  }, []);

  // Process the JSON data
  const processJsonData = (jsonData) => {
    // Detect and convert array-of-arrays format
    if (Array.isArray(jsonData) && Array.isArray(jsonData[0])) {
      const [headers, ...rows] = jsonData;
      jsonData = rows.map(row => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] || '';
        });
        return obj;
      });
    }
  
    const groupedData = groupDataByCategory(jsonData);
    setData(groupedData);
    setFilteredData(groupedData);
    setLoading(false);
  
    // Find first valid data row for columns
    const firstValidRow = jsonData.find(row => {
      const keys = Object.keys(row);
      return keys.length > 1 && keys.slice(1).some(key => row[key] && row[key].trim() !== "");
    });
  
    if (!firstValidRow) {
      setColumns([]);
      return;
    }
  
    const allColumns = Object.keys(firstValidRow).map((key) => ({
      title: key,
      dataIndex: key,
      key: key,
      render: (text) => {
        if (key === 'Website' && isValidUrl(text)) {
          return (
            <a
              href={text}
              onClick={(e) => {
                e.preventDefault();
        
                // Track click immediately
                fetch('http://10.96.84.170:3030/click', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ link: text }),
                }).catch(err => {
                  console.error('Click tracking failed:', err.message);
                });
        
                // Open the link in a new tab
                window.open(text, '_blank', 'noopener,noreferrer');
        
                // Show feedback modal
                showModal(text);
              }}
            >
              {text}
            </a>
          );
        }
        
        return text;
      },
    }));
  
    setColumns(allColumns);
  
    const initialVisibility = allColumns.reduce((acc, col) => {
      acc[col.key] = true;
      return acc;
    }, {});
    setColumnVisibility(initialVisibility);
  };
  
  

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

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
    if (!value) {
      setFilteredData(data);
      return;
    }

    const filtered = data.map(group => {
      const filteredRows = group.data.filter(row =>
        Object.values(row).some(cell =>
          cell && cell.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      return { ...group, data: filteredRows };
    }).filter(group => group.data.length > 0);

    setFilteredData(filtered);
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

  let filteredData1 = data;

  if (filterKeywords) {
    filteredData1 = data.filter(categoryGroup => {
      return filterKeywords.some(keyword => categoryGroup.category?.toLowerCase().includes(keyword.toLowerCase()));
    });
  }

  return (
    <div>
      {}
      <Modal 
  title="How useful was this link?"
  open={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  {/* Show the current link */}
  <p>
    Link: <a href={currentLink} target="_blank" rel="noopener noreferrer">{currentLink}</a>
  </p>

  <Rate onChange={setRating} value={rating} />
  <p>Your rating: {rating} star{rating === 1 ? '' : 's'}</p>

  <Input.TextArea
    rows={4}
    placeholder="Leave a comment or suggestion..."
    value={note}
    onChange={(e) => setNote(e.target.value)}
  />
</Modal>


      <Search
        placeholder="Search resources..."
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchText}
        style={{ marginBottom: '16px', maxWidth: 400 }}
        allowClear
      />

      <Collapse accordion>
        {filteredData1.map((categoryGroup, index) => {
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

export default JsonTable;
