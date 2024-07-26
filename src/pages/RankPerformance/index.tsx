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
`

export const RanksandPerformance = () => {
    const text = "Start Ranking Now  • ";

  return (
    <>
    <NavBar/>
    <Wrapper className='w-full max-[768px]:!h-[150vh] relative flex  max-[768px]:pt-[70px] '>
      <div className='w-full relative new '>
        <img
          className='w-screen max-[768px]:!h-[150vh] max-lg:h-screen max-md:h-full backImage'
          alt='pic'
          src='/assets/imgs/design/6.png'
          style={{
            backgroundColor: '#050d2b',
            backgroundBlendMode: 'darken',
          }}
        />

        <div className='contentWrapper w-full flex flex-row max-[768px]:flex-col justify-center items-center container'>
          <div className='w-[100%] max-md:w-full mt-[3rem] max-md:!text-center'>
            <h1 className='titleCaption max-[600px]:!text-center'>Rise Through the Ranks  </h1>
            <p className='text-md text-white titletext'>
            In Elements of a Soul, every victory counts. Our dynamic ranking system lets you see how you stack up against other players and guilds. Track your progress, celebrate your achievements, and strive for the top.Battle your way through intense challenges and earn your place on the leaderboard. Whether you're a solo adventurer or part of a mighty guild, your skills and strategy will be recognized and rewarded.
               <br/> Join a guild and contribute to its rise in the ranks. Team up with friends, share your victories, and watch your guild become a force to be reckoned with. The higher your guild's rank, the greater the rewards and recognition. Show off your hard-earned rank with pride. Exclusive rewards, special titles, and bragging rights await those who reach the pinnacle of the leaderboard.
               <br/> Are You Ready?(bitcoin color)
               <br/> The journey to greatness starts soon. Compete, collaborate, and conquer in Elements of a Soul. Rise through the ranks and make your mark in history!

            </p>
            <div className=' flex flex-row justify-center'>
              <a className='mintBtn  mt-5 text-center rounded' href='/#mint'>
                {/* <button  > */}
                    Start Ranking Now
                {/* </button> */}
              </a>
            </div>
          </div>

          <div className='w-full relative flex flex-row justify-center mt-5'>
            <div className='contentWrapper w-full flex flex-col justify-center items-center container'>
              <div className='row flex flex-row items-center'>

                <div className='col-lg-6 w-[100%] relative'>
                      <img
                        src="/assets/imgs/design/8.png"
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

export default RanksandPerformance
