
import { useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Navbar from './components/Navbar';
import HospitalMap from './components/Map';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [location, setLocation] = useState({});
  const [locationError, setLocationError] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const data = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            "Authorization": `Bearer ${tokenResponse.access_token}`
          }
        })
        console.log(data.data)
        const { email, name, picture } = data.data;
        localStorage.setItem("userInfo", JSON.stringify({ name, email, picture }));
        window.location.reload();
      } catch (err) {
        console.log(err)
      }
    },
    onError: error => console.log(error)
  });

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    const jsonUserInfo = JSON.parse(userInfo);
    if (jsonUserInfo) {
      setIsLoggedIn(true);
      setCurrentUser(jsonUserInfo);
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }, []);

  const successCallback = (position) => {
    const { coords } = position;
    const lattitude = coords.latitude;
    const longitude = coords.longitude;
    setLocation({ lattitude: parseFloat(lattitude), longitude: parseFloat(longitude) })
  };

  const errorCallback = (error) => {
    setLocationError(error.message);
  };

  return (
    <>
      {
        !isLoggedIn &&
        <div className="h-screen w-full flex justify-center items-center bg-gray-300">
          <button onClick={() => login()} className='border border-gray-400 px-5 py-3 rounded-md bg-white text-black text-2xl'>Sign in with Google 🚀</button>
        </div >
      }
      {
        isLoggedIn && (
          <div>
            <Navbar name={currentUser.name} picture={currentUser.picture} email={currentUser.email} />
            {locationError}
            <HospitalMap lat={location.lattitude} lng={location.longitude} />
          </div>
        )
      }
    </>
  )
}

export default App
