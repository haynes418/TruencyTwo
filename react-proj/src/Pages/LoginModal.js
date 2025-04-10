// LoginModal.js
import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';  // Import Modal, Input, Button from Ant Design

const LoginModal = ({ showModal, closeModal, setIsAuthenticated }) => {
  const [username, setUsername] = useState("");  // State for username
  const [password, setPassword] = useState("");  // State for password

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);  // Set authenticated to true
      closeModal();  // Close the modal
    } else {
      alert("Invalid login credentials!");  // Show error if login is incorrect
    }
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
        <Input 
          placeholder="Enter Username" 
          style={{ marginBottom: '10px' }} 
          value={username}  // Bind value to state
          onChange={(e) => setUsername(e.target.value)}  // Update username state on change
        />
      </div>
      <div>
        <label>Password</label>
        <Input.Password 
          placeholder="Enter Password" 
          style={{ marginBottom: '20px' }} 
          value={password}  // Bind value to state
          onChange={(e) => setPassword(e.target.value)}  // Update password state on change
        />
      </div>
      <Button type="primary" block onClick={handleLogin}>Login</Button>
    </Modal>
  );
};

export default LoginModal;
