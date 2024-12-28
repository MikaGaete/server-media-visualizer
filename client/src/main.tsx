import {createRoot} from 'react-dom/client'
import {Router} from "./router/Router.tsx";
import './index.css'

createRoot(document.getElementById('root')!).render(<Router/>);