import styled from 'styled-components'
import { AttributeColor } from '@constants'
import { ItemRarityList } from '../types'
import { changeHexColorTransparency } from '@utils'

interface TableProps {
  $bgColor: string
}

const TableContainer = styled.div<TableProps>`
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: ${({ $bgColor }) => changeHexColorTransparency($bgColor, 0.52)};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 3px solid ${({ $bgColor }) => $bgColor};
  padding: 1rem 1.5rem;
  width: 80%;
  color: #ffffff;
  font-size: 24px;
  table {
    border-collapse: separate;
    border-spacing: 0 5px;
  }
  tr {
    background-color: rgba(255, 255, 255, 0.11);
    border-bottom: 8px solid transparent;
    th {
      background-color: transparent;
      padding: 0.5rem;
    }
    td {
      padding: 0.5rem;
    }
  }
  .header-row {
    background-color: transparent;
    .name-header {
      text-align: center;
      column-span: 2;
    }
  }
  .item-image {
    margin: auto;
    max-width: 48px;
  }
`

type ColorProp = AttributeColor

type RarityTableProps = {
  tableData: ItemRarityList[]
  bgColor: ColorProp
}
export const RarityTable = ({ tableData, bgColor }: RarityTableProps) => {
  return (
    <TableContainer $bgColor={bgColor}>
      <table>
        <thead>
          <tr className='header-row'>
            <th className='name-header' colSpan={2}>
              Name
            </th>
            <th>Rarity</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length &&
            tableData.map(item => (
              <tr key={item.name}>
                <td>
                  <img className='item-image' alt={item.name} src={item.image} />
                </td>
                <td>{item.name}</td>
                <td>{item.rarity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </TableContainer>
  )
}
