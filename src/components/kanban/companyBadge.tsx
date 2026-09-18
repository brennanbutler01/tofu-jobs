import { Badge, Text } from '@mantine/core'
import { Company } from '@/models'

interface Props {
  company: Company
}

const CompanyBadge = ({ company }: Props) => {
  return (
    <Badge variant={'light'} color={'pink'}>
      <Text>{company.name}</Text>
    </Badge>
  )
}

export default CompanyBadge
