// import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
      height: 100vh;
  .backImage {
    position: absolute;
    opacity: 1;
    object-fit: cover;
    top: 0;
        height: 100vh;
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
    .titleCaption {
        font-style: normal;
        font-weight: 800;
        font-size: 40px;
        text-align: left;
        // color: #fff;
        background: linear-gradient(90deg, #D10ED1, #10A3DA);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    .titletext{
        font-family: 'TT_Chocolates' !important;
  
      }
    .mintBtn {
        font-size: 18px;
        font-weight: 700;
        color: #000;
        opacity: 1;
        background: linear-gradient(90deg, #D10ED1, #10A3DA);
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
`

export const Firstcarousel = () => {


  return (
    <Wrapper className='w-full relative flex  max-[768px]:pt-[10px] pt-[170px]'>
      <div className='w-full relative new '>
        {/* <img
          className='w-screen max-lg:h-screen max-md:h-full backImage'
          alt='pic'
          src='/assets/imgs/home1_bg.png'
          style={{
            backgroundColor: '#050d2b',
            backgroundBlendMode: 'darken',
          }}
        /> */}

        <div className='contentWrapper w-full flex flex-col max-[768px]:flex-col justify-center items-center container'>
          <div className='w-[100%] flex flex-col items-center max-md:w-full mt-[3rem] max-md:!text-center'>
            <h1 className='titleCaption max-[600px]:!text-center'>Fusion community and gamers</h1>
            <p className='text-md text-white text-center titletext'>
            Groundbreaking blockchain-based MMORPG. Here, your passion for gaming not only fuels your adventures but also brings you real-world financial rewards. Let's dive into how our community thrives and the myriad benefits you can enjoy by being an active member.</p>
            <div className=' flex flex-row justify-center'>
              <a className='mintBtn  mt-5 text-center rounded' href='/NFTs'>
                {/* <button  > */}
                Free limited edition nft
                {/* </button> */}
              </a>
            </div>
          </div>

          <div className='w-full relative flex flex-row justify-center mt-5'>
            <div className='contentWrapper w-full flex flex-col justify-center items-center container'>
              <div className='row flex flex-row items-center'>

                <div className='col-lg-6 w-[100%] relative'>
                      <img
                        src="/assets/imgs/design/3.png"
                        alt=''
                        className='aspect-square object-contain object-center w-[100%] min-[1800px]:w-[800px] rounded'
                      />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Firstcarousel
