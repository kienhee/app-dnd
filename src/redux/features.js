import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
const initialState = {
    data: [
        {
            id: uuidv4(),
            title: " 📃 To do",
            tasks: [],
        },
        {
            id: uuidv4(),
            title: " ✏️ In progress",
            tasks: [],
        },
        {
            id: uuidv4(),
            title: " ✔️ Completed",
            tasks: [],
        },
    ],
};

export const featuresSlice = createSlice({
    name: "features",
    initialState,
    reducers: {
        add: (state, action) => {
            const { payload } = action;
            const newArr = [...state.data[payload.option].tasks, payload];
            if (payload.option === 0) {
                state.data[payload.option].tasks = newArr;
            }
            if (payload.option === 1) {
                state.data[payload.option].tasks = newArr;
            }
            if (payload.option === 2) {
                state.data[payload.option].tasks = newArr;
            } else {
                return;
            }
        },
        dltData: (state, action) => {
            const { payload } = action;
            const removeData = state.data[payload.option].tasks;
            let newData = removeData.filter((todo) => todo.id !== payload.id);
            state.data[payload.option].tasks = newData;
        },
        edit: (state, action) => {
            const { payload } = action;
            const editData = state.data[payload.option].tasks;
            editData.forEach((item) => {
                if (item.id === payload.id) {
                    return {
                        id: (item.id = payload.id),
                        title: (item.title = payload.title),
                        createAt: (item.createAt = moment().format("LLL")),
                        option: (item.option = payload.option),
                    };
                }
            });
        },
        dnd: (state, action) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { add, edit, dltData, dnd } = featuresSlice.actions;

export default featuresSlice.reducer;
