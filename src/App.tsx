import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Products from './Pages/Products/Products'
import CreateProduct from './Pages/CreateProduct/CreateProduct'
import ProductOne from './Pages/ProductOne/ProductOne'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/product/:id' element={<ProductOne/>}/>
        <Route path='/createproduct' element={<CreateProduct/>}/>
        
      </Routes>
    </>
  )
}

export default App
