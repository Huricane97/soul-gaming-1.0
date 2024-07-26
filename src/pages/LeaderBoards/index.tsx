import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import NavBar from '../../components/NavBar'
import { SERVER_URL } from '@constants'
import {
  removeDuplicatesAndKeepHighestTraversals,
  filterFullyTraversedNfts,
  sortByWealthScore,
  sortByDegen,
  sortByTraversals,
} from './utils'
import { PodiumBackground } from './images'
import { Podium } from './components/Podium'
import { NftRankTable } from './components/NftRankTable'
import { NftData } from '@types'
import { PodiumPosition, SortingFilter } from './types'
import { Loader } from '@components/Loader'
import { useLocalStorage } from '@hooks'
import axios from 'axios'

const PageContainer = styled.div`
  background-color: #000000;
  width: 100%;
  min-    height: 100vh;
  padding-top: 100px;
  background-image: url(${PodiumBackground});
  background-repeat: no-repeat;
`
const Top3Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  margin: auto;
  h1 {
    font-size: 4rem;
    font-weight: 500;
    color: #ffffff;
    filter: drop-shadow(0 1px 20px #ffffff);
  }
  p {
    font-size: 1.25rem;
    color: #ffffff;
  }
`
const RankTableSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  margin: auto;
  padding-bottom: 4rem;
  @media (max-width: 800px) {
    max-width: 90%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`
const PodiumsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: auto;
`
const FiltersContainer = styled(PodiumsContainer)`
  width: 80%;
  max-width: 600px;
  margin-top: 60px;
  background-color: rgba(255, 255, 255, 0.21);
  padding: 0.5rem 1rem;
  border-radius: 3px;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const EmptyLeaderboardContainer = styled.div`
  background-color: transparent;
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 110%;
  overflow: hidden;
  .text-container {
    padding: 1rem 2rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    text-align: center;
    max-width: 600px;
    p {
      font-size: 1.25rem;
      color: #ffffff;
      filter: drop-shadow(0 3px 15px #000000);
    }
  }
`

interface FilterProps {
  $active: boolean
}
const FilterSelector = styled.button<FilterProps>`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.75px;
  padding: 0.25rem 1rem;

  filter: drop-shadow(3 1px 49px rgba(0, 1, 17, 1));
  color: ${({ $active }) => ($active ? 'rgba(136, 244, 149, 1)' : '#ffffff')};
  &:hover {
    color: rgba(136, 244, 149, 1);
  }
`

export const LeaderBoards = () => {
  const isRequestInProgress = useRef(false)
  const [data, setData] = useState<NftData[]>([])
  const [sortBy, setSortBy] = useState<SortingFilter>(SortingFilter.Wealth)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>('')
  const [nextUpdate, setNextUpdate] = useState<string>('')
  const { getStoredData: getStoreUpdate, setStoredData: setStoreUpdate } =
    useLocalStorage<string>(60) // Add loading state
  const { getStoredData, setStoredData } = useLocalStorage<NftData[]>(60)

  useEffect(() => {
    if (isRequestInProgress.current) return
    const storedLeaderboard = getStoredData(sortBy)
    if (storedLeaderboard) {
      setData(storedLeaderboard)
      const date: string = getStoreUpdate('timestamp') ?? ''
      setLastUpdate(date)
      setLoading(false)
    } else {
      isRequestInProgress.current = true
      ;(async () => {
        const url = `${SERVER_URL}/api/leaderboard`
        const resp = await axios.get(url)

        const formatDate = resp.data.timestamp
          .replace(/|Z|\..*/, '')
          .slice(0, -5)
          .replace('T', ' ')

        const updateTime = resp.data.updateTime
          .replace(/|Z|\..*/, '')
          .slice(0, -5)
          .replace('T', ' ')

        setLastUpdate(formatDate)
        setNextUpdate(updateTime)
        setStoreUpdate('timestamp', formatDate)
        const metaUrl = `${SERVER_URL}/api/allMetadata`
        const respMeta = await axios.post(metaUrl, resp.data)
        const state = respMeta.data

        const filteredNfts = filterFullyTraversedNfts(
          removeDuplicatesAndKeepHighestTraversals(state),
        )
        const wealthSortedList = sortByWealthScore(filteredNfts)
        setStoredData(SortingFilter.Wealth, wealthSortedList)
        setStoredData(SortingFilter.Traveler, sortByTraversals(filteredNfts))
        setStoredData(SortingFilter.Degen, sortByDegen(filteredNfts))

        setData([...wealthSortedList])
        setSortBy(SortingFilter.Wealth)
        setLoading(false)
      })()
    }
  }, [lastUpdate, nextUpdate])

  if (loading) {
    return (
      <PageContainer>
        <NavBar />
        <Loader />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <NavBar />
      {data?.length === 0 && (
        <EmptyLeaderboardContainer>
          <div className='text-container'>
            <p>
              None of the minted NFTs currently meet the requirements for leaderboard entry. Ensure
              you collect all five assets, one from each network.
            </p>
          </div>
        </EmptyLeaderboardContainer>
      )}
      <Top3Section>
        <h1>Leaderboards</h1>
        <p>You must own possessions on every chain to be considered for the leaderboard</p>
        <p>last update: {lastUpdate}</p>
        <p>next update: {nextUpdate}</p>
        <FiltersContainer>
          <FilterSelector
            type='button'
            $active={sortBy === SortingFilter.Wealth}
            onClick={() => {
              setSortBy(SortingFilter.Wealth)
              const wealthLeaderboard = getStoredData(SortingFilter.Wealth)
              if (wealthLeaderboard) {
                setData([...wealthLeaderboard])
              }
            }}
          >
            Wealth
          </FilterSelector>

          <FilterSelector
            type='button'
            $active={sortBy === SortingFilter.Degen}
            onClick={() => {
              setSortBy(SortingFilter.Degen)
              const degenLeaderboard = getStoredData(SortingFilter.Degen)
              if (degenLeaderboard) {
                setData([...degenLeaderboard])
              }
            }}
          >
            Degen
          </FilterSelector>

          <FilterSelector
            type='button'
            $active={sortBy === SortingFilter.Traveler}
            onClick={() => {
              setSortBy(SortingFilter.Traveler)
              const travelLeaderboard = getStoredData(SortingFilter.Traveler)
              if (travelLeaderboard) {
                setData([...travelLeaderboard])
              }
            }}
          >
            Traveler
          </FilterSelector>
        </FiltersContainer>

        <PodiumsContainer>
          <Podium
            position={PodiumPosition.Silver}
            image={data[1]?.image}
            name={data[1]?.name}
            id={data[1]?.id}
          />
          <Podium
            position={PodiumPosition.Gold}
            image={data[0]?.image}
            name={data[0]?.name}
            id={data[0]?.id}
          />
          <Podium
            position={PodiumPosition.Bronze}
            image={data[2]?.image}
            name={data[2]?.name}
            id={data[2]?.id}
          />
        </PodiumsContainer>
      </Top3Section>
      <RankTableSection>{data?.length > 0 && <NftRankTable tableData={data} />}</RankTableSection>
    </PageContainer>
  )
}
