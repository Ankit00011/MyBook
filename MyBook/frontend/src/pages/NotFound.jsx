import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100dvh-260px)] items-center justify-center">
      <section className="glass-card w-full max-w-xl p-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-500">Error 404</p>
        <h1 className="text-4xl font-bold">This page does not exist</h1>
        <p className="section-subtitle mt-3">
          The URL may be outdated or typed incorrectly. Return to the homepage and continue your journaling flow.
        </p>
        <button onClick={() => navigate("/", { replace: true })} className="premium-btn mt-6">
          Go Home
        </button>
      </section>
    </div>
  );
};

export default NotFound;
