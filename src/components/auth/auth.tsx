import React, {useState } from 'react'
import { supabaseClient } from '../../libraries/supabase';


const ManageAuth = () => {
    // HOOKS
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    // BOOLEAN
    const [isSignIn, setIsSignIn] = useState(false);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSignIn) { //LOGIn
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: userEmail,
                password: userPassword,
            });

            if (error) {
                console.error("Error in logging In : ", error.message);
            }
        } else {
            //CREATE NEW ACCOUNT
            alert("creating account")
            const { error } = await supabaseClient.auth.signUp({
                email: userEmail,
                password: userPassword,
                options: {
                    data: {
                        name: "Talha",
                        email: "Talha Bhatti",
                    },
                    emailRedirectTo: "http://youtube.com",
                }
            })
            if (error) {
                console.error("Error in Account Create : ", error.message);
            }

        }
    }




    return (
        <div className='h-screen w-full'>
            <div className='h-full w-full flex items-center justify-center p-20 text-black'>
                <form onSubmit={handleSubmit}>
                    <div className="main-container grid grid-cols-1 space-x-2 space-y-2 bg-white p-10 rounded-lg max-h-[80vh] overflow-y-auto w-full">
                        <h1 className='text-center font-semibold text-xl'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
                        <div className="flex flex-col items-start">
                            <label htmlFor="name" className=' mt-1 '>Email</label>
                            <input placeholder='Enter Email' value={userEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUserEmail(e.target.value) }} type="email" id="email" className=" placeholder:text-sm   border-yellow-500 rounded-sm  border outline-none px-3 py-1" />
                        </div>
                        <div className="flex flex-col items-start">
                            <label htmlFor="" className=' mt-1'>Password</label>
                            <input placeholder='Enter Password' value={userPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUserPassword(e.target.value) }} type="password" id="password" className="placeholder:text-sm   border-yellow-500 rounded-sm  border outline-none px-3 py-1" />
                        </div>

                        <div className="w-full flex flex-col">
                            <button type='submit' className="bg-yellow-500 hover:bg-yellow-600 mt-3 rounded-sm cursor-pointer w-full  px-4 py-1  text-white font-medium">{isSignIn ? "Sign In" : "Sign Up"}</button>
                            <div className='flex gap-1'>
                                <p>{isSignIn ? "Don't have an account?" : "Already have an account?"}</p>
                                <b className='text-yellow-500' onClick={() => { setIsSignIn((prev) => !prev) }}>{isSignIn ? "Sign Up" : "Sign In"}</b>
                            </div>
                        </div>
                        {/* 
            <div className="w-full">
              <button id="submit" className="bg-yellow-500 hover:bg-yellow-600 mt-3 rounded-sm cursor-pointer px-4 py-1 text-white">By Google</button>
            </div>
 */}

                    </div>

                </form>
            </div>

        </div>
    )
}

export default ManageAuth
