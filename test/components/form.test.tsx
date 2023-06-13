import React, { useState } from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Form from '../../src/components/form'

describe('test Form', () => {
  const setTasks = vi.fn()
  const testText = 'asdfdsk'
  let input: HTMLInputElement
  let button: HTMLButtonElement
  let form: HTMLFormElement

  beforeEach(() => {
    render(<Form addTask={setTasks} />)
    input = screen.getByRole('textbox')
    button = screen.getByRole('button')
    form = screen.getByRole('form')
  })

  test('check form, input and button in the document', () => {
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(form).toBeInTheDocument()
  })

  test('check input type', async () => {
    await userEvent.type(input, testText)
    expect(screen.findByText(testText))
  })

  test('check change form state', () => {
    const { result } = renderHook(() => {
      const [title, setTitle] = useState<string>('')
      return { title, setTitle }
    })
    act(() => {
      result.current.setTitle(testText)
    })
    expect(result.current.title).toBe(testText)
    expect(screen.findByText(testText))
  })
})
