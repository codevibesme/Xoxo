import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    'id':0,
    'name':'',
    'room': '',
    'opponent': '',
};
const playerSlice = createSlice({
    name:'player',
    initialState,
    reducers:{
        setId: (state, action) => {
            state.id = action.payload.id;
        },
        setName: (state, action) => {
            state.name = action.payload.name;
        },
        setRoom: (state, action) => {
            state.room = action.payload.room;
        },
        setOpponent: (state, action) => {
            state.opponent = action.payload.opponent;
        }
    }
});
export const {setName, setId, setRoom, setOpponent} = playerSlice.actions;
export default playerSlice.reducer;