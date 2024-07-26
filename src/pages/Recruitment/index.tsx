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
          .texthead{
      background: linear-gradient(90deg, #D10ED1, #10A3DA);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      border-bottom: 1px solid transparent;
      border-image: linear-gradient(90deg, #D10ED1, #10A3DA);
      border-image-slice: 1;
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

export const Recruitment = () => {
    const text = "Coming Soon  • ";

  return (
    <>
    <NavBar/>
    <Wrapper className='w-full max-[768px]:!h-[150vh] relative flex  max-[768px]:pt-[70px] '>
      <div className='w-full relative new '>
        <img
          className='w-screen max-[768px]:!h-[150vh] max-lg:h-screen max-md:h-full backImage'
          alt='pic'
          src='/assets/imgs/design/7.png'
          style={{
            backgroundColor: '#050d2b',
            backgroundBlendMode: 'darken',
          }}
        />

        <div className='contentWrapper w-full flex flex-row max-[768px]:flex-col justify-center items-center container'>
          <div className='w-[100%] max-md:w-full mt-[3rem] max-md:!text-center'>
            <h1 className='titleCaption max-[600px]:!text-center'>Recruit and Reap the Rewards!  </h1>
            <p className='text-md text-white titletext'>
            <b className='texthead'>Here's How It Works:</b><br/>
            As a landowner in Elements of a Soul, you hold the power to invite players to explore and engage with the resources on your land. Every adventure they embark on, every piece of loot they gather, brings benefits to both you and them.
            <br/><br/><b className='texthead'>A Win-Win Scenario:</b><br/>
            For every loot extracted from your land, you sell it and the active gamers receive a generous 20% share of its value as a token of appreciation for their efforts. It's a perfect synergy—enhance your gameplay experience while rewarding the contributions of active gamers.
            <br/><br/> <b className='texthead'>Track Player Progress:</b><br/>
            Stay informed about player stats, in-game progress, and gear. Monitor their achievements and ensure your land is thriving with activity and success.

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
                        src="/assets/imgs/design/9.png"
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

export default Recruitment
