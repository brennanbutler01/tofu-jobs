import { typedFetch } from '@/fetch'

interface UploadProps {
  file: File
  token: string
}

const upload = async ({ file, token }: UploadProps) => {
  const formData = new FormData()
  formData.append('file', file)
  return await typedFetch<string>({
    input: import.meta.env.VITE_BACKEND_API + '/Upload',
    token,
    init: { method: 'POST', body: formData },
    uploadingFile: true,
  })
}
export default upload
