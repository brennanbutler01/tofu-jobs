import { Card, Flex, Stack, Text } from '@mantine/core'
import { Job } from '@/models'
import JobActions from '@/components/jobs/jobActions'
import { useCompanySWR } from '@/services/companies'
import CompanyBadge from '@/components/kanban/companyBadge'
import { useMemo } from 'react'

interface Props {
  job: Job
  isDragging: boolean
}

const JobCard = ({ job, isDragging }: Props) => {
  const { companies } = useCompanySWR()
  const company = useMemo(
    () => (companies || [])?.find(company => company.id === job.companyId),
    [job.companyId, companies]
  )

  return (
    <Card
      p={'lg'}
      radius={'sm'}
      shadow={'sm'}
      mih={'120px'}
      withBorder
      sx={theme => ({
        backgroundColor: isDragging
          ? theme.colors.violet[0]
          : theme.colors.gray[0],
      })}
    >
      <Card.Section withBorder inheritPadding p={'sm'}>
        <Stack>
          {company ? (
            <Flex justify={'end'}>
              <CompanyBadge company={company} />
            </Flex>
          ) : null}
          <Stack>
            <Text>{job.title}</Text>
            <Text c={'dimmed'}>{job.location}</Text>
          </Stack>
        </Stack>
      </Card.Section>
      <Card.Section withBorder inheritPadding p={'sm'}>
        <JobActions job={job} />
      </Card.Section>
    </Card>
  )
}
export default JobCard
