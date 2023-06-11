import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Button, Form, Input as AntInput, notification, Space } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ITask } from '../../types'

const Input = ({ addTask }: { addTask: Dispatch<SetStateAction<ITask[]>> }) => {
  const [title, setTitle] = useState<string>('')
  const [api, contextHolder] = notification.useNotification()


  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const submitHandler = () => {
    if (!title.trim()) {
      api.error({
        message: 'Empty task',
        description: 'Please enter description of task',
        placement: 'bottomRight'
      })
      return
    }

    addTask(tasks => [...tasks, { title, id: uuidv4(), complete: false }])
    setTitle('')
  }

  return (
    <Form onFinish={submitHandler}>
      <Space.Compact style={{ width: '100%' }}>
        {contextHolder}
        <AntInput
          placeholder='Task to do'
          value={title}
          onChange={inputHandler}
        />
        <Button
          type='primary'
          htmlType="submit"
        >
          Add
        </Button>
      </Space.Compact >
    </Form>
  )
}

export default Input