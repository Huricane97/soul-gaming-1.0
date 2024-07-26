import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { PodiumPosition } from '../types'
import { GoldPodium, SilverPodium, BronzePodium } from '../images'

interface PodiumContainerProps {
  $position: PodiumPosition
}

type PodiumProps = {
  position: PodiumPosition
  image?: string
  name?: string
  id?: number | string
}

const PodiumContainer = styled.div<PodiumContainerProps>`
  position: relative;
  margin-top: ${({ $position }) =>
    $position === PodiumPosition.Silver || $position === PodiumPosition.Bronze ? '15%' : 0};
`

const PodiumImage = styled.img`
  min-width: 100px;
`

const NftInfoContainer = styled.div<PodiumContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  margin-top: 42%;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  transition: all ease 0.3s;
  &:hover {
    filter: ${({ $position }) =>
    $position === PodiumPosition.Gold
      ? 'drop-shadow(0 0 80px gold)'
      : $position === PodiumPosition.Silver
        ? 'drop-shadow(0 0 80px silver)'
        : 'drop-shadow(0 0 80px red)'};
  }
  img {
    max-width: 20%;
    border-radius: 8px;
  }
  p {
    font-size: ${({ $position }) => ($position === PodiumPosition.Gold ? '2rem' : '1.25rem')};
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.75px;
    padding: 1rem 0.25rem;
    color: #ffffff;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25));
    @media (max-width: 600px) {
      font-size: ${({ $position }) => ($position === PodiumPosition.Gold ? '1.25rem' : '0.75rem')};
    }
  }
`

export const Podium = ({ position, image, name, id }: PodiumProps) => {
  return (
    <PodiumContainer $position={position}>
      <PodiumImage
        src={
          position === PodiumPosition.Gold
            ? GoldPodium
            : position === PodiumPosition.Silver
              ? SilverPodium
              : BronzePodium
        }
        alt={`${position} medal podium`}
      />
      {image && (
        <Link to={`/nftListing/${id}`}>
          <NftInfoContainer $position={position}>
            <img src={image} alt='' />
            <p>{name}</p>
          </NftInfoContainer>
        </Link>
      )}
    </PodiumContainer>
  )
}
