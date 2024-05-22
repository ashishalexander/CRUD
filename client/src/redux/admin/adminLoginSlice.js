import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//Async Thunk for handling admin Login

export const adminLogin = createAsyncThunk('admin/login',async(loginData,thunkApI)=>{
    try {
        const response = await axios.post('/api/admin/login',loginData)
        console.log(response.data)
        return response.data
    } catch (error) {
        return thunkApI.rejectWithValue(error.response.data)
    }
})

const adminLoginSlice = createSlice({
    name:'adminLogin',
    initialState:{
        loading:false,
        adminInfo:null,
        error:null
    },
    reducers:{
        logout:(state)=>{
                state.adminInfo=null
        },

    },
    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.pending,(state)=>{
            state.loading=true
            state.error= null
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.loading= false
            state.adminInfo=action.payload
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.loading= false
            state.error= action.payload
        })
    }

})

export const {logout}= adminLoginSlice.actions
export default adminLoginSlice.reducer