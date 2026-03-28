import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiCheckCircle, FiShield, FiFeather, FiTrendingUp } from "react-icons/fi";

const highlights = [
  {
    title: "Focused Writing",
    text: "Capture ideas, daily moments, and reflections in a distraction-free space.",
    icon: <FiFeather size={20} />,
  },
  {
    title: "Private by Default",
    text: "Your entries stay secure with protected routes and trusted authentication.",
    icon: <FiShield size={20} />,
  },
  {
    title: "Always Improving",
    text: "Edit, search, and organize entries quickly as your archive grows over time.",
    icon: <FiTrendingUp size={20} />,
  },
];

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="space-y-10">
      <section className="glass-card p-6 md:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-teal-500">
          Premium Journaling Workspace
        </p>
        <h1 className="section-title">
          {user ? (
            <>
              Welcome back, <span className="brand-gradient">{user.data.firstName}</span>
            </>
          ) : (
            <>
              Write Better Stories in <span className="brand-gradient">MyBook</span>
            </>
          )}
        </h1>
        <p className="section-subtitle mt-4 max-w-2xl">
          Build clarity through consistent writing. MyBook gives you a polished personal journal with modern tools, secure access, and a calm interface designed for everyday reflection.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={user ? "/entries" : "/signup"} className="premium-btn">
            {user ? "Open Your Entries" : "Start Free"}
          </Link>
          <Link to="/about" className="premium-btn-outline">
            Learn More
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="solid-card p-5">
            <div className="mb-3 inline-flex rounded-xl bg-teal-500/15 p-2 text-teal-500">
              {item.icon}
            </div>
            <h2 className="mb-2 text-lg font-bold">{item.title}</h2>
            <p className="section-subtitle">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="solid-card p-6 md:p-8">
        <div className="mb-6 flex items-center gap-2">
          <FiCheckCircle className="text-teal-500" size={18} />
          <h2 className="text-xl font-bold">How it works</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-semibold">1. Create your account</h3>
            <p className="section-subtitle">Sign up in seconds and enter your private dashboard.</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">2. Start writing entries</h3>
            <p className="section-subtitle">Log your thoughts by mood and date with full editing control.</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">3. Build your memory archive</h3>
            <p className="section-subtitle">Search old entries instantly and keep your timeline organized.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
