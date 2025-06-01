import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Mainlayout from './layout/Mainlayout'
import Page from './pages/home/Page'
import Login from './pages/admin/Login'
import Register from './pages/admin/Register'
import OtherLayout from './layout/OtherLayout'
import About from './pages/About'
import AllPage from './pages/allblogs/Page'
import Home from './pages/profile/Home'
import Dashboard from './components/profile/Dashboard'
import Favourites from './components/profile/Favourites'
import LikedBlog from './components/profile/LikedBlog'
import Description from './pages/allblogs/Description'
import Categories from './pages/allblogs/Categories'
import AdminLogin from './pages/admin/AdminLogin'
import Admindashoard from './pages/admindashboard/Admindashoard'

import Com_Dashboard from './components/admindashboard/Dashboard'
import AddBlog from './components/admindashboard/AddBlog'
import EditBlog from './components/admindashboard/EditBlog'
import UpdateBlog from './components/admindashboard/UpdateBlog'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { login } from'./store/authReducer'

const App = () => {
const backendUrl = useSelector(state=>state.prod.link);
const dispatch = useDispatch();
  useEffect(()=>{
    const fetch = async ()=>{
      try {
        const res = await axios.get(`${backendUrl}/api/check-cookie`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if(res.data.success === true){
          dispatch(login());
        }
      } catch (error) {
        console.error('Error checking authentication:', error); 
        // Optionally handle failed auth check here
      }
    }
    fetch();
  },[])


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Mainlayout/>}>
            <Route index element={<Page />} />
            <Route path='/about' element={<About />} />
            <Route path='/all-blogs' element={<AllPage />} />
            <Route path='/description/:id' element={<Description />} />
            <Route path='/categories/:id' element={<Categories />} />

            <Route path='/profile' element={<Home />}>   
            {/* below code of profile index link with outlet */}
              <Route index element={<Dashboard />} /> 
              <Route path='/profile/favorites' element={<Favourites />} />
              <Route path='/profile/likedblogs' element={<LikedBlog />} />
            </Route>
          </Route>

          <Route element={<OtherLayout/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin-login' element={<AdminLogin />} />

            <Route path='/admin-dashboard' element={<Admindashoard />} >
              <Route index element={<Com_Dashboard />} />
              <Route path='/admin-dashboard/add-blogs' element={<AddBlog />} />
              <Route path='/admin-dashboard/edit-blogs' element={<EditBlog />} />
              <Route path='/admin-dashboard/edit-blogs/:id' element={<UpdateBlog />} />

            </Route>

          </Route>
        </Routes>
      </Router>
    </> 
  )
}

export default App
