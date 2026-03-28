import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../redux/features/userSlice";

const Signup = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signup(formData).unwrap();
      dispatch(userInfo(response));
      navigate("/", { replace: true });
      toast.success(`${response.data.firstName}, your account is ready.`);
    } catch (error) {
      toast.error(error?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-260px)] items-center justify-center">
      <section className="glass-card w-full max-w-md p-6 md:p-8">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="section-subtitle mt-2">Join MyBook and keep your story private and organized.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="firstname" className="form-label">First name</label>
            <input
              id="firstname"
              type="text"
              className="input-premium mt-2"
              placeholder="First name"
              onChange={handleChange}
              name="firstName"
              value={formData.firstName}
              required
            />
          </div>

          <div>
            <label htmlFor="lastname" className="form-label">Last name</label>
            <input
              id="lastname"
              type="text"
              className="input-premium mt-2"
              placeholder="Optional"
              onChange={handleChange}
              name="lastName"
              value={formData.lastName}
            />
          </div>

          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="input-premium mt-2"
              placeholder="you@example.com"
              onChange={handleChange}
              name="email"
              value={formData.email}
              required
              autoComplete="on"
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="input-premium mt-2"
              placeholder="Create password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              required
            />
          </div>

          <button type="submit" className="premium-btn w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-500">
          Already registered? <Link to="/login" className="font-semibold text-teal-500">Log in</Link>
        </p>
      </section>
    </div>
  );
};

export default Signup;
