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
import {
    addDimension,
    loadDimensions,
    removeDimension,
    runAddDimension,
    runChangeDimensionPrice,
    runLoadDimensions,
    runRemoveDimension,
} from '../redux/reducers/dimensionSlice'
import {
    addMaterial,
    removeMaterial,
} from '../redux/reducers/materialSlice'
import {
    resetMessages,
    setErrorMessage,
    setSuccessMessage,
} from '../redux/reducers/messageSlice'

export function* getDimensionsSaga(): Generator<any> {
    try {
        const response: any = yield call(getData, endpoints.getAllDimensions)
        if (response.error) {
            return
        }
        yield put(loadDimensions(response.body))
    } catch (error) {
        console.log(error);
    }
}

export function* addDimensionSaga(action: any): Generator<any> {
    try {
        yield put(resetMessages())
        const response: any = yield call(postData, endpoints.createDimension, action.payload)
        if (response.error) {
            yield put(setErrorMessage('La dimension no se pudo crear'))
        } else {
            yield put(setSuccessMessage('La dimension fue creado con éxito'))
            yield put(addDimension(response.body))
        }
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('La dimension no se pudo crear'))
    }
}

export function* deleteDimensionSaga(action: any): Generator<any> {
    try {
        const packageId = action.payload
        const deletePackageResponse: any = yield call(deleteData, endpoints.deleteDimension(packageId))
        if (deletePackageResponse.error) {
            yield put(setErrorMessage('No se pudo borrar la dimension'))
            return
        }
        yield put(removeDimension(packageId))
    } catch (error) {
        console.log(error);
        yield put(setErrorMessage('No se pudo borrar la dimension'))
    }
}

export function* changeDimensionPriceSaga(action: any): Generator<any> {
    try {
        const price: DimensionPrice = {
            price: action.payload.price
        }
        const response: any = yield call(putData, endpoints.changeMaterialDimensionPrice(action.payload.dimensionId), price)
        if (response.error) {
            yield put(setErrorMessage('No se pudo cambiar el precio la dimension'))
        } else {
            yield put(setSuccessMessage('Se cambió el precio con éxito'))
            yield put(removeMaterial(response.body.id))
            yield put(addMaterial(response.body))
        }
    } catch (error) {
        yield put(setErrorMessage('No se pudo cambiar el precio la dimension'))
    }
}

export default function* dimensionSaga() {
    yield takeLatest(runLoadDimensions.type, getDimensionsSaga)
    yield takeLatest(runAddDimension.type, addDimensionSaga)
    yield takeLatest(runRemoveDimension.type, deleteDimensionSaga)
    yield takeLatest(runChangeDimensionPrice.type, changeDimensionPriceSaga)
}