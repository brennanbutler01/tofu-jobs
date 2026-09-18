import { Card } from '@mantine/core'
import ColumnHead from '@/components/kanban/columnHead'
import { JobList } from '@/models/jobList'
import { Kanban } from '@/components'

interface Props {
  jobList: JobList
}

const COLUMN_WIDTH = '300px'
const KanbanGridColumn = ({ jobList }: Props) => {
  return (
    <Card sx={{ minWidth: COLUMN_WIDTH, width: COLUMN_WIDTH }} withBorder>
      <Card.Section inheritPadding p={'lg'} withBorder>
        <ColumnHead jobList={jobList} />
      </Card.Section>
      <Card.Section
        inheritPadding
        style={{ overflowY: 'scroll', height: '100%' }}
      >
        <Kanban.JobGrid listJobs={jobList.jobs} jobList={jobList} />
      </Card.Section>
    </Card>
  )
}
export default KanbanGridColumn
