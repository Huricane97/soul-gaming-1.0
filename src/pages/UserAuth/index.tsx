import { useState } from 'react';
import Footer from '@components/Footer';
import NavBar from '@components/NavBar';
import styled from 'styled-components';
import "../../components/Marquee/Marquee.css";
import Login from '@components/Login';
import SignUp from '@components/SignUp';
import "./UserAuth.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  email: string;
  password: string;
  wallet: string;
}

const Wrapper = styled.div`
  position: relative;
      height: 100vh;
  overflow:hidden;
  .backImage {
    position: absolute;
    opacity: 1;
    object-fit: cover;
    top: 0;
        height: 100vh;
    opacity: 0.7;
  }

  .new {
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 10;
  }

  .contentWrapper {
    position: relative;
    width: 80%;
    height:100vh;

    .titleCaption {
      font-style: normal;
      font-weight: 800;
      font-size: 50px;
      text-align: left;
      background: linear-gradient(90deg, #D10ED1, #10A3DA);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .titletext {
      font-family: 'TT_Chocolates' !important;
    }

    .mintBtn {
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
    
    .mintBtn:hover {
      background-color: rgb(136, 244, 149);
      color: black;
    }
    
    }
  }

  
`;

export const UserAuth = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [view, setView] = useState<'signup' | 'login'>('signup');

  // const handleSignUp = (user: User) => {
  //   setUsers([...users, user]);
  //   setView('login');
  // };
  const handleSignUp = async (user: User) => {
    try {
      const response = await axios.post('https://elementsofsoul-5aa104c5775a.herokuapp.com/api/user/register', { email:user.email,'walletAddress' : user.wallet ,password:user.password});

      if (!response.data) {
        throw new Error('An error occurred.');
      }
      if(response.data){}
      const data = response.data;
      if (data) {
        setUsers([...users, user]);
        setView('login');
        alert('Sign-up successful!');
      } else {
        throw new Error(data.message || 'Sign-up failed');
      }
    } catch (error: any) {
      let err = error?.response?.data?.error;
      if(err){
        alert(err);
      }else
      alert(error);
    }
  };
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string, wallet: string) => {
    try {
      const response = await axios.post('https://elementsofsoul-5aa104c5775a.herokuapp.com/api/user/login', { email,'walletAddress' : wallet, password });
      console.log(response);
      
      if (!response.data) {
        throw new Error('Please Fill in the correct credentials.');
      }
      if (response.data) {
        const data = await response.data
        if (data.code == 200) {
          localStorage.setItem('isLoggedIn', 'true'); 
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userWallet', wallet);
          navigate('/');
          alert('Login successful!');
          
        } else {
          throw new Error('An error occurred in api.');
        }

      }
  
    } catch (error:any) {
      let err = error?.response?.data?.error;
      if(err){
        alert(err);
      }else
      alert(error);
    }
  };
  

  return (
    <>
      <NavBar />
      <Wrapper className='w-full relative flex max-md:!h-full max-[768px]:pt-[70px] '>
      <img
          className='w-screen max-lg:h-screen max-md:h-full backImage'
          alt='pic'
          src='/assets/imgs/home1_bg.png'
          style={{
            backgroundColor: '#050d2b',
            backgroundBlendMode: 'darken',
          }}
        />
      <div className='w-full relative new '>

        <div className='contentWrapper max-[768px]:w-[80%] w-full flex flex-row max-[768px]:flex-col justify-center items-center container '> 
          {view === 'signup' ? (
            <SignUp onSignUp={handleSignUp} switchToLogin={() => setView('login')} />
          ) : (
            <Login onLogin={handleLogin} switchToSignUp={() => setView('signup')} />
          )}
                  </div>

        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default UserAuth;
