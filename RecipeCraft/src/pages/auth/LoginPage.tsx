
import AuthLayout from "../../components/layout/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";




const LoginPage=()=>{
  return(
   <>
    <AuthLayout title="Welcome Back"
      subtitle="Login to continue your cooking journey."
      image="/auth/login-food.jpg">
        <LoginForm/>
      </AuthLayout>
   
   </>
  )
}

export default LoginPage;