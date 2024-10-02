import useCurrentUserAdmin from "../../../../../hook/admin/useCurrentUserAdmin"



const ViewedUser = () => {
    const { viewedUser } = useCurrentUserAdmin()
    return (
        <>
            {viewedUser ? (
                <>
                    <p>Full Name: <span style={{ fontWeight: "600" }}>{viewedUser?.name}</span></p>
                    <p>UserName: <span style={{ fontWeight: "600" }}>{viewedUser?.userName}</span></p>
                    <p>Account Type: <span style={{ fontWeight: "600" }}>{viewedUser?.accountType}</span></p>
                    <p>Subscription Type: <span style={{ fontWeight: "600" }}>{viewedUser?.subscriptionType}</span></p>
                    <p>Account Creation: <span style={{ fontWeight: "600" }}>{viewedUser?.createdAt}</span></p>
                    <p>Address: <span style={{ fontWeight: "600" }}>{viewedUser?.address}</span></p>
                    <p>Phone: <span style={{ fontWeight: "600" }}>{viewedUser?.phoneNumber}</span></p>
                    <p>Email: <span style={{ fontWeight: "600" }}>{viewedUser?.email}</span></p>
                </>
            ) : (
                <p>no user</p>
            )}
        </>
    )
}

export default ViewedUser