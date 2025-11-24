import { createContext, useState } from "react"



export const DataSender = createContext<string[] | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [userSession,setUserSession]=useState();

    return (
        <DataSender.Provider value={userSession,setUserSession} >
            {children}
        </DataSender.Provider>
    )
}
export default AuthProvider