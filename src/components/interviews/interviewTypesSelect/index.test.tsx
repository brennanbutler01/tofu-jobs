import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import InterviewTypesSelect from './index'
import { InterviewTypesMap } from '@/models'

it('displays a numeric selection and returns numeric values after choosing an option', async () => {
  const onChange = vi.fn()
  render(
    <MantineProvider>
      <InterviewTypesSelect inputProps={{ value: 0, onChange }} />
    </MantineProvider>
  )
  const input = screen.getByLabelText('Interview Types')
  expect(input).toHaveValue(Object.values(InterviewTypesMap)[0])
  await userEvent.click(input)
  await userEvent.click(
    screen.getByRole('option', { name: Object.values(InterviewTypesMap)[1] })
  )
  expect(onChange).toHaveBeenCalledWith(1)
})
