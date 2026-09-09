//AuthApi signIn, signup
import axiosInstance from '../axiosInstance';

const SignInPost= async(user:any)=>{
  try {
      const response = await axiosInstance.post('/api/auth/signin', {
        email: user.email,
        password: user.password,
   
      }, {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })
      
      if (response.data) {
        // setmessage(response.data.message);
        alert(response.data.message);
        localStorage.setItem('token', response.data.token);

      } else {
        alert(response.data.message);
      }
    } catch (error:any) {
      if (error.response) {
       
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
       
        console.log(error.request);
      } else {
 
        console.log('Error', error.message);
      }
      console.log(error.config);
      alert("Bad Request: " + error.message);
    }
}

const SignUpPost = async (e) => {
   
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const response = await axiosInstance.post('/api/auth/signup', {
        username: user.username,
        password: user.password,
        email: user.email
      });
      
      // console.log(response)
      if (response.data) {
        setmessage(response.data.message);
        alert(response.data.message);
        localStorage.setItem('token', response.data.token);
        // navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setmessage(error.response.data.message);
        alert(error.response.data.message);
      } else {
        // Handle other types of errors
      }
    }
  }
