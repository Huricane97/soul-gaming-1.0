import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import { FaBars, FaRegTimesCircle } from 'react-icons/fa'

interface NavBarWrapperProps {
  active: boolean
  mobileMenuOpen: boolean
}

const NavBarWrapper = styled.div<NavBarWrapperProps>`
  position: fixed;
  background: #40424c00 0% 0% no-repeat padding-box;
  opacity: 1;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  z-index: 99;
  top: 0;
  width: 100%;
  transition: all 0.5s;

  .mobile-sidebar {
    position: fixed;
    top: 70px;
    right: 0;
    width: 40%;
    max-height: 0;
    overflow: hidden;
    background: #283462;
    z-index: 100;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align:center;
    transition: max-height 0.5s ease-in-out;

    ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'max-height: 100vh;' : '')}

    a {
      color: #fff;
      text-decoration: none;
      font-size: 18px;
      margin-bottom: 15px;
      transition: color 0.3s ease;

      &:hover {
        color: #88f495;
      }
    }
  }

  .menu {
    gap: 1rem;

    a {
      font-size: 12px;
      color: #fff;
      text-transform: uppercase;
      transition: all 0.5s;
      font-family: 'TT_Chocolates' !important;
      &:hover {
        color: #88f495;
      }
      
    }
    
  }
  .mblmenuitem{
    font-family: 'TT_Chocolates' !important;

  }
  .buttons {
    a {
      width: 65px;
      position: relative;
      display: flex;
      align-items: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
      overflow: hidden;
      font-family: 'TT_Chocolates' !important;

      span {
        position: absolute;
        bottom: -60px;
        width: 50px;
        height: 50px;
        z-index: -1;

        background: #88f495;
        transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
      }

      img {
        width: 100%;
      }

      &:hover {
        span {
          bottom: 0px;
        }
      }
    }

    .walletBtn {
      font-size: 12px;
      line-height: 15px;
      color: #ffffff;
      opacity: 1;
      font-family: 'TT_Chocolates' !important;

      border-radius: 5px;
      background:  linear-gradient(90deg, #D10ED1, #10A3DA);
      padding: 10px 20px;
      transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);

      &:hover {
        background: #88f495;
        color: black;
      }
    }
    .walletBtn1 {
      font-size: 12px;
      line-height: 15px;
      color: #000;
      opacity: 1;

      border-radius: 5px;
      background: #88f495;
      padding: 10px 5px;
      transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
    }
  }
`

const Logo = styled.a`
  position: relative;

  img {
    height: 50px;
  }
`

export const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [active, setActive] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on component mount
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);
  
  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleScroll = () => {
    if (window.scrollY <= lastScroll) setActive(true)
    else setActive(false)

    setLastScroll(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleloginButton = async () => {
    navigate('/UserAuth')
  }

  const handleLogoutButton = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    alert('Logout successful');
    navigate('/');
  };

  const handlebuttonClick1 = () => {
    navigate('/')
  }

  return (
    <NavBarWrapper
      active={active}
      mobileMenuOpen={mobileMenuOpen}
    >
      <div className='container m-auto'>
        <div className='flex justify-between items-center px-2 py-2 max-md:hidden'>
          <div className='flex items-center justify-center gap-8'>
            <Logo className='cursor-pointer' onClick={handlebuttonClick1}>
              <img alt='pic' src='/assets/imgs/header/1.webp' />
            </Logo>

            <div className='flex justify-center items-center menu'>
              <a className='flex flex-col items-center gap-1' id='mintMenuX' href='/#'>
                <img className='w-[25px] h-[25px]' src='/assets/imgs/header/2.webp' />
                Home
              </a>
              <a className='flex flex-col items-center gap-1' id='' href='/Guild'>
                <img className='w-[25px] h-[25px]' src='/assets/imgs/header/3.webp' />
                Guilds
              </a>
              <a className='flex flex-col items-center gap-1' id='' href='/SoulStreamers'>
                <img className='w-[25px] h-[25px]' src='/assets/imgs/header/4.webp' />
                Communication center
              </a>
              <a className='flex flex-col items-center gap-1' id='' href='/RanksPerformance'>
                <img className='w-[25px] h-[25px]' src='/assets/imgs/header/5.webp' />
                Rank and Proformance
              </a>
              <a className='flex flex-col items-center gap-1' id='' href='/Recruitment'>
                <img className='w-[25px] h-[25px]' src='/assets/imgs/header/6.webp' />
                Recruitment
              </a>
              <a className='flex flex-col items-center gap-1' id='' href='/GetReward'>
                <img className='w-[25px] h-[25px]' src='/assets/imgs/header/7.webp' />
                Earn Rewards
              </a>
              <a className='flex flex-col items-center gap-1' id='' href='/NFTs'>
                <img className='w-[25px] h-[25px]' src='/assets/imgs/header/Badge-icon 1.png' />
                NFTs
              </a>
            </div>

            <ReactTooltip anchorId='mintMenu' place='bottom' variant='info' content='Coming soon' />
          </div>

          <div className='flex items-center justify-center gap-4 buttons relative'>
            {isLoggedIn ? (
              <button className="walletBtn ml-4" onClick={handleLogoutButton}>
                LOGOUT
              </button>
            ) : (
              <button className="walletBtn ml-4" onClick={handleloginButton}>
                LOGIN
              </button>
            )}

            <a href='https://x.com/ElementsofaSoul' target='_blank' rel='noopener noreferrer'>
              <span></span>
              <img alt='img' src={'/assets/icons/Vector.svg'}></img>
            </a>

            <a href='https://Discord.gg/eoas' target='_blank' rel='noopener noreferrer'>
              <span></span>
              <img alt='img' src={'/assets/icons/Vector(1).svg'}></img>
            </a>
          </div>
        </div>

        <div className='flex justify-between items-center px-2 py-2 min-[768px]:hidden'>
          <Logo className='cursor-pointer' onClick={handlebuttonClick1}>
            <img alt='pic' src='/assets/imgs/logo.webp' />
          </Logo>

          <div
            className={`${mobileMenuOpen && 'z-[999]'} cursor-pointer text-white p-1`}
            onClick={handleToggleMobileMenu}
          >
            {mobileMenuOpen ? <FaRegTimesCircle /> : <FaBars />}
          </div>
          {mobileMenuOpen && (
            <div className='mobile-sidebar'>
              <a className='mblmenuitem' id='mintMenuX' href='/#'>
                Home
              </a>
              <a className='mblmenuitem' id='' href='/Guild'>
                Guilds
              </a>
              <a className='mblmenuitem' id='' href='/SoulStreamers'>
                Communication center
              </a>
              <a className='mblmenuitem' id='' href='/RanksPerformance'>
                Rank and Proformance
              </a>
              <a className='mblmenuitem' id='' href='/Recruitment'>
                Recruitment
              </a>
              <a className='mblmenuitem' id='' href='/GetReward'>
                Earn Rewards
              </a>
              <a className='mblmenuitem' id='' href='/NFTs'>
                NFTs
              </a>

              <div className='flex flex-col gap-4 buttons relative'>
                {isLoggedIn ? (
                  <button className="walletBtn1" onClick={handleLogoutButton}>
                    LOGOUT
                  </button>
                ) : (
                  <button className="walletBtn1" onClick={handleloginButton}>
                    LOGIN
                  </button>
                )}
                <div className='flex flex-row justify-center gap-3'>
                  <a href='https://x.com/ElementsofaSoul' target='_blank' rel='noopener noreferrer'>
                    <span></span>
                    <img alt='img' src={'/assets/icons/Vector.svg'}></img>
                  </a>

                  <a href='https://Discord.gg/eoas' target='_blank' rel='noopener noreferrer'>
                    <span></span>
                    <img alt='img' src={'/assets/icons/Vector(1).svg'}></img>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </NavBarWrapper>
  )
}

export default NavBar
