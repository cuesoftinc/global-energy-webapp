import { adminPostIcon, bellIcon, caretDownIcon, dashboardIcon, manageIcon, overviewIcon, postIcon, profileIcon, usersIcon } from "../../../public/assets"

export const links = [
    {
        id: 0,
        to: "/dashboard",
        icon: dashboardIcon,
        label: "Dashboard",
    },
    {
        id: 1,
        to: "/dashboard/members-post",
        icon: postIcon,
        label: "Post Content",
    },
    {
        id: 2,
        to: "",
        icon: manageIcon,
        label: "Power Management Plan",
        icn: caretDownIcon,
        subItems: [
            { id: 0, label: "Create/Request", to: "/dashboard/power-management/create" },
        ]
    },
    {
        id: 3,
        to: "/dashboard/subscribe",
        icon: bellIcon,
        label: "Subscription Plan",
    },
    {
        id: 4,
        to: "/dashboard/overview",
        icon: overviewIcon,
        label: "Overview",
    },
    {
        id: 5,
        to: "",
        icon: adminPostIcon,
        label: "Posts",
        icn: caretDownIcon,
        subItems: [
            // { id: 0, label: "Create new post", to: "/dashboard/post/admin-create" },
            { id: 1, label: "View all posts", to: "/dashboard/post/admin-view" },
            // { id: 2, label: "View Pending Posts", to: "/dashboard/post/admin-pending" },
        ]
    },
    {
        id: 6,
        to: "",
        icon: usersIcon,
        label: "Users",
        icn: caretDownIcon,
        subItems: [
            { id: 0, label: "Add New Users", to: "/dashboard/add-users" },
            { id: 1, label: "View All Users", to: "/dashboard/view-all-users" }
        ]
    },
    {
        id: 7,
        to: "/dashboard/user-profile",
        icon: profileIcon,
        label: "Profile",
    },
]