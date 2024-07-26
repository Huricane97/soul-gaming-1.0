import styled from 'styled-components'
import '../style.css'
const Wrapper = styled.div`
  position: relative;
  @media (max-width: 1536px) {
    .container {
      max-width: 100% !important;
    }
  }
  .footer-links {
    font-size:14px;
    font-family: 'TT_Chocolates' !important;

    &:hover {
      text-decoration: underline;
    }
  }
`
export const Footer = () => {
  return (
    <Wrapper className='w-full absolute mt-[0px]'>
      <div className='w-full relative mt-[0px]'>
        <div className='w-full flex flex-row  justify-between items-center container'>
          <div className='row flex flex-row max-[768px]:flex-col  w-full items-center bg-[#030A1B] py-[30px] px-[50px] '>
            <div className='col-lg-2 flex max-[768px]:justify-center justify-start items-center w-[100%] gap-4'>
              <img alt='Arden Logo' className='w-[10%] h-[10%]' src='/assets/imgs/header/1.webp' />
            </div>

            <div className='col-lg-2 flex max-[768px]:justify-center justify-start items-center w-[100%] gap-4'>
                    <a href='https://x.com/ElementsofaSoul' target='_blank' rel='noopener noreferrer'>
                      <span></span>
                      <img className='w-[25px] h-[25px]' alt='img' src={'/assets/icons/icons8-twitterx.svg'}></img>
                    </a>

                    <a href='https://Discord.gg/eoas' target='_blank' rel='noopener noreferrer'>
                      <span></span>
                      <img className='w-[25px] h-[25px]' alt='img' src={'/assets/icons/icons8-discord.svg'}></img>
                    </a>

                    <a href='https://www.instagram.com/elementsofasoul/' target='_blank' rel='noopener noreferrer'>
                      <span></span>
                      <img className='w-[25px] h-[25px]' alt='img' src={'/assets/icons/icons8-instagram.svg'}></img>
                    </a>

                    <a href='https://m.facebook.com/elementsofasoul369/' target='_blank' rel='noopener noreferrer'>
                      <span></span>
                      <img className='w-[25px] h-[25px]' alt='img' src={'/assets/icons/icons8-facebook.svg'}></img>
                    </a>

                    <a href='https://kick.com/elementsofasoul' target='_blank' rel='noopener noreferrer'>
                      <span></span>
                      <img className='w-[25px] h-[25px]' alt='img' src={'/assets/icons/icons8-kik-messenger.svg'}></img>
                    </a>

                    <a href='https://soundcloud.com/elements-of-a-soul' target='_blank' rel='noopener noreferrer'>
                      <span></span>
                      <img className='w-[25px] h-[25px]' alt='img' src={'/assets/icons/icons8-soundcloud.svg'}></img>
                    </a>

                    <a href='https://www.tiktok.com/@elementsofasoul' target='_blank' rel='noopener noreferrer'>
                      <span></span>
                      <img className='w-[25px] h-[25px]' alt='img' src={'/assets/icons/icons8-tiktok.svg'}></img>
                    </a>

                    <a href='https://www.twitch.tv/elementsofasoul' target='_blank' rel='noopener noreferrer'>
                      <span></span>
                      <img className='w-[25px] h-[25px]' alt='img' src={'/assets/icons/icons8-twitch.svg'}></img>
                    </a>

                    <a href='https://www.youtube.com/channel/UCrNASt96lwJv-VsjKJTBApg' target='_blank' rel='noopener noreferrer'>
                      <span></span>
                      <img className='w-[25px] h-[25px]' alt='img' src={'/assets/icons/icons8-youtube.svg'}></img>
                    </a>

            </div>
            
            <div className=' col-lg-10 flex flex-row max-[768px]:justify-center items-end justify-end gap-5 w-[100%]'>
              <p className='text-white text-xs'>@2024 Elementsofsoul. All rights reserved</p>
              <a
                target='_blank'
                rel='noreferrer noopener'
                className='text-white footer-links'
              >
                Terms & Conditions
              </a>
              <a
                target='_blank'
                rel='noreferrer noopener'
                className='text-white footer-links'
              >
                Privacy Policy
              </a>

            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Footer
