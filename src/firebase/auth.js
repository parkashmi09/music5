import { 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult,
  GoogleAuthProvider, 
  FacebookAuthProvider 
} from "firebase/auth";
import { auth } from "./config";

// Provider configurations
const configureGoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
    login_hint: "",
    include_granted_scopes: "true",
    access_type: "offline",
  });
  return provider;
};

const configureFacebookProvider = () => {
  const provider = new FacebookAuthProvider();
  provider.setCustomParameters({
    display: "popup",
  });
  return provider;
};

// Sign in with Google
export const signInWithGoogle = async (useRedirect = false) => {
  const provider = configureGoogleProvider();
  
  try {
    if (useRedirect) {
      return await signInWithRedirect(auth, provider);
    } else {
      return await signInWithPopup(auth, provider);
    }
  } catch (error) {
    console.error("Google Sign In Error:", error);
    throw error;
  }
};

// Sign in with Facebook
export const signInWithFacebook = async (useRedirect = false) => {
  const provider = configureFacebookProvider();
  
  try {
    if (useRedirect) {
      return await signInWithRedirect(auth, provider);
    } else {
      return await signInWithPopup(auth, provider);
    }
  } catch (error) {
    console.error("Facebook Sign In Error:", error);
    throw error;
  }
};

// Get redirect result (to be called on component mount)
export const getAuthRedirectResult = async () => {
  try {
    return await getRedirectResult(auth);
  } catch (error) {
    console.error("Failed to get redirect result:", error);
    throw error;
  }
}; 