import styled from 'styled-components'
import { useState } from 'react'
import NavBar from '../../components/NavBar'
import { RarityTable } from './components'
import {
  SHADOW_AIRCRAFTS,
  SHADOW_BOATS,
  SHADOW_VEHICLES,
  SHADOW_CHARACTERS,
  SHADOW_HOUSES,
} from './constants'
import { AttributeType, AttributeColor } from '@constants'

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  margin-bottom: 50px;
  .section-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    margin-top: 6.25rem;
  }
  .title {
    font-size: 4rem;
    text-align: center;
    font-weight: 500;
    filter: drop-shadow(0 1px #ffffff);
  }
  .subtitle {
    max-width: 80%;
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
  }
`

interface OptionButtonProps {
  $bgColor: string
  $active: boolean
}

const OptionButton = styled.button<OptionButtonProps>`
  border-radius: 50px;
  color: #ffffff;
  font-size: 1.5rem;
  min-width: 135px;
  font-weight: 500;
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: ${({ $bgColor, $active }) => ($active ? $bgColor : ' rgba(41, 52, 98, 0.5)')};
  border: 4px solid ${({ $bgColor }) => $bgColor};
  transition: all 0.3s ease;
`

const ListData = {
  [AttributeType.Aircraft]: SHADOW_AIRCRAFTS,
  [AttributeType.Boat]: SHADOW_BOATS,
  [AttributeType.Vehicle]: SHADOW_VEHICLES,
  [AttributeType.Character]: SHADOW_CHARACTERS,
  [AttributeType.House]: SHADOW_HOUSES,
}

export const ItemRarity = () => {
  const [active, setActive] = useState<AttributeType>(AttributeType.Boat)

  const onSelectOption = (selectedOption: AttributeType) => {
    setActive(selectedOption)
  }

  return (
    <Wrapper>
      <NavBar />
      <div className='section-container'>
        <h1 className='title text-white'>Item Probabilities</h1>
        <p className='subtitle text-white'>
          Material World is a unique NFT collection meant to gamify the omni-chain experience by
          encouraging the accumulation of material possessions.
        </p>
        <div className='text-center my-[2rem]'>
          <OptionButton
            $active={active === AttributeType.Boat}
            $bgColor={AttributeColor[AttributeType.Boat]}
            onClick={() => onSelectOption(AttributeType.Boat)}
          >
            Boat
          </OptionButton>
          <OptionButton
            $active={active === AttributeType.House}
            $bgColor={AttributeColor[AttributeType.House]}
            onClick={() => onSelectOption(AttributeType.House)}
          >
            House
          </OptionButton>
          <OptionButton
            $active={active === AttributeType.Vehicle}
            $bgColor={AttributeColor[AttributeType.Vehicle]}
            onClick={() => onSelectOption(AttributeType.Vehicle)}
          >
            Vehicle
          </OptionButton>
          <OptionButton
            $active={active === AttributeType.Character}
            $bgColor={AttributeColor[AttributeType.Character]}
            onClick={() => onSelectOption(AttributeType.Character)}
          >
            Character
          </OptionButton>
          <OptionButton
            $active={active === AttributeType.Aircraft}
            $bgColor={AttributeColor[AttributeType.Aircraft]}
            onClick={() => onSelectOption(AttributeType.Aircraft)}
          >
            Aircraft
          </OptionButton>
        </div>
        <RarityTable
          tableData={ListData[active as keyof typeof ListData]}
          bgColor={AttributeColor[active]}
        />
      </div>
    </Wrapper>
  )
}
