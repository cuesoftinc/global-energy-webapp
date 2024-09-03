export const renderHeader = (splitPath: Array<string>) => {
    switch (true) {
        case splitPath[splitPath.length - 1] === "dashboard":
            return "Dashboard";
            break;
        case splitPath[splitPath.length - 1] === "post-content":
            return "Post Content"
            break;
        default:
            return "Dashboard"
    }
}