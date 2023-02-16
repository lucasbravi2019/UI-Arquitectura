import { createSlice } from '@reduxjs/toolkit'

import { MaterialMultiDimension } from '../../interfaces/budget'
import { RootState } from '../store/store'

const initialState = {
    materials: [] as MaterialMultiDimension[],
    materialsFiltered: [] as MaterialMultiDimension[]
}

const materialSlice = createSlice({
    initialState,
    name: 'materialReducer',
    reducers: {
        loadMaterials(state, action) {
            state.materials = action.payload
        },
        addMaterial(state, action) {
            state.materials = [
                ...state.materials,
                action.payload]
        },
        addMaterials(state, action) {
            state.materials = [
                ...state.materials,
                ...action.payload
            ]
        },
        filterMaterials(state, action) {
            if (action.payload === '') {
                state.materialsFiltered = []
            } else {
                state.materialsFiltered = state.materials.filter(material => material.name.toLowerCase().includes(action.payload))
            }
        },
        removeMaterial(state, action) {
            state.materials = state.materials.filter(material => material.id !== action.payload)
        },
        removeMaterials(state, action) {
            state.materials = state.materials.filter(material => !action.payload.includes(material.id))
        },
        runLoadMaterials(state) {
            return state
        },
        runAddMaterial(state) {
            return state
        },
        runDeleteMaterial(state) {
            return state
        },
        runAddDimensionToMaterial(state) {
            return state
        },
        runUpdateMaterial(state) {
            return state
        }
    }
})

export const {
    loadMaterials,
    addMaterial,
    addMaterials,
    removeMaterial,
    removeMaterials,
    runLoadMaterials,
    runAddMaterial,
    runDeleteMaterial,
    runAddDimensionToMaterial,
    filterMaterials,
    runUpdateMaterial
} = materialSlice.actions

export const materialsSelector = (state: RootState) => state.materialReducer.materials
export const materialsFilterSelector = (state: RootState) => state.materialReducer.materialsFiltered

export default materialSlice.reducer