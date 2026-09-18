import { Grid, Text, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { JobList } from '@/models/jobList'
import { Kanban } from '@/components'
import CreateButton from '@/components/createButton'
import JobForm from '@/components/jobs/form'
import {
  IconApps,
  IconEyeglass,
  IconHandStop,
  IconMailbox,
  IconPhoneCall,
  IconProgress,
  IconStar,
} from '@tabler/icons-react'
import { DefaultJobLists } from '@/models/defaultJobLists'

interface Props {
  jobList: JobList
}

const defaultJobListIcons = (defaultList: DefaultJobLists) => {
  switch (defaultList) {
    case DefaultJobLists.APPLIED:
      return <IconApps />
    case DefaultJobLists.IN_PROGRESS:
      return <IconProgress />
    case DefaultJobLists.INTERVIEW:
      return <IconPhoneCall />
    case DefaultJobLists.REJECTED:
      return <IconHandStop />
    case DefaultJobLists.WISHLIST:
      return <IconEyeglass />
    case DefaultJobLists.OFFER:
      return <IconMailbox />
  }
}

const ColumnHead = ({ jobList }: Props) => {
  const [editing, { toggle }] = useDisclosure()
  const [titleValue, setTitleValue] = useState(jobList.title)
  console.log('job list', jobList)
  return (
    <Grid p={'md'} justify={'center'} align={'center'} gutter={'lg'}>
      <Grid.Col span={12}>
        <Grid align={'center'} justify={'space-between'}>
          <Grid.Col span={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            {jobList.isUserCreated || !jobList?.defaultJobLists ? (
              <IconStar />
            ) : (
              defaultJobListIcons(jobList?.defaultJobLists)
            )}
          </Grid.Col>
          <Grid.Col span={jobList.isUserCreated ? 6 : 9}>
            {editing ? (
              <TextInput
                value={titleValue}
                onChange={e => setTitleValue(e.target.value)}
              />
            ) : (
              <Text fw={700} align={'center'} truncate>
                {jobList.title}
              </Text>
            )}
          </Grid.Col>
          {jobList.isUserCreated ? (
            <Grid.Col
              span={jobList.isUserCreated ? 3 : 0}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              {editing ? (
                <Kanban.EditColumnActions
                  toggle={toggle}
                  jobList={jobList}
                  title={titleValue}
                  setTitle={setTitleValue}
                />
              ) : (
                <Kanban.ColumnActionMenu toggle={toggle} jobList={jobList} />
              )}
            </Grid.Col>
          ) : null}
        </Grid>
      </Grid.Col>
      <Grid.Col span={12}>
        <CreateButton
          model={'job'}
          drawerChildren={<JobForm jobList={jobList} />}
          form={'job-form'}
        />
      </Grid.Col>
    </Grid>
  )
}

export default ColumnHead
