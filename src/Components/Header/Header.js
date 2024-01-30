import React , {useEffect} from "react";
import { LOGO } from "../../Utils/Constants";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Utils/Firebase";
import { useSelector , useDispatch} from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../../Slices/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/Error");
      });
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,password} = user;
        dispatch(addUser({uid:uid,email:email,password:password}));
        navigate('/Browse');
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
      }
    });

    return ()=> unsubscribe();

  },[])

  return (
    <div className="absolute  z-10 py-2 w-screen flex justify-between items-center px-8 ">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logoImage" />
      {user && (
        <div className="flex gap-1">
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
