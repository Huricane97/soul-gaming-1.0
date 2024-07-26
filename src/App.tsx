import { Route, Routes, Navigate } from 'react-router-dom'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
// import NFTListing from './pages/nftListing'
// import SingleNFT from './pages/SingleNFt'
import { LeaderBoards } from './pages/LeaderBoards'
// import { ItemRarity } from './pages/ItemRarity'
import 'react-toastify/dist/ReactToastify.css'
import Guild from '@pages/Guilds'
import RanksandPerformance from '@pages/RankPerformance'
import Recruitment from '@pages/Recruitment'
import SoulStreamers from '@pages/SoulStreamers'
import GetReward from '@pages/GetReward'
import NFTs from '@pages/NFTs'
import UserAuth from '@pages/UserAuth'
import "./app.css";
Modal.setAppElement('#root')
function App() {
  return (
    <div className='App'>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Guild' element={<Guild />} />
        <Route path='/RanksPerformance' element={<RanksandPerformance />} />
        <Route path='/Recruitment' element={<Recruitment />} />
        <Route path='/SoulStreamers' element={<SoulStreamers />} />
        <Route path='/GetReward' element={<GetReward />} />
        <Route path='/UserAuth' element={<UserAuth />} />

        <Route path='/NFTs' element={<NFTs />} />

        
        <Route path='/leaderboards' element={<LeaderBoards />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <ToastContainer theme='dark' />
    </div>
  )
}

export default App
