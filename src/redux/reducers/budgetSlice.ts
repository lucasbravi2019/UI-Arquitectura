import { createSlice } from '@reduxjs/toolkit'

import { Budget } from '../../interfaces/budget'
import { RootState } from '../store/store'

const initialState = {
    budgets: [] as Budget[],
    budget: {} as Budget,
    budgetsFiltered: [] as Budget[]
}

const budgetSlice = createSlice({
    initialState,
    name: 'budgetReducer',
    reducers: {
        loadBudgets(state, action) {
            state.budgets = action.payload
        },
        loadBudget(state, action) {
            state.budget = action.payload
        },
        addBudget(state, action) {
            state.budgets = [
                ...state.budgets,
                action.payload
            ]
        },
        filterBudgetsByName(state, action) {
            if (action.payload === '') {
                state.budgetsFiltered = []
            } else {
                state.budgetsFiltered = state.budgets.filter(budget => budget.name.toLowerCase().includes(action.payload))
            }
        },
        removeBudget(state, action) {
            state.budgets = state.budgets.filter(budget => budget.id !== action.payload)
        },
        runLoadBudgets(state) {
            return state
        },
        runLoadBudget(state) {
            return state
        },
        runAddBudget(state) {
            return state
        },
        runDeleteBudget(state) {
            return state
        },
        runUpdateBudget(state) {
            return state
        }
    }
})

export const {
    loadBudgets,
    loadBudget,
    addBudget,
    filterBudgetsByName,
    removeBudget,
    runLoadBudgets,
    runLoadBudget,
    runAddBudget,
    runDeleteBudget,
    runUpdateBudget
} = budgetSlice.actions

export const budgetsSelector = (state: RootState) => state.budgetReducer.budgets
export const budgetSelector = (state: RootState) => state.budgetReducer.budget
export const budgetsFilterSelector = (state: RootState) => state.budgetReducer.budgetsFiltered

export default budgetSlice.reducer