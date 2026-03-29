import { CronSchedule } from "@/registry/cron-schedule/cron-schedule"

export default async function Preview() {
  return (
    <CronSchedule
      expression="0 9 * * 1-5"
      title="Daily Standup"
      showNextRuns={2}
    />
  )
}
