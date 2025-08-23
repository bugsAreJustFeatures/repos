export default function Settings() {

    if (!localStorage.getItem("token")) {
        return (
            <>
            <br />
            <br />
                We could not authorise you, please try logging in again.
            </>
        );
    };

    return (
        <>
        <h1>Settings</h1>
        <p>This page is just to test the jwt at the moment</p>
        </>
    )
};