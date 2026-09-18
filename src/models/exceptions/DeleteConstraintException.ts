import ExceptionTypes from '@/models/exceptions/exception-types'

interface DeleteConstraintException {
  type: ExceptionTypes.REFERENCE_CONSTRAINT_EXCEPTION
  title: string
  status: 409
  detail: string
}

export default DeleteConstraintException
