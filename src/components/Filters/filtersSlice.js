import { createSlice } from '@reduxjs/toolkit'



const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        search: '',
        status: 'All',
        piority: [],
    },
    reducers: {
        searchFilterChange: (state, action) => {
            state.search = action.payload
        },
        prioritiesFilterChange: (state, action) => {
            state.piority = action.payload;
        },
        getDataLocal: (state, action) => {
            console.log("action.payload", action.payload);
            state.search = action.payload.search;
            state.piority = action.payload.piority;

        }
    }


})

export default filtersSlice;























// const initState = {
//     search: '',
//     status: 'All',
//     priority: [],
// }
// const filtersReducer = (state = initState, action) => {
//     console.log({ state, action });
//     switch (action.type) {
//         case 'filters/searchFilterChange':
//             return {
//                 ...state.filters,
//                 search: action.payload,
//             };

//         case 'filters/statusFilterChange':
//             return {
//                 ...state,
//                 status: action.payload,
//             }
//         case 'filters/prioritiesFilterChange':
//             return {
//                 ...state,
//                 priorities: action.payload,
//             }
//         default:
//             return state;
//     }
// }
// export default filtersReducer;