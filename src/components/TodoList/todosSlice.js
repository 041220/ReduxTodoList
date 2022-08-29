import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'todoList',
    initialState: { status: 'idle', todos: [] },
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        toggleTodoStatus: (state, action) => {
            const currentTodo = state.todos.find(todo => todo.id === action.payload ? { completed: !(todo.completed) } : todo)

            if (currentTodo) {
                currentTodo.completed = !currentTodo.completed;
            }
        }
    },

    extraReducers: builder => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.status = 'loading';
        })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = 'idle';
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload)
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                let currentTodo = state.todos.find((todo) => todo.id === action.payload)
                currentTodo = action.payload;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                let currentTodo = state.todos.find((todo) => todo.id === action.payload)
                currentTodo = action.payload;


            })

    }
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await fetch('/api/todos')
    const data = await res.json();
    return data.todos;
})

export const addNewTodo = createAsyncThunk('todos/addNewTodos', async (newTodo) => {
    const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo)
    })
    const data = await res.json();
    console.log({ res });
    return data.todos;
})

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (updatedTodo) => {
        const res = await fetch('/api/updateTodo', {
            method: 'POST',
            body: JSON.stringify(updatedTodo),
        });
        const data = await res.json();
        console.log("[updateTodo]", { data });
        return data.todos;
    })

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (deletedTodo) => {
    console.log("deleteTodo", deletedTodo);
    const res = await fetch('/api/deleteTodo', {
        method: 'DELETE',
        body: JSON.stringify(deletedTodo),
    })
    const data = await res.json();
    console.log("data:", { data });
    return data.todos;
})

export default todosSlice;




// export function addTodos(todo) {
//     return function addTodosThunk(dispatch, getState) {
//         console.log('[addTodoThunk]', getState());
//         console.log({ todo });

//         todo.name = 'Learn English Update'
//         dispatch(todosSlice.actions.addTodo(todo))

//         console.log('[addTodosThunk after]', getState());
//     }
// }

















// const initState = [
//     { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
//     { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
//     { id: 3, name: 'Learn JavaScript', completed: false, priority: 'Low' }
// ]

// const todoListReducer = (state = initState, action) => {
//     console.log({ state, action });
//     switch (action.type) {
//         case 'todoList/addTodo':
//             return [...state.todoList, action.payload];
//         default:
//             return state;
//     }
// }
// export default todoListReducer;