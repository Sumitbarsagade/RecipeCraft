import SignupForm from "../../components/auth/SignupForm";
import AuthLayout from "../../components/layout/AuthLayout";



const SignupPage=()=>{
  return(
   <AuthLayout title="Welcome Back"
         subtitle="Login to continue your cooking journey."
         image="/auth/login-food.jpg">
            <SignupForm/>
         </AuthLayout>
  )
}

export default SignupPage;