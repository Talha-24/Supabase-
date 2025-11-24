import { Fragment, useEffect, useState } from 'react'
import './App.css'
import TaskManager from './components/task-manager/create';
import ManageAuth from './components/auth/auth';
import { supabaseClient } from './libraries/supabase';
import { toast, Toaster } from 'sonner';
import Login from './components/auth/login';
import CreateAccount from './components/auth/create-account';
import ForgotPassword from './components/auth/forgot-password';
import NewPassword from './components/auth/new-password';

function App() {

  const [userSession, setUserSession] = useState<any | null>();


  useEffect(() => {
    getUserSession();
    const { data: AuthClient } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        setUserSession(session);
      } else if (event == "SIGNED_OUT") {
        setUserSession(session);
      };
    })

    return () => {
      AuthClient.subscription.unsubscribe();
    }

  }, []);


  const getUserSession = async () => {
    const { data, error } = await supabaseClient.auth.getSession();
    if (data.session) {
      setUserSession(data.session);
    }
  }



  const logOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      toast.success("Logout Success");
    }
  }

  return (
    <Fragment>
      {/* {userSession ?
        <>
          <button onClick={logOut} className='border-1 p-2 '>Log Out</button>
          <TaskManager />
        </>
        :
        <ManageAuth />
      } */}
      {/* <Login /> */}
      <CreateAccount/>
      {/* <ForgotPassword/> */}
      {/* <NewPassword/> */}
      {/* ---TOASTER--- */}

      <Toaster position='top-right' duration={3000} />
    </Fragment>
  )
}

export default App
// 