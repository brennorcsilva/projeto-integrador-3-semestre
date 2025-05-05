import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import './assets/css/reset.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/home'
import Cadastro from './pages/Cadastro/cadastro'
import Agendamento from './pages/Agendamento/agendamento'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route index element={ <Home/> }/>
            <Route path="cadastro" element={ <Cadastro/> }/>
            <Route path="agendamento" element={ <Agendamento/> }/>
        </Routes>
    </BrowserRouter>
)
