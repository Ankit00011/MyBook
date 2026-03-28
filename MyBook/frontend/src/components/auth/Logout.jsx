import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = ({ close }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      dispatch(removeUserInfo());
      navigate("/");
      close();
      toast.success(response.message);
    } catch {
      toast.error("Logout failed.");
    }
  };

  return (
    <div>
      <h3 className="mb-2 text-xl font-bold">Log out from MyBook?</h3>
      <p className="section-subtitle mb-6">You can sign back in anytime to continue from where you left.</p>
      <div className="flex flex-wrap justify-end gap-2">
        <button onClick={close} className="premium-btn-outline" type="button">
          Cancel
        </button>
        <button onClick={handleLogout} className="premium-btn-danger" disabled={isLoading} type="button">
          {isLoading ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </div>
  );
};

export default Logout;
