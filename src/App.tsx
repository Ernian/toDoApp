import { useState } from 'react'
import { Col, Radio, Row } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import type { RadioChangeEvent } from 'antd'
import Form from './components/form'
import Task from './components/task'
import { ITask, Filters } from './types'

const options = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'incompleted' },
  { label: 'Completed', value: 'completed' },
]

const emptyListMessages = {
  all: <li className='message'>List of tasks is empty</li>,
  completed: <li className='message'>List of completed tasks is empty</li>,
  incompleted: <li className='message'>All done! <SmileOutlined /></li>,
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [filter, setFilter] = useState<Filters>('all')

  const changeFilter = ({ target: { value } }: RadioChangeEvent) => {
    setFilter(value)
  }

  const filteredTasksJSX = tasks.reduce((filteredTasks, task) => {
    if (filter === 'all') {
      filteredTasks.push(<Task
        key={task.id}
        {...task}
        tasks={tasks}
        changeTasks={setTasks}
      />)
      return filteredTasks
    }
    if (filter === 'completed' && task.complete) {
      filteredTasks.push(<Task
        key={task.id}
        {...task}
        tasks={tasks}
        changeTasks={setTasks}
      />)
      return filteredTasks
    }
    if (filter === 'incompleted' && !task.complete) {
      filteredTasks.push(<Task
        key={task.id}
        {...task}
        tasks={tasks}
        changeTasks={setTasks}
      />)
      return filteredTasks
    }
    return filteredTasks
  }, [] as JSX.Element[])

  return (
    <Row>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 18, offset: 3 }}
        md={{ span: 16, offset: 4 }}
        lg={{ span: 8, offset: 8 }}
      >
        <h1 style={{ textAlign: 'center' }}>Todo list</h1>
        <Form addTask={setTasks} />
        <Radio.Group
          options={options}
          value={filter}
          onChange={changeFilter}
          optionType="button"
          buttonStyle="solid"
          style={{ marginTop: 15 }}
        />
        <ul style={{ padding: 0 }}>
          {
            filteredTasksJSX.length ?
              filteredTasksJSX :
              emptyListMessages[filter]
          }
        </ul>
      </Col>
    </Row>
  )
}

export default App
