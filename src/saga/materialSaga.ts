import {
    call,
    put,
    takeLatest,
} from 'redux-saga/effects'

import {
    deleteData,
    endpoints,
    getData,
    postData,
    putData,
} from '../api/index'
import { DimensionPrice } from '../interfaces/budget'
import { MaterialNameDTO } from '../interfaces/material'
import {
    addMaterial,
    loadMaterials,
    removeMaterial,
    runAddDimensionToMaterial,
    runAddMaterial,
    runDeleteMaterial,
    runLoadMaterials,
    runUpdateMaterial,
} from '../redux/reducers/materialSlice'
import {
    resetMessages,
    setErrorMessage,
    setSuccessMessage,
} from '../redux/reducers/messageSlice'

export function* getMaterialsSaga(): Generator<any> {
    try {
        yield put(resetMessages())
        const response: any = yield call(getData, endpoints.getAllMaterials)
        if (response.error) {
            return
        }
        yield put(loadMaterials(response.body))
    } catch (error) {
        console.log(error);
    }
}

export function* createMaterialSaga(action: any): Generator<any> {
    try {
        const response: any = yield call(postData, endpoints.createMaterial, action.payload)
        if (response.error) {
            yield put(setErrorMessage('El ingrediente no se pudo crear'))
        } else {
            yield put(addMaterial(response.body))
            yield put(setSuccessMessage('El ingrediente fue creado con éxito'))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No pudo crearse el ingrediente'))
    }
}

export function* deleteMaterialSaga(action: any): Generator<any> {
    try {
        const response: any = yield call(deleteData, endpoints.deleteMaterial(action.payload))
        if (response.error) {
            yield put(setErrorMessage('No se pudo borrar el ingrediente'))
        } else {
            yield put(removeMaterial(action.payload))
            yield put(setSuccessMessage('Se pudo borrar el ingrediente con éxito'))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No se pudo borrar el ingrediente'))
    }
}

export function* addDimensionToMaterialSaga(action: any): Generator<any> {
    try {
        const ingredientId = action.payload.ingredientId
        const packageId = action.payload.packageId
        const price: DimensionPrice = {
            price: action.payload.price
        }

        const response: any = yield call(putData, endpoints.addDimensionToMaterial(ingredientId, packageId), price)
        if (response.error) {
            yield put(setErrorMessage('No se pudo agregar el envase al ingrediente'))
        } else {
            yield put(setSuccessMessage('Se pudo agregar el envase correctamente'))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No se pudo agregar el envase al ingrediente'))
    }
}

export function* UpdateIngredientSaga(action: any): Generator<any> {
    try {
        const ingredientId = action.payload.id
        const name: MaterialNameDTO = {
            name: action.payload.name
        }
        const response: any = yield call(putData, endpoints.editMaterial(ingredientId), name)
        if (response.error) {
            yield put(setErrorMessage('No se pudo actualizar el ingrediente'))
            return
        }
        yield put(setSuccessMessage('Se actualizó el ingrediente'))
        yield put(removeMaterial(ingredientId))
        yield put(addMaterial(response.body))
    } catch (error) {
        yield put(setErrorMessage('No se pudo actualizar el ingrediente'))
    }
}

export default function* materialSaga() {
    yield takeLatest(runLoadMaterials.type, getMaterialsSaga)
    yield takeLatest(runAddMaterial.type, createMaterialSaga)
    yield takeLatest(runDeleteMaterial.type, deleteMaterialSaga)
    yield takeLatest(runAddDimensionToMaterial.type, addDimensionToMaterialSaga)
    yield takeLatest(runUpdateMaterial.type, UpdateIngredientSaga)
}
