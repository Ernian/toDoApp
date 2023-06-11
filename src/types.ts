export interface ITask {
  id: string,
  title: string,
  complete: boolean
}

export type Filters = 'all' | 'completed' | 'incompleted'