import { useEffect } from 'react';
import { getAuthRedirectResult } from './auth';
import { userService } from '../services/userService';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/slices/authSlice';

const AuthRedirectHandler = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        // Get the result from the redirect operation
        const result = await getAuthRedirectResult();
        
        // If we have a result, process it
        if (result) {
          const user = result.user;
          console.log("Redirect authentication successful:", user);
          
          // Determine the provider used (Google or Facebook)
          const providerId = result.providerId || 
            (user.providerData.length > 0 ? user.providerData[0].providerId : null);
          
          const socialType = providerId?.includes('google') ? 'Google' : 
                            providerId?.includes('facebook') ? 'Facebook' : 'Unknown';
          
          // Prepare data for social login API
          const socialLoginData = {
            fullName: user?.displayName || "",
            firstName: user?.displayName?.split(' ')[0] || user?.displayName || "",
            lastName: user?.displayName?.split(' ').slice(1).join(' ') || "",
            email: user?.email || "",
            mobileNumber: user?.phoneNumber || "",
            deviceToken: "",
            socialId: user?.uid || "",
            socialType
          };
          
          // Call your API service
          const userData = await userService.socialLogin(socialLoginData);
          
          // Update Redux state
          dispatch(
            setUser({
              user: userData.user,
              accessToken: userData.accessToken,
            })
          );
        }
      } catch (error) {
        console.error("Error handling auth redirect:", error);
      }
    };
    
    handleRedirectResult();
  }, [dispatch]);
  
  // This component doesn't render anything
  return null;
};

export default AuthRedirectHandler; 