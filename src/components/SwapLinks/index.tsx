import styled from 'styled-components'
import { SWAP_URLS } from '@constants'

const Wrapper = styled.div`
  text-align: center;
  padding: 0.5rem;
  color: white;
  .info {
    font-size: 1.5rem;
  }
  .swap-link {
    cursor: pointer;
    color: #c7ffcd;
    &:hover {
      color: rgba(136, 244, 149, 1);
    }
  }
  .disclaimer {
    font-size: 0%.75rem;
    margin-top: 1rem;
  }
`

export const SwapLinks = () => {
  return (
    <Wrapper>
      <p className='info'>
        You can use swaps to get the native tokens you need. Some options include{' '}
        {SWAP_URLS.map((swapUrl, index) =>
          index < SWAP_URLS.length - 1 ? (
            <span key={swapUrl.name}>
              <a
                className='swap-link'
                target='_blank'
                rel='noopener noreferrer '
                href={swapUrl.url}
              >
                {swapUrl.name}
              </a>
              ,{' '}
            </span>
          ) : (
            <span key={swapUrl.name}>
              <a
                className='swap-link'
                target='_blank'
                rel='noopener noreferrer '
                href={swapUrl.url}
              >
                {swapUrl.name}
              </a>
              .
            </span>
          ),
        )}
      </p>
      <p className='disclaimer'>
        *Material World has no affiliation with any of the linked swap sites, nor do we receive
        referral fees
      </p>
    </Wrapper>
  )
}
