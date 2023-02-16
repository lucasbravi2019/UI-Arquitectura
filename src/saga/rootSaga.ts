import { all } from 'redux-saga/effects'

import budgetMaterialSaga from './budgetMaterialSaga'
import budgetSaga from './budgetSaga'
import dimensionSaga from './dimensionSaga'
import materialSaga from './materialSaga'

export function* rootSaga(): Generator<any> {
    yield all([
        budgetSaga(),
        materialSaga(),
        budgetMaterialSaga(),
        dimensionSaga()
    ])
}