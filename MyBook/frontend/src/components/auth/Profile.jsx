import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const Profile = ({ close }) => {
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user?.data?.email || "");
      setFirstName(user?.data?.firstName || "");
      setLastName(user?.data?.lastName || "");
    }
  }, [user, close]);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateProfile({ firstName, lastName }).unwrap();
      toast.success(response.message);
      close();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Profile Information</h2>
      <p className="mb-1 text-sm text-teal-500">{email}</p>
      <p className="section-subtitle mb-5">Update your first and last name. Your email is fixed for account security.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="form-label">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="input-premium mt-2"
              placeholder="Enter first name"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="form-label">Last name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="input-premium mt-2"
              placeholder="Optional"
            />
          </div>
        </div>

        <button type="submit" className="premium-btn w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
