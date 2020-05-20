import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../Fifebase.config";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route,Redirect } from "react-router-dom";
//import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const AuthContext= createContext();
export const AuthContextProvider=(props)=>{
    const auth=Auth();
return <AuthContext.Provider value={auth}>{props.children}></AuthContext.Provider>
}
export const useAuth=() => useContext(AuthContext);
export function PrivateRoute({ children, ...rest }) {
    const auth=useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
const getUser=user=>{
    const {displayName, email, photoURL} = user;
            return {name: displayName, email,photo: photoURL};
}
const Auth=()=>{
    const[user,setUser]=useState(null);
    
    const signInWithGoogle=()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(res=>{
            const signedInUser=getUser(res.user);
            //const {displayName, email, photoURL} = res.user;
            //const signedInUser={name: displayName, email,photo: //photoURL};
            setUser(signedInUser);
            return res.user;
        })
        .catch(err=>{
            console.log(err);
            setUser(null);
            return err.message;
        })
    }
    const signOut=()=>{
       return firebase.auth().signOut().then(function() {
            setUser(null);
            return true;
        // Sign-out successful.
      }).catch(function(error) {
          return false;
        // An error happened.
      });
    }
      useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              const currentUser=getUser(user);
              setUser(currentUser);
            } else {
              
            }
          });
          
      },[]);
    return {
        signInWithGoogle,
        user,
        signOut
    }

}
export default Auth;