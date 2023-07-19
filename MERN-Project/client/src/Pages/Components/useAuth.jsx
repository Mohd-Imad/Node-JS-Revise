import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode'; // Install this package for token decoding

const useAuth = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    // Get the token from cookies or local storage
    const token = Cookies.get('jwtCookie'); // You can use your actual token key

    if (token) {
      try {

        // Decode the token to get its payload
        const decodedToken = jwt_decode(token);


        // Check if the token is not expired
        const currentTime = Date.now() / 1000; // Get current time in seconds
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          // Token has expired

          return false;
        }
        // console.log('token:success')

        return true; // User is authenticated
      } catch (error) {

        console.error('Error decoding token:', error);
        return false; // Token is invalid or expired
      }
    }


    return false; // Token does not exist
  };
//   console.log('token:check',!isAuthenticated())
  // If the user is not authenticated, navigate to the login page
  if (!isAuthenticated()) {
    navigate('/login'); // Redirect to the login page
  }
};

export default useAuth;
