import { createBrowserRouter } from "react-router";
import Root from "../components/Layout/Root";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Resister from "../components/Resister/Resister";

import PrivateRoute from "../components/Private/PrivateRoute";
import Loading from "../components/Loading/Loading";
import ErrorPage from "../components/ErrorPage/ErrorPage";

import ForgetPassword from "../components/ForgetPassword/ForgetPassword";
import AddHabbit from "../components/AddHabbits/AddHabbit";
import MyHabbit from "../components/MyHabbit/MyHabbit";
import PublicHabbits from "../components/PublicHabbits/PublicHabbits";


const router = createBrowserRouter([
    {
        path:'/',
        Component:Root,
        errorElement:<ErrorPage></ErrorPage>,
        hydrateFallbackElement: <Loading></Loading>,
        
        children:[
            {
                index:true,
                Component:Home
                
            },
           
            {
                path:'/Login',
                Component:Login
            },
            {
                path:'/Resister',
                Component:Resister
            },
            {
                path:'/AddHabbit',
                element:<PrivateRoute>
                    <AddHabbit></AddHabbit>
                </PrivateRoute>
            },
            {
                path:'/MyHabbit',
                element:<PrivateRoute>
                    <MyHabbit></MyHabbit>
                </PrivateRoute>
            },
            {
                path:"PublicHabbits",
                Component:PublicHabbits
            },
            {
                path:'/forget-password/:email?',
                Component:ForgetPassword
            }
            
        ]
    }
])

export default router