import { logout } from "../../components/logout"

function SiteSettings() {
    const handleLogout = () => {
        logout();
    }
    return (
        <div>
            <h1>Site Settings</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default SiteSettings