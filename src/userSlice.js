import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    currentUser: {},
    userList: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            Object.assign(state.currentUser, action.payload)
        },
        setUserList: (state, action) => {

            if (!state.userList.some(val=>(val.name === action.payload.name) && (val.password === action.payload.password) )) {
                state.userList.push(action.payload)
            }
        }
    }
})

export const {setCurrentUser,setUserList} = userSlice.actions
export default userSlice.reducer
