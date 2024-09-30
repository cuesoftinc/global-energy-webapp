import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Routes from "./routes"
import Auth from "../src/pages/auth/Auth"
import Dashboard from "./pages/dashboard/Dashboard"
import { toastOptions } from "./utils/toastOptions"
import { QueryClient, QueryClientProvider } from "react-query"
import ResetPassword from "./pages/auth/subComponents/resetPassword/ResetPassword"
import useTokenRefresh from "./hook/useTokenRefresh"
import ConfirmEmail from "./pages/auth/subComponents/confirmEmail/ConfirmEmail"
const queryClient = new QueryClient()

const { dashboardSubRoutes } = Routes()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/auth/confirm-email/:token",
    element: <ConfirmEmail />,
  },
  {
    path: "/auth/reset-password/:token",
    element: (
      <Auth>
        <ResetPassword
          setActive={(value) => console.log(value)}
          setOverlay={(value) => console.log(value)}
          setOverlayText={(value) => console.log(value)}
        />
      </Auth>
    ),
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: dashboardSubRoutes
  }
])

function TokenRefresher() {
  useTokenRefresh();
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenRefresher />
      <Toaster toastOptions={toastOptions} position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
