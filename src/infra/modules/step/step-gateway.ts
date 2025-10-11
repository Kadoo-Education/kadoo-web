export interface Step {
  id: number
  title: string
  description: string
  date: Date
  status: string
  event: Event
  activity?: {
    dueDate: Date
    file: string
  }
}

interface Event {
  id: number
  type: string
  mode: string
  format: string
  meetingLink: string
  address: string
}

export interface StepGateway {
  getByEdictId(edictId: number): Promise<Step[]> 
  getById(stepId: number): Promise<Step>
}
