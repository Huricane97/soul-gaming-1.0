import ReactDOM from 'react-dom/client'
import './styles/tailwind.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import './theme/global.scss'
import 'react-tooltip/dist/react-tooltip.css'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon, polygonMumbai, goerli]
const projectId = '494a6e2744d91d4aa8ae5d29486066cd'
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <WagmiConfig config={wagmiConfig}>
      <Router>
        <App />
      </Router>
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>,
)
