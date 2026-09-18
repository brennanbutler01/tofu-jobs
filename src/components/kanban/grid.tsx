import { createStyles, Flex } from '@mantine/core'
import { JobList } from '@/models/jobList'
import KanbanGridColumn from '@/components/kanban/column'
import { useMemo } from 'react'

const styles = createStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '2rem',
    width: '100%',
    overflowX: 'scroll',
  },
}))

interface Props {
  columns: JobList[]
}

const KanbanGrid = ({ columns }: Props) => {
  const { classes } = styles()
  const kanbanColumns = useMemo(
    () => columns.map(col => <KanbanGridColumn key={col.id} jobList={col} />),
    [columns]
  )
  return (
    <Flex className={classes.root}>
      <>{kanbanColumns}</>
    </Flex>
  )
}
export default KanbanGrid
