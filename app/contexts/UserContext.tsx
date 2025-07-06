import React, { createContext, useContext, useState } from "react";
import { User, UserStatus } from "../models/auth";
import { OperatorDetails } from "../models/operator";


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
    const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.LoggedOut);
    const [user, setUser] = useState<User | null>(null);
    const [operator, setOperator] = useState<OperatorDetails | null>(null);        

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