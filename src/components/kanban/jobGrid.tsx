import { SimpleGrid, useMantineTheme } from '@mantine/core'
import { Job } from '@/models'
import { JobList } from '@/models/jobList'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Kanban } from '@/components'

interface Props {
  listJobs: Job[]
  jobList: JobList
}

const JobGrid = ({ listJobs, jobList }: Props) => {
  const theme = useMantineTheme()

  return (
    <SimpleGrid cols={1} p={'lg'}>
      <Droppable droppableId={jobList.id.toString()}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver
                  ? theme.colors.gray[1]
                  : theme.colors.gray[0],
                padding: 4,
                minHeight: 500,
              }}
            >
              {listJobs.map((job, index) => {
                return (
                  <Draggable
                    key={job.id}
                    draggableId={job.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            minHeight: '50px',
                            ...provided.draggableProps.style,
                            padding: theme.spacing.md,
                          }}
                        >
                          <Kanban.JobCard
                            job={job}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )
                    }}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </SimpleGrid>
  )
}
export default JobGrid
