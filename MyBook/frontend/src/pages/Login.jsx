import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../redux/features/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(userInfo(response));
      navigate("/", { replace: true });
      toast.success(`Welcome back, ${response.data.firstName}`);
    } catch (error) {
      toast.error(error?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-260px)] items-center justify-center">
      <section className="glass-card w-full max-w-md p-6 md:p-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="section-subtitle mt-2">Sign in to continue your writing journey.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="input-premium mt-2"
              placeholder="you@example.com"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
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
              placeholder="Your password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              required
            />
          </div>

          <button type="submit" className="premium-btn w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-500">
          New here? <Link to="/signup" className="font-semibold text-teal-500">Create an account</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
