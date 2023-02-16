import { createSlice } from '@reduxjs/toolkit'

const initialState = {
}

const budgetMaterialSlice = createSlice({
    initialState,
    name: 'budgetMaterialReducer',
    reducers: {
        runAddMaterialToBudget(state) {
            return state
        }
    }
})

export const { runAddMaterialToBudget } = budgetMaterialSlice.actions

export default budgetMaterialSlice.reducer