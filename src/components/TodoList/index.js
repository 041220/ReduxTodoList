import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect, useState } from 'react';
import { addNewTodo, deleteTodo, fetchTodos } from './todosSlice'
import "./todoList.css"
import filtersSlice from '../Filters/filtersSlice';

export default function TodoList() {


    const [todoName, setTodoName] = useState();
    const [priority, setPriority] = useState('medium');


    const piority = useSelector((state) => state.filters.piority)
    const todoList = useSelector((state) => state.todoList.todos);
    const searchText = useSelector((state) => state.filters.search)
    const todoState = useSelector((state) => state)

    console.log("Todolist :", todoList);
    console.log();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos({ piority }));
    }, [dispatch, piority])

    useEffect(() => {
        console.log("log 1");
        setTimeout(() => {
            localStorage.setItem("filters", JSON.stringify(todoState.filters))
        }, 100)
    }, [dispatch, todoState.filters])

    useEffect(() => {
        const filter = localStorage.getItem("filters")
        console.log("log2", JSON.parse(filter));
        if (filter) {
            dispatch(filtersSlice.actions.getDataLocal(JSON.parse(filter)))
        }
    }, [dispatch])

    useEffect(() => {
        if (todoName) {
            console.log("title 1", document.title);
            document.title = "addnew ..."
        }
        else {
            console.log("title 2", document.title);
            document.title = "React App"
        }
    }, [todoName])

    const handleAddTodo = async () => {

        await dispatch(
            addNewTodo({
                content: todoName,
                piority: priority,
                status: false
            })
        );

        setTodoName("");
        setPriority("medium")

    }

    const handleInputChange = (e) => {
        setTodoName(e.target.value)
    }
    const handlePriorityChange = (value) => {
        setPriority(value)
    }
    const handleDelete = async (id) => {

        await dispatch(deleteTodo({ id }));


    }


    return (
        <Row >
            <Col className='todoList' span={24}>

                {todoList.filter((item) => item.content.toLowerCase().includes(searchText.toLowerCase()))
                    .map(todo => {
                        return (
                            <div key={todo.id}>
                                <Row spacing={3}>
                                    <Col span={18} offset={1}>
                                        <Todo
                                            id={todo.id}
                                            name={todo.content}
                                            piority={todo.piority}
                                            completed={todo.completed}
                                        />
                                    </Col>
                                    <Col span={3} offset={1}>
                                        <Button
                                            className='button_delete'
                                            onClick={() => {
                                                handleDelete(todo.id)
                                            }}
                                            size="small"
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                    <Col span={1}>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }
                    )}
                <i className="fas fa-code"></i>
            </Col>
            <Col span={24}>
                <Input.Group style={{ display: 'flex' }} compact>
                    <Input value={todoName} onChange={handleInputChange} />
                    <Select

                        value={priority}
                        onChange={(e) => handlePriorityChange(e)}>
                        <Select.Option value='high' label='high'>
                            <Tag color='red'>high</Tag>
                        </Select.Option>
                        <Select.Option value='medium' label='medium'>
                            <Tag color='blue'>medium</Tag>
                        </Select.Option>
                        <Select.Option value='low' label='low'>
                            <Tag color='gray'>low</Tag>
                        </Select.Option>
                    </Select>
                    <Button
                        type='primary'
                        onClick={handleAddTodo}>
                        Add
                    </Button>

                </Input.Group>
            </Col>
        </Row>
    );
}