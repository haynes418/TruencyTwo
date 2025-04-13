// FileUpload.jsx
import React, { useState } from 'react';
import { Button, message, Spin } from 'antd'; // Ant Design components
import * as XLSX from 'xlsx';  // Import xlsx library for reading Excel files
import axios from 'axios'; // For making the API request

const FileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      message.error("Please select a file.");
      return;
    }

    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      message.error("Please upload an Excel file.");
      return;
    }

    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assuming the first sheet contains the data you need
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        
        // Prepare data for API
        const jsonPayload = JSON.stringify({ data: jsonData });

        // Send the JSON data to the backend API
        const response = await axios.post('http://localhost:3000/upload', jsonPayload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Handle response from the API
        if (response.status === 200) {
          message.success("File uploaded and processed successfully!");
        } else {
          message.error("Failed to upload file.");
        }
      };

      // Read the file as binary string
      reader.readAsBinaryString(file);
    } catch (error) {
      message.error("An error occurred while processing the file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Spin spinning={isLoading} tip="Uploading...">
        <div style={styles.content}>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            style={styles.fileInput}
          />
          <Button
            type="primary"
            onClick={() => document.querySelector('input[type="file"]').click()}
            style={styles.uploadButton}
          >
            Upload Excel File
          </Button>
        </div>
      </Spin>
    </div>
  );
};

// Styles for centering the content
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full screen height
    backgroundColor: '#f0f2f5',
  },
  content: {
    textAlign: 'center',
  },
  fileInput: {
    display: 'none',
  },
  uploadButton: {
    marginTop: '20px',
    fontSize: '16px',
  },
};

export default FileUpload;
