import Home from "../pages/dashboard/subRoutes/home/Home"

const Routes = () => {

    const dashboardSubRoutes = [
        {
            path: "/dashboard",
            element: <Home />,
        },
    ]
    return { dashboardSubRoutes }
}

export default Routes;