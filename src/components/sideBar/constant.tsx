import { bellIcon, caretDownIcon, dashboardIcon, manageIcon, postIcon, profileIcon } from "../../../public/assets"

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
            // { id: 1, label: "Item Two", to: "/dashboard/power-management/item-two" }
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
        to: "/dashboard/user-profile",
        icon: profileIcon,
        label: "Profile",
    },
    // {
    //     id: 5,
    //     to: "/dashboard/faq",
    //     icon: bellIcon,
    //     label: "F.A.Q",
    // },
    // {
    //     id: 6,
    //     to: "/dashboard/contact",
    //     icon: bellIcon,
    //     label: "Contact",
    // }
]