import { createBrowserRouter } from "react-router";
import Root from "../components/Layout/Root";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Resister from "../components/Resister/Resister";

import PrivateRoute from "../components/Private/PrivateRoute";
import Loading from "../components/Loading/Loading";
import ErrorPage from "../components/ErrorPage/ErrorPage";

import AddHabbit from "../components/AddHabbits/AddHabbit";
import MyHabbit from "../components/MyHabbit/MyHabbit";
import PublicHabbits from "../components/PublicHabbits/PublicHabbits";
import HabbitDetails from "../components/HabbitDetails/HabbitDetails";
import UpdateHabit from "../components/UpdateHabit/UpdateHabit";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loading></Loading>,

    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/Login",
        Component: Login,
      },
      {
        path: "/Resister",
        Component: Resister,
      },
      {
        path: "/AddHabbit",
        element: (
          <PrivateRoute>
            <AddHabbit></AddHabbit>
          </PrivateRoute>
        ),
      },
      {
        path: "/MyHabbit",
        element: (
          <PrivateRoute>
            <MyHabbit></MyHabbit>
          </PrivateRoute>
        ),
      },
      {
        path: "PublicHabbits",
        Component: PublicHabbits,
      },
      {
        path: "HabbitDetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://habbit-tracker-api-server.vercel.app/habbits/${params.id}`
          ),
        element: <HabbitDetails></HabbitDetails>,
      },
      {
        path: "UpdateHabit/:id",
        Component: UpdateHabit,
        loader: ({ params }) =>
          fetch(
            `https://habbit-tracker-api-server.vercel.app/habbits/${params.id}`
          ),
      },
    ],
  },
]);

export default router;
