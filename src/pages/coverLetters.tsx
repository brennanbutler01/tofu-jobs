import { Anchor, Container, Stack, Title } from '@mantine/core'
import CreateButton from '@/components/createButton'
import CoverLetterForm from '@/components/coverLetters/form'
import LayoutWithProviders from '@/components/layout/layoutWithProviders'
import RecordList from '@/components/recordList'
import { useCoverLetterSWR, remove } from '@/services/coverLetters'

const CoverLettersPage = () => {
  const { coverLetters, isLoading, isError } = useCoverLetterSWR()
  return (
    <LayoutWithProviders>
      <Container>
        <Stack>
          <Title>Your cover letters</Title>
          <CreateButton
            model='Cover Letter'
            drawerChildren={<CoverLetterForm />}
            form='coverLetter-form'
          />
          <RecordList
            records={coverLetters}
            loading={isLoading}
            failed={isError}
            model='Cover Letter'
            form='coverLetter-form'
            remove={remove}
            editor={record => <CoverLetterForm editingRecord={record} />}
            details={record => (
              <Anchor
                href={record.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                Open document
              </Anchor>
            )}
          />
        </Stack>
      </Container>
    </LayoutWithProviders>
  )
}
export default CoverLettersPage
