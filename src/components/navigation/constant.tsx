export const renderHeader = (splitPath: Array<string>) => {
    switch (true) {
        case splitPath[splitPath.length - 1] === "dashboard":
            return "Dashboard";
            break;
        case splitPath[splitPath.length - 1] === "members-post":
            return "Post Content"
            break;
        case splitPath[splitPath.length - 1] === "create":
            return "Create my PMP"
            break;
        case splitPath[splitPath.length - 1] === "subscribe":
            return "Subscription Plans"
            break;
        case splitPath[splitPath.length - 1] === "user-profile":
            return "Profile"
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