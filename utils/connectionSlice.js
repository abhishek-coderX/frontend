import {createSlice} from "@reduxjs/toolkit"
const connectionSlice=createSlice({
    name:"connections",
    initialState:[],
    reducers:{
        addConnections:(state,action)=>action.payload,
        removeConnection:()=>null,
    },

});

export const {addConnections,removeConnection} =connectionSlice.actions
export default connectionSlice.reducer