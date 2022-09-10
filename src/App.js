import { Typography, Divider } from 'antd';
import './App.css';
import TodoList from './components/TodoList';
import Filters from './components/Filters';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchTodos } from './components/TodoList/todosSlice';


const { Title } = Typography;

function App() {
  const dispatch = useDispatch();

  const piority = useSelector((state) => state.filters.piority)
  // const status = useSelector((state) => state.todoList.status)

  console.log("check piority : ", piority);
  useEffect(() => {
    dispatch(fetchTodos({ piority }));
  }, [dispatch, piority])


  return (


    <div
      style={{
        width: 500,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 20,
        boxShadow: '0 0 10px 4px #bfbfbf',
        borderRadius: 5,
        height: '90vh',
      }
      }
    >
      <Title style={{ textAlign: 'center' }}>TODO APP</Title>
      <Filters />
      <Divider />
      <TodoList />
    </div >


  );
}

export default App;