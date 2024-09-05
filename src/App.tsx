import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Routes from "./routes"
import Auth from "../src/pages/auth/Auth"
import Dashboard from "./pages/dashboard/Dashboard"


const { dashboardSubRoutes } = Routes()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: dashboardSubRoutes
  }
])


function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
