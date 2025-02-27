import {createRoot} from 'react-dom/client'
import {Router} from "./router/Router.tsx";
import {store} from "./store/store.ts";
import {Provider} from "react-redux";
import './index.css'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Router/>
    </Provider>
);