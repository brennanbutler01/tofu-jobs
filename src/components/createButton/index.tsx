import React from 'react'
import { Button, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import FormDrawer, { FormDrawerProps } from '@/components/formDrawer'

interface Props
  extends Omit<FormDrawerProps, 'opened' | 'onClose' | 'children'> {
  model: string
  drawerChildren: React.ReactNode
}

const CreateButton = ({ model, drawerChildren, ...rest }: Props) => {
  const [opened, { toggle }] = useDisclosure()
  const theme = useMantineTheme()
  return (
    <>
      <Button
        onClick={toggle}
        color={opened ? 'red' : theme.primaryColor}
        variant={'light'}
      >
        {opened ? 'Hide form' : `Create ${model}`}
      </Button>
      <FormDrawer model={model} opened={opened} onClose={toggle} {...rest}>
        {drawerChildren}
      </FormDrawer>
    </>
  )
}

export default CreateButton
