import useCurrentUser from "./useUser"


const CurrentUser = () => {

    const { currentUser } = useCurrentUser()

    return (
        <>
            <p>Full Name: <span style={{ fontWeight: "600" }}>{currentUser?.name}</span></p>
            <p>UserName: <span style={{ fontWeight: "600" }}>{currentUser?.userName}</span></p>
            <p>Account Type: <span style={{ fontWeight: "600" }}>{currentUser?.accountType}</span></p>
            <p>Account Creation: <span style={{ fontWeight: "600" }}>{currentUser?.createdAt}</span></p>
            <p>Address: <span style={{ fontWeight: "600" }}>{currentUser?.address}</span></p>
            <p>Phone: <span style={{ fontWeight: "600" }}>{currentUser?.phoneNumber}</span></p>
            <p>Email: <span style={{ fontWeight: "600" }}>{currentUser?.email}</span></p>
        </>
    )
}

export default CurrentUser