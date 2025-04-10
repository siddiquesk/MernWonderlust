import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import axios from "axios";
import { toast } from "react-hot-toast";

function Logout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.get(
          "https://sufiyan-airbnb-vella.onrender.com/api/v1/logout",
          {
            withCredentials: true,
          }
        );
        setUser(null);
        toast.success("Logged out");
        navigate("/");
      } catch (error) {
        toast.error("Logout failed");
        console.error("Logout error:", error);
      }
    };

    logoutUser();
  }, [setUser, navigate]);

  return null;
}

export default Logout;
