/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')

router
  .group(() => {
    router.get('register', [controllers.Users, 'create']).as('users.create')
    router.post('register', [controllers.Users, 'store']).as('users.store')

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])

    router
      .group(() => {
        router.get('late-entry', [controllers.LateEntries, 'create']).as('late_entries.create')
        router.post('late-entry', [controllers.LateEntries, 'store']).as('late_entries.store')
        router.get('department', [controllers.Departments, 'create']).as('departments.create')
        router.post('department', [controllers.Departments, 'store']).as('departments.store')
      })
      .use(middleware.role(['hr']))
    router
      .group(() => {
        router.get('reports', [controllers.LateEntries, 'index']).as('late_entries.index')
      })
      .use(middleware.role(['hr', 'manager']))
  })
  .use(middleware.auth())
