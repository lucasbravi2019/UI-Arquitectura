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
            yield put(setErrorMessage('el material no se pudo crear'))
        } else {
            yield put(addMaterial(response.body))
            yield put(setSuccessMessage('el material fue creado con éxito'))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No pudo crearse el material'))
    }
}

export function* deleteMaterialSaga(action: any): Generator<any> {
    try {
        const response: any = yield call(deleteData, endpoints.deleteMaterial(action.payload))
        if (response.error) {
            yield put(setErrorMessage('No se pudo borrar el material'))
        } else {
            yield put(removeMaterial(action.payload))
            yield put(setSuccessMessage('Se pudo borrar el material con éxito'))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No se pudo borrar el material'))
    }
}

export function* addDimensionToMaterialSaga(action: any): Generator<any> {
    try {
        const materialId = action.payload.materialId
        const dimensionId = action.payload.dimensionId
        const price: DimensionPrice = {
            price: action.payload.price
        }

        const response: any = yield call(putData, endpoints.addDimensionToMaterial(materialId, dimensionId), price)
        if (response.error) {
            yield put(setErrorMessage('No se pudo agregar la dimensión al ingrediente'))
        } else {
            yield put(setSuccessMessage('Se pudo agregar la dimensión correctamente'))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No se pudo agregar la dimensión al ingrediente'))
    }
}

export function* UpdateMaterialSaga(action: any): Generator<any> {
    try {
        const materialId = action.payload.id
        const name: MaterialNameDTO = {
            name: action.payload.name
        }
        const response: any = yield call(putData, endpoints.editMaterial(materialId), name)
        if (response.error) {
            yield put(setErrorMessage('No se pudo actualizar el material'))
            return
        }
        yield put(setSuccessMessage('Se actualizó el material'))
        yield put(removeMaterial(materialId))
        yield put(addMaterial(response.body))
    } catch (error) {
        yield put(setErrorMessage('No se pudo actualizar el material'))
    }
}

export default function* materialSaga() {
    yield takeLatest(runLoadMaterials.type, getMaterialsSaga)
    yield takeLatest(runAddMaterial.type, createMaterialSaga)
    yield takeLatest(runDeleteMaterial.type, deleteMaterialSaga)
    yield takeLatest(runAddDimensionToMaterial.type, addDimensionToMaterialSaga)
    yield takeLatest(runUpdateMaterial.type, UpdateMaterialSaga)
}
