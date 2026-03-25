import type User from '#models/user'
import { BaseMail } from '@adonisjs/mail'

export default class WeeklyLateReportNotification extends BaseMail {
  constructor(
    private user: User,
    private reportData: any
  ) {
    super()
  }

  prepare() {
    this.message
      .to(this.user.email)
      .subject('Weekly Late Report')
      .htmlView('emails/weekly_report', {
        user: this.user,
        report: this.reportData,
      })
  }
}
