export enum TraitType {
  activeChain = 'Active Chain',
  character = 'Character',
  house = 'House',
  boat = 'Boat',
  vehicle = 'Vehicle',
  aircraft = 'Aircraft',
  chainTraversals = 'Chain Traversals',
  wealthScore = 'Wealth Score',
}

export type Attribute =
  | {
      trait_type: TraitType.activeChain
      value: string
    }
  | {
      trait_type:
        | TraitType.aircraft
        | TraitType.boat
        | TraitType.chainTraversals
        | TraitType.character
        | TraitType.house
        | TraitType.vehicle
        | TraitType.wealthScore
      value: number
    }

export type NftData = {
  id: string
  name: string
  description: string
  image: string
  chainName?: string
  chainId?: string
  attributes: [
    {
      trait_type: TraitType.activeChain
      value: string
    },
    {
      trait_type: TraitType.character
      value: number
      id: number
    },
    {
      trait_type: TraitType.house
      value: number
      id: number
    },
    {
      trait_type: TraitType.boat
      value: number
      id: number
    },
    {
      trait_type: TraitType.vehicle
      value: number
      id: number
    },
    {
      trait_type: TraitType.aircraft
      value: number
      id: number
    },
    {
      trait_type: TraitType.chainTraversals
      value: number
    },
    {
      trait_type: TraitType.wealthScore
      value: number
    },
  ]
}
