import { useState } from 'react'
import { Col, Radio, Row } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import type { RadioChangeEvent } from 'antd'
import Input from './components/input'
import Task from './components/task'
import { ITask, Filters } from './types'

const options = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Incompleted', value: 'incompleted' },
]

const emptyListMessages = {
  all: <h2>List of tasks is empty</h2>,
  completed: <h2>List of completed tasks is empty</h2>,
  incompleted: <h2>All done! <SmileOutlined /></h2>,
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
        <Input addTask={setTasks} />
        <Radio.Group
          options={options}
          value={filter}
          onChange={changeFilter}
          optionType="button"
          buttonStyle="solid"
          style={{ marginTop: 15 }}
        />
        <div>
          {
            filteredTasksJSX.length ?
              filteredTasksJSX :
              emptyListMessages[filter]
          }
        </div>
      </Col>
    </Row>
  )
}

export default App
