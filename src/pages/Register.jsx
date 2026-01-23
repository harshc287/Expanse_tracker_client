import Api from "../services/api";
import Alert from "../components/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password:"",
        contact: "",
        address: ""
    })
    const [error, seterror] = useState("")
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        seterror("")

        if(!form.name || !form.email || !form.password || !form.contact){
            seterror("plese fill all required fields")
            return
        }

        if(form.password.length < 6){
            seterror("password must me at least 6 characters")
            return
        }
        try {
            await Api.post("/auth/register", form)
            navigate("/login")
            
        } catch {
            setmsg("User already exixts or server error")
        }
    }
    
    return(
        <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h3 className="mb-3 text-center">Register</h3>

      {error && <Alert type="danger" message={error} />}

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

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
          className="form-control mb-2"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) =>
            setForm({ ...form, contact: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Address (optional)"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <button className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
    )
}

export default Register