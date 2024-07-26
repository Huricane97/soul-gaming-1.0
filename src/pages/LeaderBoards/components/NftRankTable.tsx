import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { NftData } from '@types'

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: #000000;
  border: none;
  padding: 1rem 1.5rem;
  width: 100%;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  @media (max-width: 600px) {
    padding: 0;
  }
  table {
    border-collapse: separate;
    border-spacing: 0 0.75rem;
  }
  tr {
    background-color: rgba(255, 255, 255, 0.11);
    border-bottom: 8px solid transparent;
    th {
      font-weight: 400;
      background-color: transparent;
      padding: 0.125rem 1rem;
      text-align: center;
    }
    td {
      padding: 1rem 1rem;
      text-align: center;
      @media (max-width: 600px) {
        padding: 0.125rem 0 0.125rem 0.25rem;
      }
    }
  }
  .header-row {
    background-color: transparent;
  }
  .nft-name {
    padding-left: 3rem;
    text-align: left;
    @media (max-width: 800px) {
      padding-left: 0.75rem;
    }
  }
  .link-row {
    cursor: pointer;
    transition: all ease 0.3s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`

type RarityTableProps = {
  tableData: NftData[]
}
export const NftRankTable = ({ tableData }: RarityTableProps) => {
  const [topFifty] = useState<NftData[]>(tableData.length > 50 ? tableData.slice(0, 50) : tableData)
  const navigate = useNavigate()
  const onClickRow = (id: string) => {
    navigate(`/nftListing/${id}`)
  }
  return (
    <TableContainer>
      <table>
        <thead>
          <tr className='header-row'>
            <th>Rank</th>
            <th className='nft-name'>Name</th>
            <th>Wealth Score</th>
            <th>Transfers</th>
          </tr>
        </thead>
        <tbody>
          {topFifty.length &&
            topFifty.map((item, index) => (
              <tr className='link-row' key={item.name} onClick={() => onClickRow(item.id)}>
                <td>
                  <p>{`#${index + 1}`}</p>
                </td>
                <td className='nft-name'>{`${item.name} #${item.id}`}</td>
                <td>{item.attributes[7].value}</td>
                <td>{item.attributes[6].value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </TableContainer>
  )
}
