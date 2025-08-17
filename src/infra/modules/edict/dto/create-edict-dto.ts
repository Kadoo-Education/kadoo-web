export interface CreateEdictDTO {
  title: string
  description: string
  startDate: Date
  endDate: Date
  linkDoc: string
  tags: string[]
  trails: {
    title: string
    type: string
    date?: string
    mode?: string
    address?: string
    time?: string
    link?: string
    activityTitle?: string
    activityDescription?: string
  }[]
}
