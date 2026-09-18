import CreateButton from '@/components/createButton'
import CompanyForm from '@/components/companies/form'

const CreateCompany = () => {
  return (
    <CreateButton
      form={'company-form'}
      editing={false}
      model={'Company'}
      drawerChildren={<CompanyForm />}
    />
  )
}
export default CreateCompany
