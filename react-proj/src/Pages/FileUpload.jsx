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
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
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
