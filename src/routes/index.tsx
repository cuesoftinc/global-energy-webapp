import Contact from "../pages/dashboard/subRoutes/contact";
import FAQ from "../pages/dashboard/subRoutes/faq";
import Home from "../pages/dashboard/subRoutes/home";
import ViewPost from "../pages/dashboard/subRoutes/home/ViewPost";
import PostContent from "../pages/dashboard/subRoutes/post-content";
import Create from "../pages/dashboard/subRoutes/power-management";
import Profile from "../pages/dashboard/subRoutes/profile";
import Subscribe from "../pages/dashboard/subRoutes/subscribe";



const Routes = () => {

    const dashboardSubRoutes = [
        {
            path: "/dashboard",
            element: <Home />,
        },
        {
            path: "/dashboard/view-post/:id",
            element: <ViewPost />,
        },
        {
            path: "/dashboard/members-post",
            element: <PostContent />,
        },
        {
            path: "/dashboard/members-post/:id",
            element: <PostContent />,
        },
        {
            path: "/dashboard/power-management/create",
            element: <Create />,
        },
        {
            path: "/dashboard/subscribe",
            element: <Subscribe />,
        },
        {
            path: "/dashboard/user-profile",
            element: <Profile />,
        },
        {
            path: "/dashboard/faq",
            element: <FAQ />,
        },
        {
            path: "/dashboard/contact",
            element: <Contact />,
        },
        {
            path: "/dashboard/contact",
            element: <Contact />,
        },
    ]
    return { dashboardSubRoutes }
}

export default Routes;