import { ItemNames } from '../../ItemRarity/constants/item-names.ts'
import styled from 'styled-components'
import { CCIP_CHANNELS } from '@constants'
import { useAccount } from 'wagmi'

interface NftCardButtonProps {
  $nftColor?: string
}
interface NftCardContainerProps extends NftCardButtonProps {
  $active: boolean
}
const NftCardButton = styled.button<NftCardButtonProps>`
  font-size: 0.75rem;
  line-height: 15px;
  color: #ffffff;
  border: 3px solid ${({ $nftColor }) => $nftColor};
  border-radius: 8px;
  padding: 12px 16px;
  margin: 0 4px;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ $nftColor }) => $nftColor};
  }
`
const RerollNftCardButton = styled(NftCardButton)`
  color: #293462;
  border: 0px;
  background-color: #ffffff;
  transition: all 0.3s ease;
  &:hover {
    background-color: #293462;
    color: #ffffff;
  }
`

const NftCardContainer = styled.div<NftCardContainerProps>`
  position: relative;
  width: 187.5px;
  height: 250px;
  padding: 4px 4px 8px 4px;
  font-weight: 500;
  font-size: 0.75rem;
  border: 4px solid ${({ $nftColor }) => $nftColor};
  border-radius: 10px;
  background-color: ${({ $active, $nftColor }) => ($active ? $nftColor : 'rgba(0, 0, 0, 0.1)')};
  backdrop-filter: ${({ $active }) => ($active ? 'none' : 'blur(10px)')};
  box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.2);

  .chain-logo {
    width: 18px;
    height: 18px;
  }

  .attribute-image {
    width: 60%;
    border-radius: 6px;
    max-height: 100px;
  }
`

type NftData = {
  title: string
  chain: string
  chainId: string
  color: string
}

type NftCardProps = {
  nftData: NftData
  nftName: string
  owner: string
  active: boolean
  currentChainId: string
  metadataAttribute: any
  onReroll: () => void
  onClickTraverse: (nftData: NftData) => void
}

export const NftAttributeCard = ({
  nftData,
  nftName,
  active,
  owner,
  currentChainId,
  metadataAttribute,
  onReroll,
  onClickTraverse,
}: NftCardProps) => {
  const { address } = useAccount()

  return (
    <NftCardContainer
      className={`item flex flex-col justify-between items-center ${
        (CCIP_CHANNELS[currentChainId as keyof object] as any).includes(nftData.chainId) ||
        currentChainId == nftData.chainId
          ? ''
          : 'opacity-50'
      }`}
      $nftColor={nftData.color}
      $active={active}
    >
      <div className='w-full flex items-center justify-start gap-1'>
        <img alt='' className='chain-logo' src={`/assets/imgs/chain/${nftData.chainId}.svg`} />
        {nftData.title}
      </div>

      {nftData.title === 'Name' && nftName}

      {metadataAttribute && (
        <img
          className='attribute-image'
          alt='Attribute image'
          src={`/assets/layers/${
            nftData.title + '/' + nftData.title + ' ' + metadataAttribute?.id
          }.png`}
        />
      )}

      {ItemNames[nftData?.title as keyof object]?.[metadataAttribute?.id]}

      {address == owner &&
        (active ? (
          <RerollNftCardButton onClick={onReroll}>
            {nftData.title === 'Name' ? 'Change' : 'Reroll'} {nftData.title}
          </RerollNftCardButton>
        ) : (
          <NftCardButton $nftColor={nftData.color} onClick={() => onClickTraverse(nftData)}>
            {(CCIP_CHANNELS[currentChainId as keyof object] as any).includes(nftData.chainId) ? (
              <>
                Travel to {nftData.chain} to{' '}
                {metadataAttribute?.id == 0
                  ? 'claim'
                  : nftData.title === 'Name'
                    ? 'change'
                    : 'reroll'}
              </>
            ) : (
              <>Lane not currently available</>
            )}
          </NftCardButton>
        ))}
    </NftCardContainer>
  )
}
