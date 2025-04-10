// LoginModal.js
import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';  // Import Modal, Input, Button from Ant Design


const LoginModal = ({ showModal, closeModal, setIsAuthenticated }) => {
  
  const handleLogin = () => {
    setIsAuthenticated(true);  // Handle actual login logic
    closeModal();
  };

  return (
    <Modal
      title="Login"
      visible={showModal}
      onCancel={closeModal}
      footer={null}
      closeIcon={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff4d4d' }}>×</span>}
      centered
      width={400}
    >
      <div>
        <label>Username</label>
        <Input placeholder="Enter Username" style={{ marginBottom: '10px' }} />
      </div>
      <div>
        <label>Password</label>
        <Input.Password placeholder="Enter Password" style={{ marginBottom: '20px' }} />
      </div>
      <Button type="primary" block onClick={handleLogin}>Login</Button>
    </Modal>
  );
};

export default LoginModal;
