export interface EdictDTO {
  id: number
  status: string
  title: string
  description: string
  organizer: string
  file: string
  startDate: Date
  endDate: Date
  categories: string[]
}