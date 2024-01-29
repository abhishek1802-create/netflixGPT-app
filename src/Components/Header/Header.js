import React from "react";
import { LOGO } from "../../Utils/Constants";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Utils/Firebase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/Error");
      });
  };

  return (
    <div className="absolute  z-10 py-2 w-screen flex justify-between items-center px-8 ">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logoImage" />
      {user && (
        <div className="flex gap-1">
          {/* <p>name :{user.displayName}</p> */}
          <button
            className="p-1 px-2 bg-red-600 text-white rounded-md"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
