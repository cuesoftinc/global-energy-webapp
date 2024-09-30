export const renderHeader = (splitPath: Array<string>) => {
    
    switch (true) {
        case splitPath[splitPath.length - 1] === "dashboard":
            return "Dashboard";
            break;
        case splitPath[splitPath.length - 1] === "view-post":
            return "Post";
            break;
        case splitPath[splitPath.length - 1] === "members-post":
            return "Post Content"
            break;
        case splitPath[splitPath.length - 1] === "create":
            return "Create my PMP"
            break;
        case splitPath[splitPath.length - 1] === "overview":
            return "Overview"
            break;
        case splitPath[splitPath.length - 1] === "admin-create":
            return "Create post"
            break;
        case splitPath[splitPath.length - 1] === "admin-view":
            return "View All Posts"
            break;
        case splitPath[splitPath.length - 1] === "admin-pending":
            return "Pending Posts"
            break;
        case splitPath[splitPath.length - 1] === "add-users":
            return "Add New Users"
            break;
        case splitPath[splitPath.length - 1] === "view-all-users":
            return "View All Users"
            break;
        case splitPath[splitPath.length - 1] === "view-all-subscription":
            return "View All Subscription"
            break;
            case splitPath[splitPath.length - 1] === "user-profile":
            return "My Profile"
            break;
            case splitPath.length === 4 && splitPath[2] === "user-profile":
            return "User Profile"
            break;
            case splitPath.length === 4 && splitPath[2] === "members-post":
            return "Update Post"
            break;
        case splitPath[splitPath.length - 1] === "faq":
            return "Frequently Asked Questions"
            break;
        case splitPath[splitPath.length - 1] === "contact":
            return "Contact"
            break;
        default:
            return "Dashboard"
    }
}