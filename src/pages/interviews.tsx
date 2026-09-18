import { Calendar, dayjsLocalizer, Event } from 'react-big-calendar'
import dayjs from '@/dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Container, Group, Title } from '@mantine/core'
import CreateButton from '@/components/createButton'
import InterviewForm from '@/components/interviews/form'
import FormDrawer from '@/components/formDrawer'
import { useCallback, useMemo, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useInterviewSWR } from '@/services/interviews'
import { useJobSWR } from '@/services/jobs'
import { useCompanySWR } from '@/services/companies'
import { Interview } from '@/models'
import LayoutWithProviders from '@/components/layout/layoutWithProviders'

const localizer = dayjsLocalizer(dayjs)
const InterviewsPage = () => {
  const [opened, { toggle }] = useDisclosure()
  const [start, setStart] = useState<Date>()
  const [end, setEnd] = useState<Date>()
  const [viewing, setViewing] = useState<Interview>()
  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setStart(start)
      setEnd(end)
      toggle()
    },
    [toggle, setStart, setEnd]
  )
  const { interviews } = useInterviewSWR()
  const { jobs } = useJobSWR()
  const { companies } = useCompanySWR()

  const interviewEvents = useMemo(() => {
    return (interviews || [])?.map(interview => {
      const job = jobs?.find(job => job.id === interview.jobId)
      const company = companies?.find(company => company.id === job?.companyId)
      return {
        start: dayjs(interview.start).toDate(),
        end: dayjs(interview.end).toDate(),
        title: `Company: ${company?.name} Job: ${job?.title}, Round: ${interview.round}`,
        id: interview.id,
      }
    })
  }, [companies, interviews, jobs])

  return (
    <LayoutWithProviders>
      <Group>
        <Title>Your Interviews</Title>
        <CreateButton
          form={'interview-form'}
          editing={false}
          model={'Interview'}
          drawerChildren={<InterviewForm />}
        />
      </Group>
      <Container p={'lg'}>
        <Calendar<Event & { id: number }>
          localizer={localizer}
          events={interviewEvents}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500, width: '100%' }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={event => {
            setViewing(
              (interviews || [])?.find(interview => interview.id === event.id)
            )
            toggle()
          }}
          selectable
        />
        <FormDrawer
          editing={true}
          form={'interview-form'}
          model={'Interview'}
          opened={opened}
          onClose={() => {
            toggle()
            setViewing(undefined)
          }}
        >
          <InterviewForm
            selectedSlot={{ start, end }}
            editingRecord={viewing}
          />
        </FormDrawer>
      </Container>
    </LayoutWithProviders>
  )
}
export default InterviewsPage
