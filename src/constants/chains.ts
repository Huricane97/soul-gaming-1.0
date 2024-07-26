export enum ChainName {
  Arbitrum = 'Arbitrum',
  Avalanche = 'Avalanche',
  Base = 'Base',
  BSC = 'BSC',
  Optimism = 'Optimism',
  Polygon = 'Polygon',
}

export enum ChainId {
  Arbitrum = '0xa4b1',
  Avalanche = '0xa86a',
  Base = '84532',
  BSC = '0x38',
  Optimism = '0xa',
  Polygon = '0x89',
}

export enum ChainColor {
  Arbitrum = '#617ee9',
  Avalanche = '#FF0002',
  Base = '#0143FE',
  BSC = '#F0B90B',
  Optimism = '#FF0420',
  Polygon = '#8345E6',
}

export const CHAIN_LIST = [
  ChainId.Base,
  ChainId.Polygon,
  ChainId.Arbitrum,
  ChainId.BSC,
  ChainId.Optimism,
  ChainId.Avalanche,
]

const env = import.meta.env.VITE_ENVIRONMENT

export const CHAIN_INFO = {
  [ChainId.Base]: {
    chainId: ChainId.Base,
    chainName: ChainName.Base,
    address:
      env === 'production'
        ? '0x908B1F113F76CD64240165357CBB31fB7132cAf1'
        : '0x908B1F113F76CD64240165357CBB31fB7132cAf1',
    ccipChainId: '15971525489660198786',
    ccipEntryPoint: '0x881e3A65B4d4a04dD529061dd0071cf975F58bCD',
    symbol: 'BASE-ETH',
    color: ChainColor.Base,
  },
  [ChainId.Polygon]: {
    chainId: ChainId.Polygon,
    chainName: ChainName.Polygon,
    address:
      env === 'production'
        ? '0x5a713D0194A8728fC062Fb21aC7adcF1dB0B3c13'
        : '0xa20F8Ecc9A78624505818B1642714877f6ad15CE',
    ccipChainId: '4051577828743386545',
    ccipEntryPoint: '0x849c5ED5a80F5B408Dd4969b78c2C8fdf0565Bfe',
    symbol: 'MATIC',
    color: ChainColor.Polygon,
  },
  [ChainId.Arbitrum]: {
    chainId: ChainId.Arbitrum,
    chainName: ChainName.Arbitrum,
    address:
      env === 'production'
        ? '0x92a0D0D7869Fc996196CFbFD35af77d7DE285a07'
        : '0xE072883Bb05bD81e053B32B0D73dE479612209b2',
    ccipChainId: '4949039107694359620',
    ccipEntryPoint: '0x141fa059441E0ca23ce184B6A78bafD2A517DdE8',
    symbol: 'ARB-ETH',
    color: ChainColor.Arbitrum,
  },
  [ChainId.BSC]: {
    chainId: ChainId.BSC,
    chainName: ChainName.BSC,
    address:
      env === 'production'
        ? '0x92a0D0D7869Fc996196CFbFD35af77d7DE285a07'
        : '0xab549e3F57f304E2AfF35222228f07591fce2b78',
    ccipChainId: '11344663589394136015',
    ccipEntryPoint: '0x34B03Cb9086d7D758AC55af71584F81A598759FE',
    symbol: 'BNB',
    color: ChainColor.BSC,
  },
  [ChainId.Optimism]: {
    chainId: ChainId.Optimism,
    chainName: ChainName.Optimism,
    address:
      env === 'production'
        ? '0x92a0D0D7869Fc996196CFbFD35af77d7DE285a07'
        : '0xCD1C3Df6BF8038774D688072D7ADe3aCeBce352d',
    ccipChainId: '3734403246176062136',
    ccipEntryPoint: '0x3206695CaE29952f4b0c22a169725a865bc8Ce0f',
    symbol: 'OP-ETH',
    color: ChainColor.Optimism,
  },
  [ChainId.Avalanche]: {
    chainId: ChainId.Avalanche,
    chainName: ChainName.Avalanche,
    address:
      env === 'production'
        ? '0x92a0D0D7869Fc996196CFbFD35af77d7DE285a07'
        : '0x9FBD1dF60bcCA7F4bE02A3a93CD35d452440ceD7',
    ccipChainId: '6433500567565415381',
    ccipEntryPoint: '0xF4c7E640EdA248ef95972845a62bdC74237805dB',
    symbol: 'AVAX',
    color: ChainColor.Avalanche,
  },
}

export const CCIP_CHANNELS = {
  [ChainId.Base]: [
    ChainId.Arbitrum,
    ChainId.Optimism,
    ChainId.BSC,
    ChainId.Avalanche,
    ChainId.Polygon,
    ChainId.Base,
  ],
  [ChainId.Polygon]: [
    ChainId.Arbitrum,
    ChainId.Optimism,
    ChainId.BSC,
    ChainId.Avalanche,
    ChainId.Polygon,
    ChainId.Base,
  ],
  [ChainId.BSC]: [
    ChainId.Arbitrum,
    ChainId.Optimism,
    ChainId.BSC,
    ChainId.Avalanche,
    ChainId.Polygon,
    ChainId.Base,
  ],
  [ChainId.Optimism]: [
    ChainId.Arbitrum,
    ChainId.Optimism,
    ChainId.BSC,
    ChainId.Avalanche,
    ChainId.Polygon,
    ChainId.Base,
  ],
  [ChainId.Avalanche]: [
    ChainId.Arbitrum,
    ChainId.Optimism,
    ChainId.BSC,
    ChainId.Avalanche,
    ChainId.Polygon,
    ChainId.Base,
  ],
  [ChainId.Arbitrum]: [
    ChainId.Arbitrum,
    ChainId.Optimism,
    ChainId.BSC,
    ChainId.Avalanche,
    ChainId.Polygon,
    ChainId.Base,
  ],
}
