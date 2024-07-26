import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import styled from 'styled-components';

interface LoginProps {
  onLogin: (email: string, password: string, wallet: string) => void;
  switchToSignUp: () => void;
}
const Button = styled.button`
      font-size: 18px;
      font-weight: 700;
      color: #000;
      opacity: 1;
      background: linear-gradient(90deg, #D10ED1, #10A3DA);
    // background:#CC9900;
      padding: 5px 15px;
      transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
      border: none; /* Added to remove default border */
      color: white; /* Ensure the text is visible on gradient */
      border-radius: 5px; /* Optional: to round the corners */
    }
    
    hover {
      background-color: rgb(136, 244, 149);
      color: black;
    }
    
`;
const Login: React.FC<LoginProps> = ({ onLogin, switchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wallet, setWallet] = useState('');
  // const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password && wallet) {
      onLogin(email, password, wallet);
      // localStorage.setItem('isLoggedIn', 'true');
      // navigate('/');
    } else {
      alert('Please fill in all fields and connect your wallet');
    }
  };

  const connectWallet = async () => {
    const provider: any = await detectEthereumProvider();

    if (provider) {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        alert(`Connected wallet: ${accounts[0]}`);
      } else {
        alert('No wallet accounts found');
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    <div>
      <h2 className='text-3xl text-white bold'>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {wallet ? (
        <div>
          <p className='text-white'>Connected Wallet: {wallet}</p>
        </div>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
      
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={switchToSignUp}>Don't have an account? Sign Up</Button>
    </div>
  );
};

export default Login;
