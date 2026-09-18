import { DeleteConstraintException } from '@/models'

export class DeleteException extends Error {
  constructor(err: DeleteConstraintException) {
    super(JSON.stringify(err))
  }
}
