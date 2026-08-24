import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import Loader from './features/authentication/components/Loader';

const Protected = ({children}) => {
    let {user,loading}=useSelector((state)=>state.auth)

    if(!user && !loading){
        return <Navigate to="/login" replace></Navigate>
    }

    if(loading){
        return <main>
            <Loader/>
        </main>
    }

  return (
    children
  )
}

export default Protected