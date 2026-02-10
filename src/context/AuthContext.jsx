import { createContext, useEffect, useContext, useState } from "react"
import { supabase } from "../supabaseClient.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign up new user with email and password
    const signUpNewUser = async ( email, password ) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.error("Error signing up:", error.message);
            return { success: false, error };
        };

        return { success: true, data };
    };

    // Sign in existing user with email and password
    const signInUser = async ( email, password ) => {
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                console.error("Error signing in:", error.message);
                return { success: false, error };
            };

            console.log('Sign in success: ', data);
            return { success: true, data };
        }catch(error){
            console.error("Error occurred:", error.message);
        }
    };

    // Sign out the current user
    const signOut = () => {
        const { error } = supabase.auth.signOut();

        if (error) {
            console.error("Error signing out:", error.message);
        }
    };

    // Listen for changes in authentication state
    useEffect(() => {
        setLoading(true);

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);


    return (
        <AuthContext.Provider value={{ session, loading, signUpNewUser, signOut, signInUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}