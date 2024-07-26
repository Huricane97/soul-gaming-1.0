import styled from 'styled-components'
import '../style.css'

const Wrapper = styled.div`
  position: relative;
  .backImage {
    position: absolute;
    opacity: 1;
    object-fit: cover;
    top: 0;
        height: 100vh;
    opacity:0.2;
  }
  .contentWrapper {
    position: relative;
    margin: auto;
    margin-top: 100px;
    gap: 10rem;

    .titleCaption1 {
      font-style: normal;
      font-weight: 800;
      font-size: 50px;
      text-align: left;
      // color: #fff;
      background: linear-gradient(90deg, #D10ED1, #10A3DA);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .texthead{
      background: linear-gradient(90deg, #D10ED1, #10A3DA);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      border-bottom: 1px solid transparent;
      border-image: linear-gradient(90deg, #D10ED1, #10A3DA);
      border-image-slice: 1;
    }
  }
  .faq-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    font-family: 'TT_Chocolates' !important;

  }
  // hr{
  //     height: 1px;
  //     color: inherit;
  //     border-bottom: 1px solid white;
  //     color: white !important;
  //     width: 50%;
  // }
  .itemsWrapper {
    gap: 210px;

    @media (max-width: 1280px) {
      gap: 150px;
    }

    @media (max-width: 1024px) {
      gap: 70px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`

export const Play = () => {
  return (
    <Wrapper className='w-full relative mt-[50px] '>
      <div className='w-full relative'>


        <div className='contentWrapper w-full flex flex-col justify-center items-center container py-[40px]'>
          <div className='row flex w-[100%] items-center'>
            <div className='col-lg-6 w-[100%]'>
              <div className='flex flex-col  flex-wrap items-center gap-3 faq-item'>
                <h1 className='titleCaption1 !text-center w-[40%] max-md:w-[100%]'>Revolutionizing the web3 gaming industry</h1>

              <div className='flex flex-row max-[768px]:flex-col w-[80%] items-center'>
              <div className='flex flex-col'>

                <div className='flex flex-row max-[425px]:flex-col items-center gap-5 justify-start items-start w-[80%]'>
                <p className='text-white text-lg max-md:text-sm'>
                  <b className='texthead !text-lg'>Create Your Guild:</b> Form your own guild and lead your team to glory! Customize your guild, invite friends, and build a powerhouse that dominates the battlefield.
                  </p>
                </div>

                <div className='flex flex-row max-[425px]:flex-col items-center gap-5 justify-start items-start w-[80%] mt-[50px]'>
                <p className='text-white text-lg max-md:text-sm'>
                <b className='texthead !text-lg'>Earn Prizes and Bitcoin:</b> Your engagement pays off! Participate in events, complete quests, and rack up points to earn amazing prizes and Bitcoin. The more you play, the more you earn!
                  </p>
                </div>

                <div className='flex flex-row max-[425px]:flex-col items-center gap-5 justify-start items-start w-[80%] mt-[50px]'>
                <p className='text-white text-lg max-md:text-sm'>
                <b className='texthead !text-lg'>Connect and Chat:</b> Join the vibrant community of players. Share strategies, plan your next raid, and chat with guildmates. Forge new friendships and strengthen old ones in our bustling chat rooms.
                  </p>
                </div>

                <div className='flex flex-row max-[425px]:flex-col items-center gap-5 justify-start items-start w-[80%] mt-[50px]'>
                <p className='text-white text-lg max-md:text-sm'>
                <b className='texthead !text-lg'>Track Performance:</b> Stay on top of the leaderboard! Check player and guild performance stats to see how you stack up against the competition. Strive for greatness and showcase your skills.
                  </p>
                </div>
                <div className='flex flex-row max-[425px]:flex-col items-center gap-5 justify-start items-start w-[80%] mt-[50px]'>
                  <p className='text-white text-lg max-md:text-sm'>
                  <b className='texthead !text-lg'>Mint a Free NFT:</b> Stand out with a unique, free NFT! Mint your own and enhance your in-game experience. It's a special token of your journey in Elements of a Soul.
                    Join us now and be part of the legendary Elements of a Soul Guild community. Adventure awaits, and so do epic rewards
                  </p>
                </div>

                </div>
                <div className='col-lg-6 w-[100%] relative'>
                      <img
                        src="/assets/imgs/design/5.png"
                        alt=''
                        className='aspect-square object-contain object-center w-[100%] min-[1800px]:w-[800px] rounded-full'
                      />
                </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default Play
