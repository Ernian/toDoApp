import { Dispatch, SetStateAction } from 'react'
import { Checkbox, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { ITask } from '../../types'

const Task = ({
  id,
  title,
  complete,
  tasks,
  changeTasks
}: {
  id: string,
  title: string,
  complete: boolean,
  tasks: ITask[],
  changeTasks: Dispatch<SetStateAction<ITask[]>>
}) => {
  const { Text } = Typography

  const changeComplete = () => {
    changeTasks(tasks.map(task => {
      if (task.id === id) {
        task.complete = !task.complete
        return task
      }
      return task
    }))
  }

  const deleteTask = () => {
    changeTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className='task'>
      <Checkbox onChange={changeComplete} checked={complete}>
        <Text type={complete ? 'success' : undefined}>{title}</Text>
      </Checkbox>
      <DeleteOutlined className='delete-icon' onClick={deleteTask} />
    </div>
  )
}

export default Task