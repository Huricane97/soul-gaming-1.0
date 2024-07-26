import styled from 'styled-components'
import NavBar from '@components/NavBar'
import Footer from '@components/Footer'
import { SwapLinks } from '@components/SwapLinks'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { SERVER_URL, CHAIN_INFO } from '@constants'
import { Loader } from '@components/Loader'
import axios from 'axios'

const Wrapper = styled.div`
  position: relative;
  .backgroundWrapper {
    min-    height: 100vh;
    background-image: url('/assets/imgs/website_background.webp');
    background-size: 100% auto;
    padding: 100px 0 50px 0;
  }
`

const Space = styled.div`
  position: relative;
  height: 100px;
`
const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  text-align: center;
  color: #ffffff;
  text-shadow:
    0 0 64px rgba(192, 219, 255, 0.48),
    0 0 16px rgba(65, 120, 255, 0.24);
`

const SubTitle = styled.h3`
  font-style: normal;
  font-weight: 700;
  text-align: center;
  font-size: 1.75rem;
  color: #ffffff;
  text-shadow: 6px 6px 4px rgba(0, 0, 0, 0.4);
`
const SubTitle2 = styled.h4`
  font-style: normal;
  font-weight: 700;
  text-align: center;
  font-size: 1.5rem;
  color: #ffffff;
  text-shadow: 6px 6px 4px rgba(0, 0, 0, 0.4);
`

const NFTContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  .nftItem {
    width: 300px;
    position: relative;
    padding: 1rem;
    // background: #101426;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    transition: 0.3s all;

    &:hover {
      transform: scale(1.05);
    }

    .thumbnail {
      position: relative;
      border-radius: 8px;
      overflow: hidden;

      .chainIcon {
        position: absolute;
        border-radius: 100vw;
        width: 40px;
        top: 0.5rem;
        right: 0.5rem;
        border: 1px solid rgb(255, 255, 255);
        padding: 7px;
        height: 40px;
        object-fit: contain;
        background: #1014267a;
      }
    }

    .name {
      color: white;
      font-weight: 600;
      font-size: 21px;
    }

    .chain,
    .wealth {
      color: #c1c1c1;
      font-size: 18px;

      span {
        color: #bac3e6;
        font-weight: 700;
      }
    }
  }
`
const InfoContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 60%;
  @media (max-width: 1280px) {
    max-width: 80%;
  }
  h4 {
    font-size: 1.75rem;
    color: white;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
`

export const NFTListing = () => {
  const { isConnected, address } = useAccount()
  const [nfts, setNfts] = useState<any[]>([])
  const [traversingNfts, setTraversingNfts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  //* Fetch list of NFTs
  useEffect(() => {
    try {
      if (isConnected)
        (async () => {
          const urls = `${SERVER_URL}/api/getAllNft/account/${address}`
          const data = await axios.get(urls)
          console.log(data)
          let newState2 = []
          const items = data.data

          if (Object.keys(items).length !== 0) {
            newState2 = items.flatMap((x: { nftList: any[] }) => {
              return x.nftList.map(nft => {
                return {
                  ...nft,
                  chainName: (CHAIN_INFO[nft.chainId as keyof object] as any)?.chainName,
                  id: nft.id,
                }
              })
            })
          }
          setNfts([...newState2])
          setLoading(false)
        })()
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }, [address])

  //* Fetch list of traversing NFTs
  useEffect(() => {
    try {
      if (isConnected && !loading)
        (async () => {
          const state: any[] = []

          const urlTraverse = `${SERVER_URL}/api/traversing-tokens/account/${address}`
          const dataTraverse = await axios.get(urlTraverse)
          const itemsTraverse = dataTraverse.data.filter(
            (obj: any) => !nfts.some((item: any) => item.id === obj.id),
          )
          const promises = []

          for (let i = 0; i < itemsTraverse.length; i++) {
            promises.push(
              (async () => {
                try {
                  const url = `${SERVER_URL}/api/metadata/${itemsTraverse[i].id}/${itemsTraverse[i].chainId}`
                  const data = await axios.get(url)
                  return { ...data.data, traversing: itemsTraverse[i].traversing }
                } catch (e) {
                  return null
                }
              })(),
            )
          }

          await Promise.all(promises).then(res => {
            res.forEach((r, i) => {
              if (r)
                state.push({
                  ...r,
                  chainName: (CHAIN_INFO[r.chainId as keyof object] as any)?.chainName,
                  id: itemsTraverse[i].id,
                })
            })
          })

          setTraversingNfts([...state])
        })()
    } catch (e) {
      console.log(e)
    }
  }, [address, loading])

  const navigate = useNavigate()

  const openDetails = (item: any) => {
    // localStorage.setItem('selectedNFT', JSON.stringify(item))
    navigate(`/nftListing/${item.id}`)
  }
  if (loading) {
    return (
      <Wrapper>
        <NavBar />
        {!isConnected && (
          <>
            <Space />
            <SubTitle>Connect your Wallet to see your NFTs</SubTitle>
          </>
        )}
        <div className='backgroundWrapper flex align-center justify-center'>
          <Loader />
        </div>
        <Space />
        <Footer />
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <NavBar />

      <div className='backgroundWrapper relative z-10'>
        <div className='container m-auto'>
          <Space />

          <div className='flex flex-col justify-center items-center gap-8'>
            <Title>My Material World NFTs</Title>

            <SubTitle>
              Click on one of your NFTs to view its assets and move it to another chain
            </SubTitle>
            <SubTitle2>
              * It may take a minute to load your NFT&apos;s as we fetch data from 6 different
              blockchains
            </SubTitle2>
          </div>

          <Space />

          <NFTContainer>
            {nfts.length > 0 &&
              nfts.map((item: any, index: any) => (
                <div
                  key={`nft${index}`}
                  className='nftItem'
                  onClick={() => openDetails(item)}
                  style={{
                    background: (CHAIN_INFO[item.chainId as keyof object] as any).color + '88',
                  }}
                >
                  <div>
                    <div className='thumbnail'>
                      <img alt='nftpic' src={item.image} />

                      <img
                        alt='chainIcon'
                        className='chainIcon'
                        src={`/assets/imgs/chain/${item.chainId}.svg`}
                      />
                    </div>

                    <div className='name'>
                      {item.name} #{item.id}
                    </div>
                    <div className='chain'>
                      Current Chain: <span>{item.chainName}</span>
                    </div>
                  </div>
                </div>
              ))}
            {traversingNfts.length > 0 &&
              traversingNfts.map((item: any, index: any) => (
                <div
                  key={`traversingNft${index}`}
                  className='nftItem'
                  onClick={() => openDetails(item)}
                  style={{
                    background: (CHAIN_INFO[item.chainId as keyof object] as any).color + '88',
                  }}
                >
                  <div className={'blur-[2px] isTraversing'}>
                    <div className='thumbnail'>
                      <img alt='nftpic' src={item.image} />

                      <img
                        alt='chainIcon'
                        className='chainIcon'
                        src={`/assets/imgs/chain/${item.chainId}.svg`}
                      />
                    </div>

                    <div className='name'>
                      {item.name} #{item.id}
                    </div>
                    <div className='chain'>
                      Current Chain: <span>{item.chainName}</span>
                    </div>
                  </div>
                  <div className='absolute w-full h-full top-0 left-0 flex justify-center items-center text-center font-bold text-[#101426]'>
                    NFT is being transferred <br /> click for details
                  </div>
                </div>
              ))}
          </NFTContainer>
          <InfoContainer>
            <h4>
              Note: Transfer times and fees can vary, and some routes are naturally more expensive
              than others. The transfer fee is calculated based on the destination chain’s gas and
              is paid for in the origin chain’s token.
            </h4>
            <SwapLinks />
          </InfoContainer>
          <Space />

          <Footer />
        </div>
      </div>
    </Wrapper>
  )
}

export default NFTListing
