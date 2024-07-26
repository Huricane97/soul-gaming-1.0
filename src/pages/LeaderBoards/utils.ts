import { NftData, TraitType, Attribute } from '@types'

export const filterFullyTraversedNfts = (nfts: NftData[]) => {
  const fullyTraversedNfts = nfts.filter(
    nft =>
      nft.attributes[1].id > 0 &&
      nft.attributes[2].id > 0 &&
      nft.attributes[3].id > 0 &&
      nft.attributes[4].id > 0 &&
      nft.attributes[5].id > 0,
  )
  return fullyTraversedNfts
}

export const removeDuplicatesAndKeepHighestTraversals = (arr: NftData[]): NftData[] => {
  const uniqueItems: any = {}
  arr.forEach((item: NftData) => {
    const itemId: string = item.id
    if (!uniqueItems[itemId]) {
      uniqueItems[itemId] = item
    } else {
      const currentNftTraversals = uniqueItems[itemId].attributes.find(
        (attr: Attribute) => attr.trait_type === TraitType.chainTraversals,
      ).value
      const newNftTraversals = item.attributes.find(
        (attr: Attribute) => attr.trait_type === TraitType.chainTraversals,
      )!.value
      if (newNftTraversals > currentNftTraversals) {
        uniqueItems[itemId] = item
      }
    }
  })

  return Object.values(uniqueItems)
}

export const removeDuplicates = (arr: NftData[]): NftData[] => {
  const uniqueItems: any = {}
  arr.forEach((item: NftData) => {
    const itemId: string = item.id
    if (!uniqueItems[itemId]) uniqueItems[itemId] = item
  })

  return Object.values(uniqueItems)
}

export const sortByWealthScore = (nftArray: NftData[]) => {
  const sortedArray = nftArray.toSorted(
    (a, b) =>
      Number(b.attributes.find(attr => attr.trait_type === TraitType.wealthScore)!.value) -
      Number(a.attributes.find(attr => attr.trait_type === TraitType.wealthScore)!.value),
  )
  return sortedArray
}

export const sortByTraversals = (nftArray: NftData[]) => {
  const sortedArray = nftArray.toSorted(
    (a, b) =>
      Number(b.attributes.find(attr => attr.trait_type === TraitType.chainTraversals)!.value) -
      Number(a.attributes.find(attr => attr.trait_type === TraitType.chainTraversals)!.value),
  )
  return sortedArray
}

export const sortByDegen = (nftArray: NftData[]) => {
  return sortByWealthScore(nftArray).reverse()
}
