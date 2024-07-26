import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  //     height: 100vh;
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
      color: #fff;
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

export const Afterhero = () => {

  return (
    <Wrapper className='w-full h-full relative flex  max-[768px]:pt-[20px] '>
      <div className='w-full relative new '>

        <div className='contentWrapper max-md:pt-[50px] w-full flex flex-row max-[768px]:flex-col justify-center items-center container'>
          <div className='w-[100%] max-md:w-full mt-[3rem] max-md:!text-center'>

            <p className='text-md text-white titletext'>
                <b className='texthead'>Crafting and Maintaining Unique Game Assets:</b><br/> Community members have exclusive access to crafting powerful robots and game assets that are only available through dedicated participation. These robots, composed of multiple NFTs, provide essential in-game assistance such as combat support, protection, and transportation. As a community member, you not only create these valuable assets but also maintain and upgrade them, ensuring they remain in top condition.            
            </p><br/>
            <p className='text-md text-white titletext'>
                <b className='texthead'>Involvement in the In-Game Economy: </b><br/> The EOAS economy is driven by the community. From scrapyards to repair shops, only community members can buy parts, repair, and upgrade robots. This unique system creates a thriving, self-sustained in-game economy where players benefit from fractional ownership of these facilities, earning a share of the profits from repairs and upgrades.           
            </p><br/>

            <p className='text-md text-white titletext'>
                <b className='texthead'>Benefits of Being an Active Community Member </b><br/>
            </p><br/>
            <p className='text-md text-white titletext'>
            <b className='texthead'>Earn Passive Income:</b><br/> By participating in the creation and maintenance of NFTs and game assets, you earn a share of the revenue generated from their sale and usage. This provides a steady stream of passive income, rewarding your dedication and efforts within the game.<br/>
            </p><br/>
            <p className='text-md text-white titletext'>
            <b className='texthead'>Access to Exclusive Content and Rewards:</b><br/> Active community members unlock exclusive crafting powers, enabling them to mint rare and valuable NFT robots. These unique assets not only enhance gameplay but can also be sold in the marketplace, providing additional financial rewards.
            </p><br/>
            <p className='text-md text-white titletext'>
            <b className='texthead'>Real-World Financial Gains:</b><br/> The Bitcoin you earn through in-game achievements can be converted into real cash or used for real-world purchases. This tangible reward system ensures that your time and skills are recognized and compensated beyond the virtual world.
            </p><br/>
            <p className='text-md text-white titletext'>
            <b className='texthead'>Secure and Transparent Ecosystem:</b><br/> Our advanced blockchain protocols protect your investments and ensure a transparent gaming environment. The real-time burn mechanics maintain the value and scarcity of in-game assets, offering a secure and stable ecosystem for all players.
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
                        src="/assets/imgs/design/2.png"
                        alt=''
                        className='aspect-square object-contain object-center w-[100%] min-[1800px]:w-[800px] rounded-full'
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

export default Afterhero
