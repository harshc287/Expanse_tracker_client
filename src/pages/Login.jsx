import { useState } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password:""
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        setError("")

        if(!form.email || !form.password){
            setError("email and password are required")
            return
        }

        try {
            const res = await Api.post("/auth/login", form)
            localStorage.setItem("token", res.data.token)
            navigate("/")
            
        } catch  {
            setError("Invalid email or password")
        }
    }
  return (
<div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Login</h3>

      {error && <Alert type="danger" message={error} />}

      <form onSubmit={submit}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login
