import { createSlice } from "@reduxjs/toolkit";
const listSlice = createSlice({
    name: "listSlice",
    initialState: {
        list: [],
    },
    reducers: {
        addlist: (state, action) => {
            state.list.push(action.payload)
        },
        addcard: (state, action) => {
            state.list.foreach((item) => {
                if (item.id === action.payload.parentId) {
                    if (Object.hasOwn(item, "children")) {
                        item.children.push(action.payload)
                    } else {
                        item.children = [];
                        item.children.push(action.payload)
                    }
                }
            })
        },

        deletelist: (state, action) => {
            const itemIndex = state.list.findIndex((item) =>
                item.id == action.payload.id)
            if (itemIndex !== -1)
                state.list.splice(itemIndex, 1)
        },

        deleteChildList: (state, action) => {
            const { id, parentId } = action.payload;
            const itemIndex = state.list.findIndex((item) =>
                item.id == parentId
            );
            if (itemIndex !== -1) {
                const childItemIndex = state.list[itemIndex].children.findIndex((item) => {
                    item.id = id;
                });
                if (childItemIndex !== -1) {
                    state.list[itemIndex].children.splice(childItemIndex, 1)
                }
            }
        }
    }
});

export const { addlist, addcard, deletelist, deleteChildList } = listSlice.actions;
export default listSlice.reducer;