import React from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import Task from '../../src/components/task'
import { ITask } from '../../src/types'

describe('test Task', () => {
  const testTask: ITask = {
    id: 'qwer',
    title: 'Work Work Work',
    complete: false,
  }
  const testListOfTasks = [testTask]
  const changeTasks = vi.fn()
  let task: HTMLLIElement

  beforeEach(() => {
    render(<Task
      {...testTask}
      changeTasks={changeTasks}
      tasks={testListOfTasks}
    />)
    task = screen.getByText(testTask.title)
  })

  test('check task in the document', () => {
    expect(task).toBeInTheDocument()
  })
})
