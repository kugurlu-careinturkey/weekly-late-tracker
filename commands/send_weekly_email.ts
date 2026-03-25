import WeeklyLateReportNotification from '#mails/weekly_late_report_notification'
import LateEntry from '#models/late_entry'
import User from '#models/user'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'

export default class SendWeeklyEmail extends BaseCommand {
  static commandName = 'mail:weekly-email'
  static description = 'Send  weekly late report mails to managers'

  static options: CommandOptions = {
    startApp: true,
  }
  static schedule = '0 9 * * 1'

  async run() {
    this.logger.info('Weekly mail process')

    try {
      const managers = await User.query().where('role', 'manager')
      const lastWeek = DateTime.now().minus({ weeks: 1 }).weekNumber
      const year = DateTime.now().year
      const reportData = await LateEntry.query()
        .where('weekNumber', lastWeek)
        .where('year', year)
        .preload('user', (q) => q.preload('department'))

      for (const manager of managers) {
        await mail.send(new WeeklyLateReportNotification(manager, reportData))
        this.logger.success(`Mail sent: ${manager.email}`)
      }
    } catch (error) {
      this.logger.error('Error recieved during sending mail: ' + error.message)
    }
  }
}
