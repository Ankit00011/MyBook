import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChangePasswordMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const Password = ({ close }) => {
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user?.data?.email || "");
      setFirstName(user?.data?.firstName || "");
    }
  }, [user]);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success(response?.message);
      setOldPassword("");
      setNewPassword("");
      close();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Change Password</h2>
      <p className="mb-1 text-sm text-teal-500">{email}</p>
      <p className="section-subtitle mb-5">
        Hi {firstName}. Confirm your current password before setting a new one.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="oldPassword" className="form-label">Current password</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            className="input-premium mt-2"
            placeholder="Current password"
            required
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="form-label">New password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="input-premium mt-2"
            placeholder="New password"
            required
          />
        </div>

        <button type="submit" className="premium-btn w-full" disabled={isLoading}>
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Password;
