
import Footer from '@components/Footer'
import NavBar from '@components/NavBar'
import styled from 'styled-components'
import "../../components/Marquee/Marquee.css"
import Mint from '@components/Mint';

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
    opacity: 0.2;
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
const Wrapper1 = styled.div`

.gallery {
  width: 100%;
  padding: 2rem 0;
  background: #283462;
  display: flex;
  flex-direction: column;
  align-items: center;

  .gallery-heading {
    font-style: normal;
    font-weight: 800;
    font-size: 50px;
    text-align: left;
    background: linear-gradient(90deg, #d10ed1, #10a3da);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    .gallery-item {
      width: 100%;
      // padding-top: 100%;
      background-color: #283462;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      position: relative;

      img {
        position: flex;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
`;
export const NFTs = () => {
    const text = "Limited availability, mint now • ";
    // const nftImages = Array.from({ length: 40 }, (_, i) => `/assets/imgs/nfts/${i + 1}.png`);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <>
    <NavBar/>
    <Wrapper className='w-full  relative flex max-md:!h-full max-[768px]:pt-[70px] '>
      <div className='w-full relative new '>
        <img
          className='w-screen max-lg:h-screen max-md:h-full backImage'
          alt='pic'
          src='/assets/imgs/design/10.png'
          style={{
            backgroundColor: '#050d2b',
            backgroundBlendMode: 'darken',
          }}
        />

        <div className='contentWrapper w-full flex flex-row max-[768px]:flex-col justify-center items-center container max-md:pt-[400px]'>
          <div className='w-[100%] max-md:w-full mt-[3rem] max-md:!text-center'>
            <h1 className='titleCaption max-[600px]:!text-center'>Unveil the Treasures of Elements of a Soul  </h1>
            <p className='text-md text-white titletext'>
            Step into a world where every adventure holds the promise of rare and exclusive rewards. The magic of Elements of a Soul lies not just in its epic quests, but in the unique treasures waiting to be discovered.
            </p>
            <div className=' flex flex-row justify-center'>
              <a className='mintBtn  mt-5 text-center rounded' href='/#mint'>
               More information
              </a>
            </div>
          </div>

          <div className='w-full relative flex flex-row justify-center mt-5 '>
            <div className='contentWrapper w-full flex flex-col justify-center items-center container'>
              <div className='row flex flex-row items-center'>

                <div className='col-lg-6 w-[100%] relative z-50'>
                {isLoggedIn ? (
                      <Mint />
                    ) : (
                      <p className='text-white'>Please log in to mint your NFT.</p>
                    )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>

    <div className="marquee-container overflow-unset">
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

    <Wrapper1>
      {/* <div className="gallery max-md:[400px]">
          <h2 className="gallery-heading max-[600px]:!text-center" >NFT Gallery</h2>
          <div className="gallery-grid ">
            {nftImages.map((src, index) => (
              <div key={index} className="gallery-item">
                <img src={src} alt={`NFT ${index + 1}`} />
              </div>
            ))}
          </div>
        </div> */}
      </Wrapper1>
      
    <Footer/>
    </>
  )
}

export default NFTs
