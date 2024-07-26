import { useState } from "react";
import styled from "styled-components";
// import axios from 'axios'
import { useWeb3Modal } from "@web3modal/react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { ABI_ERC721 } from "@configs";
import { ChainId } from "@constants";
import { ToastContent } from "../ToastContent";
import { changeHexColorTransparency } from "@utils";
import { Spinner } from "../Spinner";
// import { SwapLinks } from '../SwapLinks'
// import { MintImageExample } from './images'
// import { removeDuplicates } from '@pages/LeaderBoards/utils'

const Wrapper = styled.div`
  position: relative;

  .contentWrapper {
    position: relative;
    margin: auto;
    margin-top: 100px;
    gap: 10rem;

    .mint-input {
      border: 3px solid #abb9c5;
      &:hover,
      &:focus {
        border: 3px solid #88f495;
      }
    }
    .mint-input-error {
      border: 3px solid red;
      &:hover,
      &:focus {
        border: 3px solid red;
      }
    }
    .titleCaption {
      line-height: 1;
      font-style: normal;
      font-weight: 500;
      font-size: 34px;
      text-align: left;
      color: white;
      // text-shadow: 6px 6px 4px rgba(0, 0, 0, 0.4);
      width: 40%;
    }
    .mintBtn {
      font-size: 24px;
      font-weight: 700;
      color: #293462;
      min-height: 56px;
      opacity: 1;
      background: #88f495;
      padding: 5px 40px;
      transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);

      &:hover {
        background: ${changeHexColorTransparency("#88f495", 0.85)};
        color: black;
      }
      &:disabled {
        background: ${changeHexColorTransparency("#88f495", 0.85)};
        color: black;
      }
    }
    .mint-image {
      object-fit: contain;
      width: 100%;
    }
  }
`;

export const Mint = () => {
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const [mintInProgress, setMintInProgress] = useState(false);
  // const [mintCount, setMintCount] = useState(0)

  // useEffect(() => {
  //   ;(async () => {
  //     const url = `${SERVER_URL}/api/leaderboard`
  //     const resp = await axios.get(url)

  //     // setMintCount(data.data.length)
  //     // setMintCount(removeDuplicates(resp.data.data).length)
  //   })()
  // }, [])

  const handleMint = async () => {
    if (!address) {
      await open();
    }

    if (chain?.id != (ChainId.Polygon as any)) {
      switchNetwork?.(ChainId.Polygon as any);
      setMintInProgress(false);
      return;
    }

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const tokenContract: any = new ethers.Contract(
      "0xe9b363D68ee45d89170BC6eD230F4E735b41Cec0",
      ABI_ERC721,
      signer
    );

    try {
      const balance = await tokenContract.balanceOf(address);
      if (balance.gt(0)) {
        toast.error(
          <ToastContent
            title="Mint failed"
            message="You already own an NFT"
          />
        );
        setMintInProgress(false);
        return;
      }

      const tx = await tokenContract.mint();
      const req = await tx.wait();
      setMintInProgress(false);
      toast.success(<ToastContent title="Mint Successful" />);
      console.log(req);
    } catch (e) {
      console.log(e);
      toast.error(
        <ToastContent
          title="Mint failed"
          message="Error while minting, check balance"
        />
      );
      setMintInProgress(false);
    }
  };

  return (
    <Wrapper className="w-full relative">
      <div className="w-full relative flex flex-wrap content-center">
        <div className="contentWrapper w-full max-md:!w-full flex flex-col justify-center items-center container bg-[#fff] rounded">
          <div className="row flex w-[80%]  max-md:w-full max-[1200px]:flex-col align-items-center">
            <div className="col-lg-6 w-[100%]">
              <div className=" mt-[3rem] flex flex-col items-center justify-between gap-3">
                <h1 className="titleCaption !text-center !w-[60%] text-md">
                  MINT YOUR NFT
                </h1>

                <div className="flex flex-col w-50 items-center">
                  <button
                    disabled={mintInProgress}
                    className="mintBtn w-[100%] rounded"
                    onClick={handleMint}
                  >
                    {mintInProgress ? <Spinner /> : "Mint"}
                  </button>

                  {/* <p className='mt-5 text-black text-sm text-center'>{mintCount} / 10,000</p> */}
                </div>
                {/* <SwapLinks /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Mint;
