import styled from 'styled-components'
import '../style.css'
import { useState } from 'react'

const Wrapper = styled.div`
  position: relative;

  .contentWrapper {
    position: relative;
    margin: auto;
    margin-top: 100px;
    gap: 10rem;

    .titleCaption1 {
      font-style: normal;
      font-weight: 500;
      font-size: 64px;
      text-align: left;
      color: white;
      // text-shadow: 6px 6px 4px rgba(0, 0, 0, 0.4);
      width: 40%;
    }
  }
  .faq-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-size: 24px;
    font-weight: 700;
  }
  // hr{
  //     height: 1px;
  //     color: inherit;
  //     border-bottom: 1px solid white;
  //     color: white !important;
  //     width: 50%;
  // }
  .itemsWrapper {
    gap: 210px;

    @media (max-width: 1280px) {
      gap: 150px;
    }

    @media (max-width: 1024px) {
      gap: 70px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`

export const Faq = () => {
  const faqItems = [
    {
      question: 'What is Chainlink CCIP?',
      answer:
        'CCIP allows for trustless communication between different blockchain networks, taking advantage of Chainlinks industry-leading decentralized oracle network (DON) to ensure the validity and secure delivery of messages across chains.',
    },
    {
      question: 'How do I mint?',
      answer:
        'Once the mint is live, you will need to connect a wallet that holds Base Ethereum (for example, Metamask). Once your wallet is connected you can enter a name for your NFT character then click mint. Approve the mint transaction that will cost $5 worth BASE-ETH + gas fees.',
    },
    {
      question: 'What do I do after I mint my NFT?',
      answer:
        'Now’s the fun part! What you minted is just a blank named plot of land. You can move (transfer) your NFT to another chain and claim new assets (a house, vehicle, boat, etc). The first asset you claim on each chain is free!',
    },
    {
      question: 'How do I move (transfer) my NFT to another chain?',
      answer:
        'Go to the NFTs page of the Material World website, and connect your wallet that has your NFT. Select the NFT you’d like to move to another chain. You will see all of the available chains and a button to transfer.',
    },
    {
      question: 'How much does it cost to move my NFT to another chain?',
      answer:
        'The transfer fee varies since it is dependent on the destination chain’s gas. You can expect fees ranging from a few cents to a few dollars (if moving to Ethereum). You will have to pay these fees in the source chain’s token.',
    },
    {
      question: 'How do I reroll for a new asset?',
      answer: (
        <div>
          You will first need to be on the appropriate chain to reroll an asset.
          <br />
          - Name: Base
          <br />
          - House: Arbitrum
          <br />
          - Vehicle: Binance Smart Chain
          <br />
          - Boat: Polygon
          <br />
          - Aircraft: Avalanche
          <br />
          - Clothing: Optimism
          <br />
          Once you’re on the correct chain, go to the NFTs page of the Material World website,
          select the NFT you’d like to reroll an asset on, then click Reroll.
          <br />
          You will need to pay $0.25 usd in source chain gas token in order to re-roll that chain’s
          possession.
        </div>
      ),
    },
  ]

  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index: any) => {
    if (openIndex === index) {
      setOpenIndex(null) // Close the currently open FAQ item
    } else {
      setOpenIndex(index) // Open the clicked FAQ item
    }
  }
  return (
    <Wrapper className='w-full relative mt-[250px]'>
      <div className='w-full relative mb-[0px]'>
        <div className='contentWrapper w-full flex flex-col justify-center items-center container pb-40'>
          <div className='row flex w-[80%] items-center'>
            <div className='col-lg-6 w-[100%]'>
              <div className='flex flex-col flex-wrap items-center gap-3'>
                <h1 className='titleCaption1 !text-center w-[40%]'>FAQ</h1>

                <div className='flex flex-col gap-4 w-full'>
                  {faqItems.map((item, index) => (
                    <div key={index} className='faq-item'>
                      <p
                        className='text-white text-center w-[60%] cursor-pointer'
                        onClick={() => toggleFAQ(index)}
                      >
                        {item.question}
                      </p>
                      {openIndex === index && (
                        <div className='text-gray-400 text-xl text-center w-[60%]'>
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default Faq
