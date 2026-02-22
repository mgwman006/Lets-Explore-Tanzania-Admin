import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserStatus } from "../models/auth";
import { OperatorDetails } from "../models/operator";
import { Alert } from "antd";


type UserContextType = {
    userStatus: UserStatus;
    setUserStatus: (status: UserStatus) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    operator: OperatorDetails | null;
    setOperator: (operator: OperatorDetails | null) => void;
};

// Create the UserContext with a default value of undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.Unknown);
    const [user, setUser] = useState<User | null>(null);
    const [operator, setOperator] = useState<OperatorDetails | null>(null);
    
    //Restore session on app load
    useEffect(() => {
        const storedUserStatus = localStorage.getItem("userStatus");
        const storedUser = localStorage.getItem("user");
        const storedOperator = localStorage.getItem("operator");

        if (storedUserStatus && storedUser && storedOperator) {
           
            setUser(JSON.parse(storedUser));

            if(storedUserStatus === "2") 
            {
                setUserStatus(UserStatus.LoggedOut);
            }
            else if(storedUserStatus === "1") 
            {
                setUserStatus(UserStatus.LoggedIn);
            }
            else 
            {
                setUserStatus(UserStatus.Unknown);
            }
            
            setOperator(JSON.parse(storedOperator));
           
        } else {
            setUserStatus(UserStatus.LoggedOut);
        }
    }, []);

    return (
        <UserContext.Provider value={{ userStatus, setUserStatus, user, setUser, operator, setOperator }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}