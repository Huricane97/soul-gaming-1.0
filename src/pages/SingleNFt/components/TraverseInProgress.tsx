import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Spline from '@splinetool/react-spline'
import { Image1, Image2, Image3, BackgroundImage } from './images'
import { CCIP_EXPLORER_URL } from '@constants'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-    height: 100vh;
  padding-bottom: 4rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${BackgroundImage});
`
const AnimationContainer = styled.div`
  margin: 6rem 0 0;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.22);
  border-radius: 15px;
  max-width: 800px;
  // max-height: 400px;
  width: 100%;
  .traversal-info {
    position: absolute;
    text-align: center;
    font-size: 1.25rem;
    top: 80%;
    left: 50%;
    transform: translateX(-50%);
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 800px) {
      left: 20%;
    }
    @media (max-width: 600px) {
      left: 15%;
      font-size: 1rem;
    }
    a {
      cursor: pointer;
      text-decoration: underline;
      &:hover {
        color: rgba(136, 244, 149, 1);
      }
    }
    .mintBtn {
      font-size: 24px;
      text-decoration: none;
      font-weight: 700;
      color: #293462;
      opacity: 1;
      background: #88f495 !important;
      padding: 5px 40px;
      transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);

      &:hover {
        background: #88f495;
        color: black;
      }
    }
  }
`
const ImageContainer = styled.div`
  // margin: 6rem 0;
  margin: 2rem auto 0;
  border-radius: 8px;
  max-width: 380px;
  // max-height: 380px;
  backdrop-filter: blur(8px);
  .nftImage {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(5px);
      opacity: 1;
      transition: opacity 0.5s ease;
      border-radius: 10px;
    }
  }
`
const SplineSceneContainer = styled.div`
  max-width: 800px;
  max-height: 400px;
  width: 100%;
  height: 90%;
`
const images = [Image1, Image2, Image3]

type TraverseProps = { tx: string | null }

export const TraverseInProgress = ({ tx }: TraverseProps) => {
  const [currentImage, setCurrentImage] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage === images.length - 1 ? 0 : prevImage + 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <Wrapper>
      <AnimationContainer>
        <ImageContainer>
          <div className='nftImage'>
            <img alt='nftimage' src={images[currentImage]} />
          </div>
        </ImageContainer>
        <SplineSceneContainer>
          <Spline scene='https://prod.spline.design/DTK7AbTnBhHRtOdh/scene.splinecode' />
        </SplineSceneContainer>
        <p className='traversal-info'>
          Your transfer is in progress and may take up to 30 minutes to complete. You may leave this
          page at any time without affecting the transfer. Click{' '}
          <a target='_blank' rel='noreferrer' href={CCIP_EXPLORER_URL + 'tx/' + tx}>
            here
          </a>{' '}
          to view the status of your transfer on the CCIP Explorer.
          <br />
          <br />
          <a href='/nftListing' className='mintBtn rounded'>
            Transfer more NFTs
          </a>
        </p>
      </AnimationContainer>
    </Wrapper>
  )
}
