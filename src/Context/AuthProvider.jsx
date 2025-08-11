import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

     const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    }


    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }

  const logIn = (email, password) => {
    console.log("Email:", email, "Password:", password);
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
};

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }





    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser)

        })
        return () => {
            unsubscribe();
        }


    }, [])

    const userInfo = {
        createUser,
        signInWithGoogle,
        updateUserProfile,
        logIn,
        user,
        loading,
        logOut

    };
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;