import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  height: 100%;

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
      font-size: 50px;
      text-align: left;
      // color: #fff;
      background: linear-gradient(90deg, #D10ED1, #10A3DA);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .titletext{
      font-family: 'TT_Chocolates' !important;
      color: #CC9900;

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
  }
`

export const HeroSection = () => {

  return (
    <Wrapper className='w-full relative flex  '>
      <div className='w-full relative new  max-[768px]:pt-[150px]'>
        <img
          className='w-screen max-lg:h-screen max-md:h-full backImage'
          alt='pic'
          src='/assets/imgs/home1_bg.png'
          style={{
            backgroundColor: '#050d2b',
            backgroundBlendMode: 'darken',
          }}
        />

        <div className='contentWrapper py-[100px] max-md:pt-[50px] w-full flex flex-row max-[768px]:flex-col justify-center items-center container'>
          <div className='w-[100%] max-md:w-full mt-[3rem] max-md:!text-center'>
            <h1 className='titleCaption max-[600px]:!text-center'>Welcome to the heart of Elements of a Soul Gaming Guild! </h1>
            <p className='text-md text-white titletext'>
            Discover a world where epic adventures, valuable rewards, and a vibrant community come together. Whether you're a seasoned warrior or a new adventurer, Elements of a Soul offers an immersive experience like no other.
            </p>
            <div className=' flex flex-row justify-center'>
              {/* <a className='mintBtn  mt-5 text-center rounded' href='/NFTs'>
                MINT
              </a> */}
            </div>
          </div>

          <div className='w-full relative flex flex-row justify-center mt-5'>
            <div className='contentWrapper w-full flex flex-col justify-center items-center container'>
              <div className='row flex flex-row items-center'>

                <div className='col-lg-6 w-[100%] relative'>
                      <img
                        src="/assets/imgs/design/1.png"
                        alt=''
                        className='aspect-square object-cover object-center w-[100%] min-[1800px]:w-[800px] rounded-full opacity-[0.7]'
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

export default HeroSection
