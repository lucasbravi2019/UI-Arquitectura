import createSagaMiddleware from '@redux-saga/core'
import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'

import { rootSaga } from '../../saga/rootSaga'
import budgetReducer from '../reducers/budgetSlice'
import dimensionReducer from '../reducers/dimensionSlice'
import materialReducer from '../reducers/materialSlice'
import messageReducer from '../reducers/messageSlice'

const sagaMiddleware = createSagaMiddleware()

const storeConfig = () => {
  const config = configureStore({
    reducer: {
      budgetReducer,
      materialReducer,
      messageReducer,
      dimensionReducer
    },
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
  })

  sagaMiddleware.run(rootSaga)

  return { store: config, dispatch: config.dispatch, state: config.getState }
}

export const { store, dispatch, state } = storeConfig()

export type AppDispatch = typeof dispatch
export type RootState = ReturnType<typeof state>

