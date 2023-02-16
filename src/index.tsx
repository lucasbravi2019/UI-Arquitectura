import './globalStyles.scss'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './redux/store/store'
import App from './root/App'

const domNode = document.getElementById('root')!
const root = createRoot(domNode)

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
