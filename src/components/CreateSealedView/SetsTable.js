import React from 'react'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'

import SetsTableRow from './SetsTableRow'
import SetsTableHeader from './SetsTableHeader'
import SubHeader from './SubHeader'

import { getSealedWorthy, groupSets } from '../Common/utils'

const SetsTable = React.memo(function SetsTable({ setsData, handleAddButtonClick }) {
  const sealedSets = getSealedWorthy(setsData)
  const setGroups = groupSets(sealedSets, 'set_type')

  return (
    <div>
      <Table size='small'>
        <SetsTableHeader />
        <TableBody>
          <SubHeader title={'Core Sets'} type='primary' />
          {setGroups.core.map((set) => (
            <SetsTableRow key={set.id} set={set} handleAddButtonClick={handleAddButtonClick} />
          ))}
          <SubHeader title={'Expansions'} type='primary' />
          {setGroups.expansion.map((set) => (
            <SetsTableRow key={set.id} set={set} handleAddButtonClick={handleAddButtonClick} />
          ))}
          <SubHeader title={'Commander'} type='primary' />
          {setGroups.commander.map((set) => (
            <SetsTableRow key={set.id} set={set} handleAddButtonClick={handleAddButtonClick} />
          ))}
          <SubHeader title={'Masters'} type='primary' />
          {setGroups.masters.map((set) => (
            <SetsTableRow key={set.id} set={set} handleAddButtonClick={handleAddButtonClick} />
          ))}
          <SubHeader title={'Planechase'} type='primary' />
          {setGroups.planechase.map((set) => (
            <SetsTableRow key={set.id} set={set} handleAddButtonClick={handleAddButtonClick} />
          ))}
          <SubHeader title={'Draft Innovations'} type='primary' />
          {setGroups.draft_innovation.map((set) => (
            <SetsTableRow key={set.id} set={set} handleAddButtonClick={handleAddButtonClick} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
})

export default SetsTable
