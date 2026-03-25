import vine from '@vinejs/vine'

export const createLateEntryValidator = vine.create({
  userId: vine.number().exists({ table: 'users', column: 'id' }),
  durationMinutes: vine.number().positive().max(1440),
  weekNumber: vine.number().range([1, 53]),
  year: vine.number().range([2024, 2100]),
})
