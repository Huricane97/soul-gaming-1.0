import Footer from '@components/Footer'
import NavBar from '@components/NavBar'
import styled from 'styled-components'
import "../../components/Marquee/Marquee.css"
const Wrapper = styled.div`
  position: relative;
      height: 100vh;
  .backImage {
    position: absolute;
    opacity: 1;
    object-fit: cover;
    top: 0;
    height: 100vh;
    opacity:0.2;
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
      // color: ##CC9900;
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
    //   background: linear-gradient(90deg, #D10ED1, #10A3DA);
    background:#CC9900;
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

export const SoulStreamers = () => {
    const text = "Coming Soon  • ";

  return (
    <>
    <NavBar/>
    <Wrapper className='w-full max-[768px]:!h-[100%] relative flex  '>
      <div className='w-full relative new '>
        <img
          className='w-screen max-lg:h-screen max-md:h-full backImage'
          alt='pic'
          src='/assets/imgs/design/8.png'
          style={{
            backgroundColor: '#050d2b',
            backgroundBlendMode: 'darken',
          }}
        />

        <div className='contentWrapper w-full max-md:pt-[50px] flex flex-row max-[768px]:flex-col justify-center items-center container'>
          <div className='w-[100%] max-md:w-full mt-[3rem] max-md:!text-center'>
            <h1 className='titleCaption max-[600px]:!text-center'>Unleash the Power of Twitch Integration! </h1>
            <p className='text-md text-white titletext'>
            Stream and Shine<br/>
            <br/>Welcome to the next level of gaming with Elements of a Soul! Our seamless Twitch integration lets you stream your epic adventures live, share your achievements, and build your following right from within the game.
            <br/>Stay ahead of the competition with real-time stat tracking. Monitor your performance, analyze your gameplay, and see how you rank against other players. Our detailed stats give you the insights you need to improve and dominate.
            <br/>Join the ranks of elite gamers! With our integrated ranking system, you can see where you stand in the community. Whether you’re a solo player or part of a guild, your progress and accomplishments will be recognized.

            </p>
            {/* <div className=' flex flex-row justify-center'>
              <a className='mintBtn  mt-5 text-center rounded' href='/#mint'>
                    Chat
              </a>
            </div> */}
          </div>

          <div className='w-full relative flex flex-row justify-center mt-5'>
            <div className='contentWrapper w-full flex flex-col justify-center items-center container'>
              <div className='row flex flex-row items-center'>

                <div className='col-lg-6 w-[100%] relative'>
                      <img
                        src="/assets/imgs/design/7.png"
                        alt=''
                        className='aspect-square object-contain object-center w-[100%] min-[1800px]:w-[800px] rounded max-md:hidden'
                      />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>

    <div className="marquee-container max-md:mt-[100px] bg-[#000819]">
      <div className="marquee-bar" style={{ transform: 'rotate(3deg)', top: '25%' }}>
        <div className="marquee">
          <div className="marquee-content">{text.repeat(25)}</div>
        </div>
      </div>
      <div className="marquee-bar" style={{ transform: 'rotate(-3deg)', bottom: '25%' }}>
        <div className="marquee">
          <div className="marquee-content">{text.repeat(35)}</div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default SoulStreamers
