import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./auth.jsx"
import { Login } from "../pages/Login.jsx"
import { Register } from '../pages/Register.jsx'
import { AllGames } from './AllGames.jsx'
import "./App.css"
import { GameDetail } from './GameDetail.jsx'
import { Home } from '../pages/Home.jsx'
import { GameForm } from './GameForm.jsx'

/* import {BrowserRouter, Route, Routes} from ReactDOM

import { Register } from "./pages/Register.jsx"
import { Login } from "./pages/Login.jsx"
import {AllGames } from "./components/AllGames.jsx"
import './App.css' */

export const ApplicationViews = () => {

    return <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route element={<Authorized/>}>
            <Route path='/' element={<Home/>}/>
            <Route path="/games">
                <Route index element={<AllGames/>}/>
                <Route path=":gameId" element={<GameDetail/>}/>
                <Route path='create'element={<GameForm/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
   }