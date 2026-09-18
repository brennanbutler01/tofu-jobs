import { Button, Drawer, Group } from '@mantine/core'
import React from 'react'

export interface FormDrawerProps {
  opened: boolean
  onClose: () => void
  children: React.ReactNode
  editing?: boolean
  model: string
  form: string
}

const FormDrawer = ({
  opened,
  onClose,
  children,
  model,
  form,
  editing = false,
}: FormDrawerProps) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position={'right'}
      title={`${editing ? 'Edit' : 'Create'} ${model}`}
      closeButtonProps={{
        title: `Close ${editing ? 'edit' : 'create'} ${model} drawer`,
      }}
    >
      {children}
      <Group
        position={'right'}
        sx={theme => ({
          borderTop: `1px solid ${theme.colors.gray[3]}`,
          marginTop: theme.spacing.sm,
          paddingTop: theme.spacing.sm,
        })}
      >
        <Button type={'submit'} variant={'light'} form={form}>
          Submit
        </Button>
      </Group>
    </Drawer>
  )
}

export default FormDrawer
