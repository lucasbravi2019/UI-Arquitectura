import { call } from 'redux-saga/effects'

import {
  put,
  takeLatest,
} from '@redux-saga/core/effects'

import {
  deleteData,
  endpoints,
  getData,
  postData,
  putData,
} from '../api/index'
import {
  addBudget,
  loadBudget,
  loadBudgets,
  removeBudget,
  runAddBudget,
  runDeleteBudget,
  runLoadBudget,
  runLoadBudgets,
  runUpdateBudget,
} from '../redux/reducers/budgetSlice'
import {
  resetMessages,
  setErrorMessage,
  setSuccessMessage,
} from '../redux/reducers/messageSlice'

export function* getBudgetSaga(): Generator<any> {
  try {
    yield put(resetMessages())
    const response: any = yield call(getData, endpoints.getAllBudgets)
    yield put(loadBudgets(response.body))
  } catch (error) {
    console.log(error);
  }
}

export function* getBudgetByIdSaga(action: any): Generator<any> {
  try {
    const response: any = yield call(getData, endpoints.getBudgetByOid(action.payload))
    if (response.error) {
      return
    }
    yield put(loadBudget(response.body))
  } catch (error) {
    console.log(error);
  }
}

export function* createBudgetSaga(action: any): Generator<any> {
  try {
    yield put(resetMessages())
    const response: any = yield call(postData, endpoints.createBudget, action.payload)
    if (response.error) {
      yield put(setErrorMessage('La receta no se pudo crear'))
    } else {
      yield put(addBudget(response.body))
      yield put(setSuccessMessage('La receta fue creada con éxito'))
    }
  } catch (error) {
    yield put(setErrorMessage('La receta no se pudo crear'))
  }
}

export function* deleteBudgetSaga(action: any): Generator<any> {
  try {
    yield put(resetMessages())
    const response: any = yield call(deleteData, endpoints.deleteBudget(action.payload))
    if (response.error) {
      yield put(setErrorMessage('La receta no se pudo borrar'))
    } else {
      yield put(removeBudget(action.payload))
      yield put(setSuccessMessage('La receta fue borrada con éxito'))
    }
  } catch (error) {
    yield put(setErrorMessage('La receta no se pudo borrar'))
  }
}

export function* updateBudgetSaga(action: any): Generator<any> {
  try {
    yield put(resetMessages())
    const response: any = yield call(putData, endpoints.updateBudget(action.payload.id), action.payload)
    if (response.error) {
      yield put(setErrorMessage('La receta no se pudo editar'))
    } else {
      yield put(removeBudget(action.payload.id))
      yield put(addBudget(response.body))
      yield put(setSuccessMessage('La receta se pudo editar correctamente'))
    }
  } catch (error) {
    yield put(setErrorMessage('La receta no se pudo editar'))
  }
}

export default function* budgetSaga() {
  yield takeLatest(runLoadBudgets.type, getBudgetSaga)
  yield takeLatest(runLoadBudget.type, getBudgetByIdSaga)
  yield takeLatest(runAddBudget.type, createBudgetSaga)
  yield takeLatest(runDeleteBudget.type, deleteBudgetSaga)
  yield takeLatest(runUpdateBudget.type, updateBudgetSaga)
}