import { Link, useNavigate} from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }

    return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">ExpenseTracker</Link>

        <div>
          {token ? (
            <>
              <Link className="btn btn-outline-light me-2" to="/">Dashboard</Link>
              <Link className="btn btn-outline-light me-2" to="/add">Add</Link>
              <Link className="btn btn-outline-light me-2" to="/reports">Reports</Link>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
              <Link className="btn btn-outline-light" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
    
}

export default Navbar