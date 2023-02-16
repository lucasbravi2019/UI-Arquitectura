import { createSlice } from '@reduxjs/toolkit'

import { Dimension } from '../../interfaces/budget'
import { RootState } from '../store/store'

const initialState = {
    dimensions: [] as Dimension[]
}

const dimensionSlice = createSlice({
    initialState,
    name: 'packageReducer',
    reducers: {
        loadDimensions(state, action) {
            state.dimensions = action.payload
        },
        addDimension(state, action) {
            state.dimensions = [
                ...state.dimensions,
                action.payload
            ]
        },
        removeDimension(state, action) {
            state.dimensions = state.dimensions.filter(dimension => dimension.id !== action.payload)
        },
        runLoadDimensions(state) {
            return state
        },
        runAddDimension(state) {
            return state
        },
        runRemoveDimension(state) {
            return state
        },
        runChangeDimensionPrice(state) {
            return state
        }
    }
})

export const {
    loadDimensions,
    addDimension,
    removeDimension,
    runLoadDimensions,
    runAddDimension,
    runRemoveDimension,
    runChangeDimensionPrice
} = dimensionSlice.actions

export const dimensionsSelector = (state: RootState) => state.dimensionReducer.dimensions

export default dimensionSlice.reducer