import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store/store'

const initialState = {
    successMessage: '',
    errorMessage: ''
}

const messageSlice = createSlice({
    initialState,
    name: 'messageReducer',
    reducers: {
        setSuccessMessage(state, action) {
            state.successMessage = action.payload
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload
        },
        resetMessages(state) {
            state.errorMessage = ''
            state.successMessage = ''
        }
    }
})

export const messagesSelector = (state: RootState) => state.messageReducer

export const { setSuccessMessage, setErrorMessage, resetMessages } = messageSlice.actions

export default messageSlice.reducer
