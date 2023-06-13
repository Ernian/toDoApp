import { useState } from 'react'
import type { RadioChangeEvent } from 'antd'
import { ITask, Filters } from '../types'

export const useToDo = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [filter, setFilter] = useState<Filters>('all')

  const changeFilter = ({ target: { value } }: RadioChangeEvent) => {
    setFilter(value)
  }

  const filteredTasks = tasks.reduce((filteredTasks, task) => {
    if (filter === 'all') {
      filteredTasks.push(task)
      return filteredTasks
    }
    if (filter === 'completed' && task.complete) {
      filteredTasks.push(task)
      return filteredTasks
    }
    if (filter === 'incompleted' && !task.complete) {
      filteredTasks.push(task)
      return filteredTasks
    }
    return filteredTasks
  }, [] as ITask[])

  return { tasks, setTasks, filter, changeFilter, filteredTasks }
}