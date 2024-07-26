import { ChainName, ChainId, ChainColor } from './chains'

export enum AttributeType {
  Aircraft = 'Aircraft',
  Boat = 'Boat',
  Character = 'Character',
  House = 'House',
  Name = 'Name',
  Vehicle = 'Vehicle',
}

export enum AttributeChain {
  Aircraft = ChainName.Avalanche,
  Boat = ChainName.Polygon,
  Character = ChainName.Optimism,
  House = ChainName.Arbitrum,
  Name = ChainName.Base,
  Vehicle = ChainName.BSC,
}

export enum AttributeColor {
  Aircraft = ChainColor.Avalanche,
  Boat = ChainColor.Polygon,
  Character = ChainColor.Optimism,
  House = ChainColor.Arbitrum,
  Name = ChainColor.Base,
  Vehicle = ChainColor.BSC,
}

export const NFT_ATTRIBUTES = [
  {
    title: AttributeType.Name,
    chain: AttributeChain.Name,
    chainId: ChainId.Base,
    color: ChainColor.Base,
  },
  {
    title: AttributeType.Boat,
    chain: AttributeChain.Boat,
    chainId: ChainId.Polygon,
    color: ChainColor.Polygon,
  },
  {
    title: AttributeType.House,
    chain: AttributeChain.House,
    chainId: ChainId.Arbitrum,
    color: ChainColor.Arbitrum,
  },
  {
    title: AttributeType.Vehicle,
    chain: AttributeChain.Vehicle,
    chainId: ChainId.BSC,
    color: ChainColor.BSC,
  },
  {
    title: AttributeType.Character,
    chain: AttributeChain.Character,
    chainId: ChainId.Optimism,
    color: ChainColor.Optimism,
  },
  {
    title: AttributeType.Aircraft,
    chain: AttributeChain.Aircraft,
    chainId: ChainId.Avalanche,
    color: ChainColor.Avalanche,
  },
]
