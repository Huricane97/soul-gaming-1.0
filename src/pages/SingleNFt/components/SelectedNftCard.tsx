import styled from 'styled-components'

// const RankingBadge = styled.div`
//   background-color: #000000;
//   border-radius: 50px;
//   padding: 0.0625rem 0.75rem;
//   font-size: 12px;
//   text-align: center;
// `
const ScoreLabels = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  span {
    color: #ffffff;
    font-weight: bold;
  }
`

interface CardContainerProps {
  $bgColor: string
  $borderColor: string
}

const CardContainer = styled.div<CardContainerProps>`
  background-color: ${({ $bgColor }) => $bgColor};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 5px solid ${({ $borderColor }) => $borderColor};
  max-width: 400px;
  max-height: 520px;
  .nftImage {
    img {
      width: 100%;
      border-radius: 8px;
    }
  }
`

export const SelectedNftCard = ({
  nftImage,
  nftName,
  metadataAttributes,
  bgColor,
  borderColor,
}: any) => (
  <>
    <div className='flex flex-col'>
      <CardContainer
        className=' flex flex-col gap-1 p-4'
        $bgColor={bgColor}
        $borderColor={borderColor}
      >
        <div className='nftImage'>
          <img alt='nftimage' src={nftImage} />
        </div>
        <h3 className='text-[25px]'>{nftName}</h3>

        <ScoreLabels>
          Chain Traversals:{' '}
          <span>
            {metadataAttributes.find((t: any) => t.trait_type == 'Chain Traversals').value}
          </span>
        </ScoreLabels>
        <ScoreLabels>
          Wealth Score:{' '}
          <span>{metadataAttributes.find((t: any) => t.trait_type == 'Wealth Score').value}</span>
        </ScoreLabels>
      </CardContainer>
    </div>
  </>
)
