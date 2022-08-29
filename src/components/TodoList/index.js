import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { todosRemainingSelector } from '../../redux/selectors';
import { addNewTodo, deleteTodo } from './todosSlice'


export default function TodoList() {
    const [todoName, setTodoName] = useState();
    const [priority, setPriority] = useState('Medium');

    const todoList = useSelector(todosRemainingSelector);
    // const searchText = useSelector(searchTextSelector);

    console.log({ todoList });
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        // dispatch(
        //     todosSlice.actions.addTodo({
        //         id: uuidv4(),
        //         name: todoName,
        //         priority: priority,
        //         completed: false
        //     }))
        dispatch(
            addNewTodo({
                id: uuidv4(),
                name: todoName,
                priority: priority,
                completed: false
            })
        )
        // dispatch(addTodos({
        // id: uuidv4(),
        // name: todoName,
        // priority: priority,
        // completed: false
        // }))

        setTodoName("");
        setPriority("Medium")

    }

    const handleInputChange = (e) => {
        setTodoName(e.target.value)
    }
    const handlePriorityChange = (value) => {
        setPriority(value)
    }
    const handleDelete = (id) => {
        console.log("id", id);
        dispatch(deleteTodo(id))

        console.log("delete: ", deleteTodo(id))
    }
    return (

        <Row style={{ height: 'calc(100% - 40px)' }}>
            <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
                {/* <Todo name='Learn React' prioriry='High' />
                <Todo name='Learn Redux' prioriry='Medium' />
                <Todo name='Learn JavaScript' prioriry='Low' /> */}

                {todoList.map(todo => {

                    return (
                        <div >

                            <Row spacing={3}>
                                <Col span={20}>
                                    <Todo
                                        key={todo.id}
                                        name={todo.name}
                                        priority={todo.priority}
                                        completed={todo.completed}
                                    />
                                </Col>

                                <Col span={3} offset={1}>
                                    <Button
                                        onClick={() => {
                                            handleDelete(todo.id)
                                        }}
                                        size='small' style={{ marginBottom: "3px", backgroundColor: "#FF3333", color: "white" }}>
                                        Delete
                                    </Button>
                                </Col>
                            </Row>

                        </div>

                    )

                }


                )}

                <i class="fas fa-code"></i>
            </Col>
            <Col span={24}>
                <Input.Group style={{ display: 'flex' }} compact>
                    <Input value={todoName} onChange={handleInputChange} />
                    <Select
                        defaultValue="Medium"
                        value={priority}
                        onChange={handlePriorityChange}>
                        <Select.Option value='High' label='High'>
                            <Tag color='red'>High</Tag>
                        </Select.Option>
                        <Select.Option value='Medium' label='Medium'>
                            <Tag color='blue'>Medium</Tag>
                        </Select.Option>
                        <Select.Option value='Low' label='Low'>
                            <Tag color='gray'>Low</Tag>
                        </Select.Option>
                    </Select>
                    <Button type='primary' onClick={handleButtonClick}>
                        Add
                    </Button>

                </Input.Group>
            </Col>
        </Row>
    );
}