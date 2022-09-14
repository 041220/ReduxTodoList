import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'todoList',
    initialState: { status: 'idle', todos: [] },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = "idle"
            })
            .addCase(addNewTodo.pending, () => {

            })
            .addCase(addNewTodo.fulfilled, () => {

            })
            .addCase(updateTodo.pending, () => {

            })
            .addCase(updateTodo.fulfilled, () => {

            })
            .addCase(deleteTodo.pending, () => {

            })
            .addCase(deleteTodo.fulfilled, () => {

            })

    }
})

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (params) => {
        const res = await fetch(`http://localhost:3001/todos?piority=${params.piority}`, {

            method: 'GET',
        })
        const data = await res.json();
        console.log("res : ", { res });
        return data;
    })


export const addNewTodo = createAsyncThunk(
    'todos/addNewTodos',
    async (params) => {
        const res = await fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        const data = await res.json();
        console.log("res post: ", { res });
        return data.todos;
    })

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (params) => {
        const res = await fetch(`http://localhost:3001/todos/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
        });
        const data = await res.json();
        console.log("[updateTodo]", { data });
        return data;
    })

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (params) => {
        const res = await fetch(`http://localhost:3001/todos/${params.id}`, {
            method: 'DELETE',
            body: JSON.stringify(params),
        })
        const data = await res.json();
        console.log("delete data: ", { data });
        return data;
    })

export default todosSlice;


















