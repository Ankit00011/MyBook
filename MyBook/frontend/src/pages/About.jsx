import { FiShield, FiServer, FiLock, FiBookOpen } from "react-icons/fi";

const About = () => {
  return (
    <div className="space-y-6">
      <section className="glass-card p-6 md:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-teal-500">About MyBook</p>
        <h1 className="section-title">A modern journal for thoughtful people</h1>
        <p className="section-subtitle mt-4 max-w-3xl">
          MyBook is a private digital journaling app designed to help you think clearly, track growth, and preserve meaningful moments. The product focuses on calm visual design, fast writing flow, and secure account management.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="solid-card p-6">
          <h2 className="mb-3 text-xl font-bold">What you can do</h2>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <FiBookOpen className="mt-1 text-teal-500" />
              <span>Create, edit, search, and manage all journal entries from one workspace.</span>
            </li>
            <li className="flex items-start gap-2">
              <FiShield className="mt-1 text-teal-500" />
              <span>Keep your timeline protected with authenticated sessions and secure APIs.</span>
            </li>
            <li className="flex items-start gap-2">
              <FiLock className="mt-1 text-teal-500" />
              <span>Update profile and password settings anytime using account-safe dialogs.</span>
            </li>
          </ul>
        </article>

        <article className="solid-card p-6">
          <h2 className="mb-3 text-xl font-bold">Tech stack</h2>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <FiServer className="mt-1 text-teal-500" />
              <span>Frontend: React + Vite + TailwindCSS + Redux Toolkit</span>
            </li>
            <li className="flex items-start gap-2">
              <FiServer className="mt-1 text-teal-500" />
              <span>Backend: Node.js + Express + MongoDB</span>
            </li>
            <li className="flex items-start gap-2">
              <FiLock className="mt-1 text-teal-500" />
              <span>Auth: JWT with secure cookie-based session handling</span>
            </li>
          </ul>
        </article>
      </section>

      <section className="solid-card p-6 text-center">
        <h2 className="mb-2 text-xl font-bold">Open source repository</h2>
        <p className="section-subtitle mx-auto mb-4 max-w-2xl">
          Explore the full project, backend APIs, and frontend implementation details on GitHub.
        </p>
        <a
          href="https://github.com/Ankit00011/MyBook"
          target="_blank"
          rel="noreferrer"
          className="premium-btn inline-block"
        >
          View on GitHub
        </a>
      </section>
    </div>
  );
};

export default About;
