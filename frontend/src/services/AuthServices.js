import axios from 'axios';

export const Register = async (firstName, lastName, email, password, phone) =>{
    console.log('Calling Signup with', { firstName, lastName, email, password, phone }); // Add this line

    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
        firstName,
        lastName,
        email,
        password,
        phone,
      })
      .then((response) => {
        // handle successful response
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });

};

export const Login = async (email, password)=>{
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`,{
        email,
        password
    });
};
