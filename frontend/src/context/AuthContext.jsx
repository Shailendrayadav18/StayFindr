import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isHostMode, setIsHostMode] = useState(false);

    // check login on app load
    useEffect(() => {

        const checkAuth = async () => {

            try {
                const res = await fetch("http://localhost:8080/verifyUser", {
                    credentials: "include"
                });

                const data = await res.json();

                if (data.authenticated) {
                    setUser(data.user);
                }

            } catch (err) {
                console.log("Auth check failed");
            }

            setLoading(false);
        };

        checkAuth();

        const mode = localStorage.getItem("mode");
        if (mode === "host") {
            setIsHostMode(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, isHostMode, setIsHostMode }}>
            {children}
        </AuthContext.Provider>
    );
}