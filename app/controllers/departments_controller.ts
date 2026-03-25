import Department from '#models/department'
import { createDepartmentValidator } from '#validators/department'
import type { HttpContext } from '@adonisjs/core/http'

export default class DepartmentsController {
  // /**
  //  * Display a list of resource
  //  */
  // async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/department')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createDepartmentValidator)
    await Department.create(payload)
    session.flash('success', 'Deparment saved successfully!')
    return response.redirect().back()
  }

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
  // //async update({ params, request }: HttpContext) {}

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) {}
}
