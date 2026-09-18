import { useMemo, useState } from 'react'
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table'
import { Company } from '@/models'
import { remove, useCompanySWR } from '@/services/companies'
import { Box, Button, Group, ScrollArea, Text } from '@mantine/core'
import CreateCompany from '@/components/companies/create'
import DeleteButton from '@/components/deleteButton'
import { useAppAuth as useAuth0 } from '@/useAppAuth'
import { useSWRConfig } from 'swr'
import useCrudNotification from '@/useCrudNotification'
import {
  IconCheck,
  IconExclamationCircle,
  IconLoader,
} from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import CompanyForm from '@/components/companies/form'
import FormDrawer from '@/components/formDrawer'
import { DeleteException } from '@/exceptions/delete-exception'

const notificationConfig = {
  id: 'delete-company',
  loading: {
    title: 'Deleting company',
    message: 'This should just take a few' + ' moments',
    icon: <IconLoader />,
  },
  error: {
    title: 'Error deleting company',
    message: 'Try again...',
    icon: <IconExclamationCircle />,
  },
  success: {
    title: 'Delete company!',
    message: 'Company successfully deleted',
    icon: <IconCheck />,
  },
}
const CompanyTable = () => {
  const columns = useMemo<MRT_ColumnDef<Company>[]>(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'name',
      },
      {
        accessorKey: 'location',
        header: 'location',
      },
      {
        accessorKey: 'website', //normal accessorKey
        header: 'website',
      },
      {
        accessorKey: 'industry',
        header: 'industry',
      },
    ],
    []
  )
  const { companies, isLoading } = useCompanySWR()

  const [loading, setLoading] = useState(false)
  const { getAccessTokenSilently } = useAuth0()
  const { mutate } = useSWRConfig()
  const showNotification = useCrudNotification(notificationConfig)
  const [opened, { toggle }] = useDisclosure()
  const [editingRecord, setEditingRecord] = useState<Company>()

  const startEditing = (record: Company) => {
    setEditingRecord(record)
    toggle()
  }

  const cancelEditing = () => {
    setEditingRecord(undefined)
    toggle()
  }

  return (
    <ScrollArea h={'80vh'}>
      <MantineReactTable
        state={{
          isLoading: isLoading || loading,
          columnVisibility: { industry: false },
        }}
        columns={columns}
        data={companies || []}
        displayColumnDefOptions={{ 'mrt-row-actions': { size: 300 } }} //change width of actions column to 300px
        positionActionsColumn={'last'}
        enableRowActions
        enableStickyHeader
        renderTopToolbar={
          <Group p={'sm'}>
            <CreateCompany />
          </Group>
        }
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              gridTemplateColumns: '1fr 1fr',
              width: '100%',
            }}
          >
            <Text>{row.original.description}</Text>
            <Text>{row.original.industry}</Text>
          </Box>
        )}
        renderRowActions={({ row }) => (
          <Button.Group>
            <Button
              variant={'subtle'}
              size={'sm'}
              compact
              mx={'sm'}
              onClick={() => startEditing(row.original)}
            >
              edit
            </Button>
            <DeleteButton
              model={'Company'}
              color={'red'}
              variant={'subtle'}
              size={'sm'}
              compact
              mx={'sm'}
              handleDelete={async () => {
                setLoading(true)
                const token = await getAccessTokenSilently()
                await showNotification({
                  crudOperation: async () =>
                    await remove(row.original.id, token).then(res => {
                      if ('status' in res) {
                        throw new DeleteException(res)
                      }
                    }),
                })
                await mutate(() => true)

                setLoading(false)
              }}
            />
          </Button.Group>
        )}
      />
      <FormDrawer
        model={'company'}
        form={'company-form'}
        opened={opened}
        onClose={cancelEditing}
        editing
      >
        <CompanyForm editingRecord={editingRecord} />
      </FormDrawer>
    </ScrollArea>
  )
}
export default CompanyTable
