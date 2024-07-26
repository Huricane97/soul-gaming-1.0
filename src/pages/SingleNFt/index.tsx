import { useEffect, useState, HTMLAttributes } from 'react'
import { FaArrowRight, FaSortDown, FaSortUp } from 'react-icons/fa'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'
import { Tooltip as ReactToolTip } from 'react-tooltip'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import { Loader } from '../../components/Loader'
import { ToastContent } from '../../components/ToastContent'
import {
  SERVER_URL,
  CCIP_CHANNELS,
  CHAIN_INFO,
  ChainId,
  NFT_ATTRIBUTES,
  CHAIN_LIST,
} from '@constants'
import { NftAttributeCard, SelectedNftCard, TraverseInProgress } from './components'
import { ABI_ERC721, ABI_ENTRYPOINT } from '@configs'
import { changeHexColorTransparency, emptyAction } from '@utils'
import { ItemNames } from '../ItemRarity/constants/item-names'

interface ModalColumnProps {
  expanded: boolean
}

const Wrapper = styled.div`
  position: relative;
  color: white;

  .backgroundWrapper {
    min-    height: 100vh;

    background-image: url('/assets/imgs/website_background.webp');
    background-size: 100% auto;

    padding: 100px 0 50px 0;
  }

  @media only screen and (max-width: 768px) {
    .modal-content {
      height: 40%;
    }
  }
`

const Space = styled.div`
  position: relative;
  height: 100px;
`

const Attributes = styled.div`
  position: relative;
  margin-top: 2.5rem;
  @media (max-width: 1280px) {
    width: fit-content;
  }
`
const TableContainer = styled.div`
  background-color: rgba(35, 35, 35, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  .header-row {
    border-bottom: 2px solid #ffffff;
  }
`

const ModalWrapper = styled(Modal)``

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px; // Add font size as needed
`

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const ModalButton = styled.button`
  background-color: #88f495;
  color: #37433f;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px; // Add margin as needed
`
const DisabledModalButton = styled(ModalButton)`
  background-color: #b6b6b6;
  cursor: not-allowed;
`
const DisabledVrfMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 4px;
`

const ModalDivider = styled.div`
  border-left: 1px solid #37433f;
  margin-left: 5px;
  margin-right: 5px;
`
const ShowMoreButton1 = styled.button`
  background-color: #007bff00;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
`

const Datacard = styled.div`
  background-color: rgba(1, 67, 254, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 5px solid rgb(1, 67, 254);
  height: fit-content;
  width: 30%;
`

const ModalColumn: React.FC<HTMLAttributes<HTMLDivElement> & ModalColumnProps> =
  styled.div<ModalColumnProps>`
    width: 40%;
    flex: 1;
    flex-direction: column;
    justify-content: ${props => (props.expanded ? 'start' : 'end')};
  `

export const SingleNFT = () => {
  const { id } = useParams()
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [metadata, setMetadata] = useState<any>()
  const [history, setHistory] = useState<any>([])
  const [isExpanded, setExpanded] = useState(true)
  const [selectedOption, setSelectedOption] = useState()
  const [isTraversing, setIsTraversing] = useState(false)
  const [traverseTx, setTraverseTx] = useState(null)

  useEffect(() => {
    if (isConnected && id)
      (async () => {
        // 1. Get History
        const urlH = `${SERVER_URL}/api/history/${id}`
        const dataH = (await axios.get(urlH)).data
        const sortedData = dataH.sort((a: any, b: any) => {
          const ad = new Date(a.time)
          const bd = new Date(b.time)
          return bd.getTime() - ad.getTime()
        })
        setHistory(sortedData)
        // 2. Get metadata
        try {
          const url = `${SERVER_URL}/api/metadata/${id}`
          const dataM = await axios.get(url)
          setMetadata({ ...dataM.data, id })
          setSelectedOption(dataM.data.chainId)
        } catch (e: any) {
          if (e.response.data.error == 'Invalid Id' && dataH.length != 0) {
            setIsTraversing(true)
            const lastLog = dataH[dataH.length - 1]
            setTraverseTx(lastLog.tx_hash)
          }
        }

        setLoading(false)
      })()
  }, [])

  const onClickTraverse = async (item: any) => {
    const src = CHAIN_INFO[metadata.chainId as keyof typeof CHAIN_INFO]
    const dst = CHAIN_INFO[item.chainId as keyof typeof CHAIN_INFO]

    if (!CCIP_CHANNELS[src.chainId].includes(dst.chainId)) {
      toast.error(`${src.chainName} => ${dst.chainName} channel is not supported`)
      return
    }

    switchNetwork?.(metadata.chainId)

    // setIsTraversing(TraversingState.Traversing);

    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const signer = await provider.getSigner()

    const endpointInstance: any = new ethers.Contract(src.ccipEntryPoint, ABI_ENTRYPOINT, signer)
    const msg = {
      receiver: ethers.utils.defaultAbiCoder.encode(['address'], [dst.address]),
      // data: "0x0000000000000000000000009527e2d01a3064ef6b50c1da1c0cc523803bcff20000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc40000000000000000000000000000000000000000000000000000000000000001",
      data: ethers.utils.defaultAbiCoder.encode(
        ['address', 'address', 'uint'],
        [dst.address, address, metadata.id],
      ),
      tokenAmounts: [],
      extraArgs:
        '0x97a657c90000000000000000000000000000000000000000000000000000000000030d400000000000000000000000000000000000000000000000000000000000000000',
      feeToken: '0x0000000000000000000000000000000000000000',
    }
    const crossGas = (await endpointInstance.getFee(dst.ccipChainId, msg)) * 1.5

    const traverseContract: any = new ethers.Contract(src.address as string, ABI_ERC721, signer)
    const fee = await traverseContract.getUSDPrice(25)

    //traverse
    try {
      if (Number(await signer.getBalance()) < Number(crossGas) + Number(fee)) {
        toast.error(
          <ToastContent
            title='Insufficient Funds for Transfer'
            message={`Required $0.25 ${src.symbol} + gas for transferring your NFT to ${item.chain}`}
          />,
        )
        return
      }

      const tx = await traverseContract.traverse(String(dst.ccipChainId), String(metadata.id), {
        value: String(Math.round(Number(crossGas) + Number(fee))),
      })
      const req = await tx.wait()

      setTraverseTx(req.transactionHash)

      toast.success(
        <ToastContent
          title='Transfer Initiated'
          message={`Your NFT is being transferred to ${item.chain}`}
        />,
      )

      setIsTraversing(true)
    } catch (e) {
      console.log(e)
    }
  }

  async function reroll() {
    if (chain?.id != metadata.chainId) {
      await switchNetwork?.(metadata.chainId)
      return
    }

    const contractAddress_ = (CHAIN_INFO[metadata.chainId as keyof object] as any)?.address
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const signer = await provider.getSigner()

    try {
      const ct: any = new ethers.Contract(contractAddress_ as string, ABI_ERC721, signer)
      if ((await ct.ownerOf(metadata.id)) != address) {
        toast.error('You do not own this NFT!')
        return
      }

      const fee = await ct.getUSDPrice(25)
      if (Number(await signer.getBalance()) < fee) {
        const currentChainSymbol = CHAIN_INFO[metadata.chainId as keyof typeof CHAIN_INFO].symbol
        toast.error(
          <ToastContent
            title='Insufficient Funds for Reroll'
            message={`Reroll operation requires $0.25 ${currentChainSymbol} + gas for rerolling your current asset`}
          />,
        )
        return
      }

      let tx
      if (metadata.chainId == ChainId.Arbitrum)
        tx = await ct.rerollTrait(metadata.id, {
          value: fee,
        })
      else
        tx = await ct.rerollTrait(metadata.id, {
          value: fee,
          gasLimit: 500_000,
        })

      const req = await tx.wait()
      setIsModalOpen(false)
      toast.success(<ToastContent title='Reroll successful' />)
      return req
    } catch (e) {
      toast.error(
        <ToastContent
          title='Reroll Error'
          message='And unexpected error occurred when trying to reroll'
        />,
      )
      console.log(e)
    }
  }

  async function rerollVRF() {
    if (chain?.id != metadata.chainId) {
      await switchNetwork?.(metadata.chainId)
      return
    }

    const contractAddress_ = (CHAIN_INFO[metadata.chainId as keyof object] as any)?.address

    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const signer = await provider.getSigner()
    const ct: any = new ethers.Contract(contractAddress_ as string, ABI_ERC721, signer)

    if ((await ct.ownerOf(metadata.id)) != address) {
      toast.error('You do not own this NFT!')
      return
    }

    const fee = await ct.getUSDPrice(25)
    if (Number(await signer.getBalance()) < fee) {
      const currentChainSymbol = CHAIN_INFO[metadata.chainId as keyof typeof CHAIN_INFO].symbol
      toast.error(
        <ToastContent
          title='Insufficient Funds for Reroll'
          message={`Reroll operation requires $0.25 ${currentChainSymbol} + gas (incluiding VRF) for rerolling your current asset`}
        />,
      )
      return
    }

    try {
      const tx = await ct.rerollTraitVRF(metadata.id, {
        gasLimit: 5000000,
        value: fee,
      })
      const req = await tx.wait()
      setIsModalOpen(false)
      toast.success(<ToastContent title='Reroll successful' />)
      return req
    } catch (e) {
      toast.error(
        <ToastContent
          title='Reroll Error'
          message='And unexpected error occurred when trying to reroll'
        />,
      )
      console.log(e)
    }
  }

  async function rerollName() {
    if (chain?.id != metadata.chainId) {
      await switchNetwork?.(metadata.chainId)
      return
    }

    const contractAddress_ = (CHAIN_INFO[metadata.chainId as keyof object] as any)?.address
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const signer = await provider.getSigner()

    try {
      const ct: any = new ethers.Contract(contractAddress_ as string, ABI_ERC721, signer)
      const charName = (document.getElementById('nameInput') as HTMLInputElement).value

      if (await ct.usedName(charName)) {
        toast.error('Name already used')
        return
      }

      const fee = await ct.getUSDPrice(25)
      if (Number(await signer.getBalance()) < fee) {
        toast.error(
          <ToastContent
            title='Insufficient Funds for Rename'
            message='Rename operation requires $0.25 in ETH + gas'
          />,
        )
        return
      }

      const tx = await ct.rename(metadata.id, charName, {
        value: fee,
      })
      const req = await tx.wait()
      setIsModalOpen(false)
      console.log(req)

      toast.success(<ToastContent title='Rename successful' />)
      window.location.reload()
    } catch (e) {
      toast.error(
        <ToastContent
          title='Rename Error'
          message='And unexpected error occurred when trying to rename'
        />,
      )
      console.log(e)
    }
  }

  // async function WL() {
  //   const chain = ChainId.Optimism
  //   switchNetwork?.(chain as any)

  //   const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  //   const signer = await provider.getSigner()
  //   const ct: any = new ethers.Contract(CHAIN_INFO[chain].address, ABI_ERC721, signer)

  //   await ct.whitelist_addresses(
  //     [
  //       CHAIN_INFO[ChainId.Base].ccipChainId,
  //       CHAIN_INFO[ChainId.Polygon].ccipChainId,
  //       CHAIN_INFO[ChainId.Arbitrum].ccipChainId,
  //       CHAIN_INFO[ChainId.BSC].ccipChainId,
  //       CHAIN_INFO[ChainId.Optimism].ccipChainId,
  //       CHAIN_INFO[ChainId.Avalanche].ccipChainId,
  //     ],
  //     [
  //       CHAIN_INFO[ChainId.Base].address,
  //       CHAIN_INFO[ChainId.Polygon].address,
  //       CHAIN_INFO[ChainId.Arbitrum].address,
  //       CHAIN_INFO[ChainId.BSC].address,
  //       CHAIN_INFO[ChainId.Optimism].address,
  //       CHAIN_INFO[ChainId.Avalanche].address,
  //     ],
  //   )
  // }

  const handleShowMoreClick = () => {
    setExpanded(!isExpanded)
  }
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value)
  }

  if (loading) {
    return (
      <Wrapper>
        <NavBar />
        <Loader />
        <Space />
        <Footer />
      </Wrapper>
    )
  } else if (isTraversing) {
    return (
      <Wrapper>
        <NavBar />
        <TraverseInProgress tx={traverseTx} />
        <Space />
        <Footer />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <NavBar />
      {/* {<button onClick={WL}>WL</button>} */}

      {metadata && (
        <div className='backgroundWrapper relative z-10'>
          <div className='container m-auto'>
            <div className='flex flex-row max-md:flex-col max-md:items-center justify-center items-center gap-5'>
              <div className='flex justify-center items-center gap-8 flex-wrap'>
                {metadata && (
                  <SelectedNftCard
                    bgColor={changeHexColorTransparency(
                      NFT_ATTRIBUTES.find(nftAttribute => nftAttribute.chainId === metadata.chainId)
                        ?.color || NFT_ATTRIBUTES[0].color,
                      0.4,
                    )}
                    borderColor={
                      NFT_ATTRIBUTES.find(nftAttribute => nftAttribute.chainId === metadata.chainId)
                        ?.color || NFT_ATTRIBUTES[0].color
                    }
                    nftImage={metadata.image}
                    nftName={metadata.name}
                    chainName={CHAIN_INFO[metadata.chainId as keyof typeof CHAIN_INFO].chainName}
                    metadataAttributes={metadata.attributes}
                  />
                )}
              </div>

              <Datacard className='flex flex-col max-md:!w-[90%] justify-center items-start gap-8 flex-wrap p-5'>
                <div className='w-full flex flex-row justify-between items-center'>
                  <h3 className='text-2xl flex flex-row items-center gap-3'>
                    <img
                      alt={selectedOption}
                      className='w-[25px]'
                      src={`/assets/imgs/chain/${selectedOption}.svg`}
                    />
                    <select
                      className='text-2xl bg-transparent'
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      {CHAIN_LIST.map(chainId => {
                        return (
                          <option className='text-black' key={chainId} value={chainId}>
                            {CHAIN_INFO[chainId].chainName}
                          </option>
                        )
                      })}
                    </select>
                  </h3>
                </div>

                <div className='flex flex-col justify-between w-full'>
                  <div className='flex flex-row justify-between w-full'>
                    <h3 className='text-xl'>To</h3>
                    <h3 className='text-xl'>Status</h3>
                  </div>

                  {CHAIN_LIST.filter(c => c != selectedOption).map((chainId, i) => {
                    return (
                      <div
                        key={i}
                        className='flex flex-row justify-between items-center w-full border-b border-slate-600 py-2'
                      >
                        <h3 className='text-md flex flex-row items-center gap-3'>
                          <img
                            alt=''
                            className='w-[25px]'
                            src={`/assets/imgs/chain/${chainId}.svg`}
                          />
                          {CHAIN_INFO[chainId].chainName}
                        </h3>
                        {metadata &&
                          (CCIP_CHANNELS[metadata.chainId as keyof object] as any).includes(
                            chainId,
                          ) && <h3 className='text-md text-[#88F495]'>Operational</h3>}
                        {metadata &&
                          !(CCIP_CHANNELS[metadata.chainId as keyof object] as any).includes(
                            chainId,
                          ) && <h3 className='text-md text-[#ff3939]'>Not Operational</h3>}
                      </div>
                    )
                  })}
                </div>
              </Datacard>
            </div>

            <div className='flex justify-center items-center gap-8 flex-wrap'>
              <Attributes>
                <div className='flex justify-center items-center gap-4 flex-wrap'>
                  {metadata &&
                    NFT_ATTRIBUTES.map((nftData: any) => (
                      <NftAttributeCard
                        key={nftData.title}
                        nftData={nftData}
                        active={metadata.chainId === nftData.chainId}
                        currentChainId={metadata.chainId}
                        metadataAttribute={metadata.attributes.find(
                          (m: any) => m.trait_type == nftData.title,
                        )}
                        nftName={metadata.name}
                        // onReroll={reroll}
                        onReroll={() => setIsModalOpen(true)}
                        onClickTraverse={onClickTraverse}
                        owner={metadata.owner}
                      />
                    ))}
                </div>
              </Attributes>
            </div>

            <ModalWrapper
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              style={{
                overlay: {
                  zIndex: 999,
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: '#0F0F0FA3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                content: {
                  background: 'linear-gradient(180deg, #0C4FB6 0%, #0C4FB600 190%)',
                  padding: '20px',
                  border: '4px solid #0C4FB6',
                  borderRadius: '8px',
                  width: '45%',
                  backdropFilter: 'blur(6px)',
                },
              }}
              className={'max-md:!w-[90%] max-md:h-[45%] max-md:overflow-scroll'}
            >
              <ModalHeader>
                {/* <h2 className='text-white text-2xl'>How would you like to reroll?</h2> */}
                {/* <h2 className='text-white text-2xl'>How would you like to reroll?</h2> */}
                {/* <p className='text-white text-sm'>Please select a randomness generation method.</p> */}
              </ModalHeader>

              {metadata && metadata.chainId != ChainId.Base && (
                <ModalBody>
                  <div className='flex flex-row justify-center w-full'>
                    <div className='w-[40%] max-md:w-full flex flex-col justify-end'>
                      {metadata.chainId === ChainId.Optimism ? (
                        <>
                          <DisabledModalButton onClick={() => emptyAction()}>
                            Use Chainlink VRF
                          </DisabledModalButton>
                          <DisabledVrfMessage>
                            Chainlink VRF is not currently available for Optimism
                          </DisabledVrfMessage>
                        </>
                      ) : (
                        <ModalButton onClick={() => rerollVRF()}>Use Chainlink VRF</ModalButton>
                      )}
                      <h2 className='text-white text-md font-bold mt-3'>Cost:</h2>
                      <p className='text-slate-200 text-xs font-thin'>
                        Chainlink VRF Fee (varies by chain)
                        <br />
                        Reroll Fee ($0.25 USD + gas)
                      </p>
                    </div>

                    <ModalDivider className='w-[1%] flex justify-center'></ModalDivider>

                    <div className='w-[40%] max-md:w-full flex flex-col justify-start'>
                      <ModalButton className='!mr-0 !px-1' onClick={() => reroll()}>
                        Use Material World Blockhash
                      </ModalButton>
                      <h2 className='text-white text-md font-bold mt-3'>Cost:</h2>
                      <p className='text-slate-200 text-xs font-thin'>
                        Reroll fee: $0.25 USD + Gas
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-row w-[82%] gap-[22px]'>
                    <ModalColumn expanded={isExpanded}>
                      {isExpanded ? (
                        ''
                      ) : (
                        <>
                          <h2 className='text-white text-md font-bold mt-3'>Info:</h2>
                          <p className='text-slate-200 text-xs font-thin'>
                            Chainlink VRF (Verifiable Random Function) is a provably fair and
                            verifiable random number generator. Chainlink VRF generates random
                            values and cryptographic proof of how those values were determined. The
                            proof is published and verified on-chain before any consuming
                            applications can use it. Learn more at https://chain.link/vrf
                          </p>
                        </>
                      )}
                    </ModalColumn>

                    <ModalColumn expanded={isExpanded}>
                      {isExpanded ? (
                        ''
                      ) : (
                        <>
                          <h2 className='text-white text-md font-bold mt-3'>Info:</h2>
                          <p className='text-slate-200 text-xs font-thin'>
                            Our randomness model involves using a combination of blockchain
                            parameters to produce a hash-based random number. Specifically, this
                            model calculates the random number using the formula: uint256
                            _randomWord = (block.timestamp + block.difficulty + block.number +
                            block.gaslimit) % 200_000 + 1;. This approach leverages the inherent
                            unpredictability of blockchain elements like block timestamp,
                            difficulty, number, and gas limit to generate a pseudo-random output.
                            This output is then utilized to re-roll the metadata of an NFT, ensuring
                            an unpredictable set of attributes. This method combines several
                            properties of the current blockchain block: block.timestamp: The
                            timestamp when the block was mined. block.difficulty: A measure of how
                            difficult it was to mine the block. block.number: The blocks height in
                            the blockchain. block.gaslimit: The maximum amount of gas that can be
                            used in the block. These values are summed up and then modulo (%)
                            200,000 is applied, resulting in a number between 0 and 199,999.
                            Finally, 1 is added, giving a range of 1 to 200,000. This approach
                            provides a form of randomness derived from the blockchains inherent
                            properties
                          </p>
                        </>
                      )}
                    </ModalColumn>
                  </div>

                  <div className='flex w-full justify-end'>
                    <ShowMoreButton1 onClick={handleShowMoreClick}>
                      {isExpanded ? (
                        <div className='flex flex-row items-center gap-2'>
                          <p>Show More</p>
                          <FaSortDown />
                        </div>
                      ) : (
                        <div className='flex flex-row items-center gap-2'>
                          <p>Show Less</p>
                          <FaSortUp />
                        </div>
                      )}
                    </ShowMoreButton1>
                  </div>
                </ModalBody>
              )}

              {metadata && metadata.chainId == ChainId.Base && (
                <ModalBody>
                  <div className='flex flex-row justify-center w-full'>
                    <div className='w-[40%] max-md:w-full flex flex-col justify-start'>
                      <input
                        id='nameInput'
                        placeholder='Enter new name'
                        className='w-full rounded mb-3 p-2 text-center'
                      />
                      <ModalButton className='w-full' onClick={() => rerollName()}>
                        Change Name
                      </ModalButton>
                      <h2 className='text-white text-md font-bold mt-3'>Cost:</h2>
                      <p className='text-slate-200 text-xs font-thin'>
                        Reroll fee: $0.25 USD + Gas
                      </p>
                    </div>
                  </div>
                </ModalBody>
              )}
            </ModalWrapper>

            <TableContainer className='flex flex-col gap-3 p-8 !mt-[100px] text-left overflow-x-auto'>
              <table border={1} cellPadding={10}>
                <thead>
                  <tr className='header-row'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Character</th>
                    <th>House</th>
                    <th>Boat</th>
                    <th>Vehicle</th>
                    <th>Aircraft</th>
                    {/* <th>ActiveChain</th> */}
                    <th>Traversals</th>
                    <th>Type</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length > 0 &&
                    history.map((log: any, index: number) => {
                      const date = new Date(log.time)

                      return (
                        <tr key={index}>
                          <td>{log.id}</td>
                          <td>{log.stats.name}</td>
                          <td>
                            {log.stats.character == 0
                              ? '-'
                              : ItemNames.Character[log.stats.character]}
                          </td>
                          <td>{log.stats.house == 0 ? '-' : ItemNames.House[log.stats.house]}</td>
                          <td>{log.stats.boat == 0 ? '-' : ItemNames.Boat[log.stats.boat]}</td>
                          <td>
                            {log.stats.vehicle == 0 ? '-' : ItemNames.Vehicle[log.stats.vehicle]}
                          </td>
                          <td>
                            {log.stats.aircraft == 0 ? '-' : ItemNames.Aircraft[log.stats.aircraft]}
                          </td>
                          <td>{log.stats.traversals}</td>
                          <td>
                            {log.log_type.includes('Traverse') && (
                              <div className='flex items-center gap-[10px]'>
                                <img
                                  alt=''
                                  className='w-[16px] inline'
                                  src={`/assets/imgs/chain/${log.loggedOn}.svg`}
                                />
                                <FaArrowRight />
                                <img
                                  alt=''
                                  className='w-[16px] inline'
                                  src={`/assets/imgs/chain/${
                                    ChainId[log.stats.active_chain as keyof typeof ChainId]
                                  }.svg`}
                                />
                              </div>
                            )}
                            {log.log_type.includes('Reroll') && (
                              <>
                                <small className='opacity-60'>Rolled</small>
                                {metadata && (
                                  <img
                                    alt=''
                                    className='h-[30px] inline-block ml-2'
                                    src={`/assets/layers/${
                                      log.log_type.split('Reroll ')[1] +
                                      '/' +
                                      log.log_type.split('Reroll ')[1] +
                                      ' ' +
                                      log.stats[log.log_type.split('Reroll ')[1].toLowerCase()]
                                    }.png`}
                                  />
                                )}
                              </>
                            )}
                            {log.log_type.includes('Rename') && (
                              <small className='opacity-60'>Rename</small>
                            )}
                          </td>
                          <td>{date.toLocaleString()}</td>
                        </tr>
                      )
                    })}
                  {history.length == 0 && (
                    <tr>
                      <td colSpan={10}>
                        <p className='text-center'>No activity recorded</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </TableContainer>
            <Space />

            <Footer />

            <ReactToolTip
              anchorSelect='locationIcon'
              place='top'
              variant='info'
              content='The NFT is currently on this chain'
            />
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default SingleNFT
