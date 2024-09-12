import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Routes from "./routes"
import Auth from "../src/pages/auth/Auth"
import Dashboard from "./pages/dashboard/Dashboard"
import { toastOptions } from "./utils/toastOptions"
import { QueryClient, QueryClientProvider } from "react-query"
import ConfirmEmail from "./pages/auth/subComponents/ConfirmEmail"
const queryClient = new QueryClient()


const { dashboardSubRoutes } = Routes()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/auth/confirm-email",
    element: <ConfirmEmail />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: dashboardSubRoutes
  }
])


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster toastOptions={toastOptions} position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
