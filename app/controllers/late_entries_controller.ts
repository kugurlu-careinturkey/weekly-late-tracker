import Department from '#models/department'
import LateEntry from '#models/late_entry'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class LateEntriesController {
  /**
   * Display a list of resource
   */
  async index({ request, view }: HttpContext) {
    const departmentId = request.input('departmentId')
    const week = request.input('week')
    const year = request.input('year', DateTime.now().year)

    const query = LateEntry.query().preload('user', (userQuery) => {
      userQuery.preload('department')
    })

    if (week) {
      query.where('weekNumber', week)
    }
    if (year) {
      query.where('year', year)
    }
    if (departmentId) {
      query.whereHas('user', (userQuery) => {
        userQuery.where('departmentId', departmentId)
      })
    }

    const entries = await query.orderBy('weekNumber', 'desc')
    const departments = await Department.all()

    return view.render('pages/reports', {
      entries,
      departments,
      filters: { departmentId, week, year },
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const employees = await User.query().where('role', 'employee').orderBy('fullName', 'asc')
    return view.render('pages/late_entry', { employees })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const { userId, minutes, entryDate } = request.all()

    const date = DateTime.fromISO(entryDate)
    const weekNumber = date.weekNumber
    const year = date.year

    const entries = userId.map((id: string, index: number) => ({
      userId: Number(id),
      durationMinutes: Number(minutes[index] || 0),
      lateDate: date,
      weekNumber: weekNumber,
      year: year,
    }))

    await LateEntry.createMany(entries)

    session.flash('success', 'Records saved successfully!')
    return response.redirect().back()
  }
  /*
  // /**
  //  * Show individual record
  //  */
  // async show({ params }: HttpContext) {}

  // /**
  //  * Edit individual record
  //  */
  // async edit({ params }: HttpContext) {}

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {}

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) {}
}
