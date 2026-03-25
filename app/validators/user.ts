import vine from '@vinejs/vine'

const emailRule = () => vine.string().email().maxLength(254)
const passwordRule = () => vine.string().minLength(8).maxLength(32)

export const registerValidator = vine.create({
  fullName: vine.string().minLength(3),
  email: emailRule().unique({ table: 'users', column: 'email' }),
  password: passwordRule().confirmed({
    confirmationField: 'passwordConfirmation',
  }),
  departmentId: vine.number().exists({ table: 'departments', column: 'id' }),
  role: vine.enum(['hr', 'manager', 'employee'] as const),
})
