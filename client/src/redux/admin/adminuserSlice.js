import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsers = createAsyncThunk('users/fetchUsers',async()=>{
    const response = await axios.get('/api/admin/users')
    return response.data
})

export const deleteUsers = createAsyncThunk('user/deleteUser',async(userId)=>{
    await axios.delete(`/api/admin/deleteUser/${userId}`)
    return userId
})

export const updateUsers = createAsyncThunk('user/updateUser',async(user)=>{
    const response = await axios.put(`/api/admin/update/${user._id}`,user)
    return response.data
})
export const createUser = createAsyncThunk('admin/createUser', async (user) => {
    const response = await axios.post('/api/auth/signup', user);
    return response.data;
});



const adminUserSlice = createSlice({
    name:'adminUsers',
    initialState:{
        userarr:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true
            state.error=false

        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.userarr=action.payload
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading = false
            state.error =   action.error.message
        })
        .addCase(deleteUsers.fulfilled,(state,action)=>{
            state.userarr = state.userarr.filter(user=>user._id!==action.payload)
        }) 
        .addCase(updateUsers.fulfilled,(state,action)=>{
            const index = state.userarr.findIndex(user=>user._id===action.payload._id)
            if (index !== -1) {
                state.userarr[index] = action.payload;
            }
        }) 
        .addCase(createUser.fulfilled, (state, action) => {
            state.userarr.push(action.payload);
        });
    }
})

export const selectUsers= (state)=>state.adminUsers.userarr
export const selectLoading =(state)=>state.adminUsers.loading
export const selectError =(state)=>state.adminUsers.error

export default adminUserSlice.reducer