import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext)
    const location = useLocation();
      if(loading){
        return <div className=' w-full flex justify-center items-center mt-80'><span className="loading loading-bars loading-lg"></span></div>
    }

    if(!user){
        return <Navigate state={location?.pathname} to='/login'></Navigate>
    }
    else{
        <Navigate to='/'></Navigate>
    }


    return (
        children
    );
};

export default PrivateRoute;