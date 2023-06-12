import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Button, Form as AntForm, Input, notification, Space } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ITask } from '../../types'

const Form = ({ addTask }: { addTask: Dispatch<SetStateAction<ITask[]>> }) => {
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
    <AntForm onFinish={submitHandler} role='form'>
      <Space.Compact style={{ width: '100%' }}>
        {contextHolder}
        <Input
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
    </AntForm>
  )
}

export default Form