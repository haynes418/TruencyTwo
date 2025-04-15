import React, { useState } from 'react';
import { Button, message, Spin, Modal } from 'antd'; // Added Modal
import * as XLSX from 'xlsx';
import axios from 'axios';



const FileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    title: '',
    content: '',
  });

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

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const jsonPayload = JSON.stringify({ data: jsonData });

        const response = await axios.post('http://localhost:3000/upload', jsonPayload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200 || response.status === 201) {
          message.success("File uploaded and processed successfully!");
          setModalInfo({
            visible: true,
            title: 'Upload Successful',
            content: 'Your Excel file has been successfully uploaded and processed.',
          });
        } else {
          message.error("Failed to upload file.");
          setModalInfo({
            visible: true,
            title: 'Upload Failed',
            content: 'The server returned an error - Status:' + response.status,
          });
        }
      };

      reader.readAsBinaryString(file);
    } catch (error) {
      message.error("An error occurred while processing the file.");
      setModalInfo({
        visible: true,
        title: 'Error',
        content: 'An unexpected error occurred. Please check your file and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className="welcome-container" >
  <div>
    <h1 className="welcome-message">File Upload</h1>
  </div>

  <div style={styles.container}>
    <Spin spinning={isLoading} tip="Uploading...">
    <div style={styles.card}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/732/732220.png"
          alt="Green Excel File Icon"
          style={styles.icon}
        />
        <h2 >Upload Resource Data</h2>
        <p >Please upload an Excel (.xlsx) file containing resource information in the proper format.</p>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          
        />
        <Button
          type="primary"
          onClick={() => document.querySelector('input[type="file"]').click()}
          
        >
          Upload Excel File
        </Button>
      </div>
    </Spin>
  </div>

  <Modal
    title={modalInfo.title}
    visible={modalInfo.visible}
    onOk={() => setModalInfo({ ...modalInfo, visible: false })}
    onCancel={() => setModalInfo({ ...modalInfo, visible: false })}
    okText="OK"
    cancelText="Close"
  >
    <p>{modalInfo.content}</p>
  </Modal>
</div>

  );  
};

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9fafc',
  },
  header: {
    padding: '20px 0',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
  },
  headerText: {
    margin: 0,
    fontSize: '28px',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 20px',
    color: '#003366',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px 30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  icon: {
    width: '80px',
    height: '80px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#003366'
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '30px',
  },
  fileInput: {
    display: 'none',
  },
  uploadButton: {
    fontSize: '16px',
    padding: '10px 24px',
  },
};
export default FileUpload;
