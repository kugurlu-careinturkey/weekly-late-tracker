import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle({ auth, response, session }: HttpContext, next: NextFn, allowedRoles: string[]) {
    const user = auth.user
    if (!user) {
      session.flash('error', 'You need to login first.')
      return response.redirect().toRoute('home')
    }

    if (!allowedRoles.includes(user.role!)) {
      session.flash('error', "You're not authorized.")
      return response.redirect().toRoute('home')
    }

    return next()
  }
}
