import Department from '#models/department'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Department.createMany([
      { name: 'Human Resources' },
      { name: 'IT Department' },
      { name: 'Sales Department' },
      { name: 'Operation Department' },
      { name: 'Accounting Department' },
    ])
  }
}
