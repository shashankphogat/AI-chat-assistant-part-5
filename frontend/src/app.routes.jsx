import {createBrowserRouter} from "react-router";
import Login from "./features/authentication/pages/login.jsx";
import Registration from "./features/authentication/pages/registration.jsx";
import Home from "./features/chat/pages/Home.jsx";
import Protected from "./protected.jsx";

let router=createBrowserRouter(
    [
        {   path:"/login",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Registration/>
        },
        {
            path:"/",
            element:<Protected><Home/></Protected>
        }
    ]
)

export default router