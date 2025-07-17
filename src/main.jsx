import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import appStore from "../utils/appStore.js"
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
    <Provider store={appStore}>
<BrowserRouter>
    <App  />
    </BrowserRouter>
    </Provider>

)
