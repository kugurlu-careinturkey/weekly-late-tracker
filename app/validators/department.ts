import vine from '@vinejs/vine'

const nameRule = () => vine.string().trim().minLength(3)

export const createDepartmentValidator = vine.create({
  name: nameRule().unique({ table: 'departments', column: 'name' }),
})
