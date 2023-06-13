import React from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { act, render, renderHook, screen } from '@testing-library/react'

import App from '../../src/App'
import type { RadioChangeEvent } from 'antd'
import { ITask } from '../../src/types'
import Task from '../../src/components/task'
import { useToDo } from '../../src/hook/useToDo'

//Нашел на stackoverflow, без этого выражения выбрасыввает ошибку
//TypeError: window.matchMedia is not a function
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { return },
    removeListener: function () { return }
  }
}

describe('test App', () => {
  const testTask1: ITask = {
    id: 'qwer',
    title: 'Work Work Work',
    complete: false,
  }
  const testTask2: ITask = {
    id: 'tyuo',
    title: 'Hard Hard Hard',
    complete: true,
  }
  const testListOfTasks = [testTask1, testTask2]
  const changeTasks = vi.fn()
  const testFilterComplete = {
    target: {
      value: 'completed',
      checked: true
    }
  }
  const testFilterActive = {
    target: {
      value: 'incompleted',
      checked: true
    }
  }

  let h1: HTMLHeadingElement

  beforeEach(() => {
    render(<App />)
    render(<Task {...testTask1} key={testTask1.id} changeTasks={changeTasks} tasks={testListOfTasks} />)
    render(<Task {...testTask2} key={testTask2.id} changeTasks={changeTasks} tasks={testListOfTasks} />)
    h1 = screen.getByText('Todo list')
  })

  test('check h1 render', () => {
    expect(h1).toBeInTheDocument()
  })

  test('check initial list of tasks', () => {
    const { result } = renderHook(() => useToDo())
    act(() => {
      result.current.setTasks(testListOfTasks)
    })
    expect(result.current.filteredTasks.length).toBe(2)
    expect(screen.getByText(testTask1.title)).toBeInTheDocument()
    expect(screen.getByText(testTask2.title)).toBeInTheDocument()
  })

  test('check active filter of tasks', () => {
    const { result } = renderHook(() => useToDo())
    act(() => {
      result.current.setTasks(testListOfTasks)
      result.current.changeFilter(testFilterActive as RadioChangeEvent)
    })
    expect(result.current.filteredTasks.length).toBe(1)
  })

  test('check complete filter of tasks', () => {
    const { result } = renderHook(() => useToDo())
    act(() => {
      result.current.setTasks([...testListOfTasks, { id: 'asdfadgf', complete: true, title: 'title' }])
      result.current.changeFilter(testFilterComplete as RadioChangeEvent)
    })
    expect(result.current.filteredTasks.length).toBe(2)
  })
})
