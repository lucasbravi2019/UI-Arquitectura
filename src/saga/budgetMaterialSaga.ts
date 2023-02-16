import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

import {
  endpoints,
  putData,
} from '../api/index'
import { MaterialDetails } from '../interfaces/budget'
import { runAddMaterialToBudget } from '../redux/reducers/budgetMaterialSlice'
import {
  setErrorMessage,
  setSuccessMessage,
} from '../redux/reducers/messageSlice'

export function* addMaterialToBudget(action: any): Generator<any> {
  try {
    const budgetId = action.payload.recipeId
    const materialIdId = action.payload.ingredientId

    const body: MaterialDetails = {
      metric: action.payload.metric,
      quantity: action.payload.quantity
    }

    const response: any = yield call(putData, endpoints.addMaterialToBudget(budgetId, materialIdId), body)
    if (response.error) {
      yield put(setErrorMessage('El material no se pudo agregar al presupuesto'))
    } else {
      yield put(setSuccessMessage('El material fue añadido con éxito'))
    }
  } catch (error) {
    console.log(error);
  }

}




export default function* budgetMaterialSaga() {
  yield takeLatest(runAddMaterialToBudget.type, addMaterialToBudget)
}