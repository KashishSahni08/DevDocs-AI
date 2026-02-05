'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "Lowercase letter is required")
    .matches(/[0-9]/, "Number is required")
    .matches(/\W/, "Special character is required")
    .min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const result = await axios.post(
          "http://localhost:5000/user/authenticate",
          values
        );

        console.log("Login Response:", result.data);
        console.log("Token received:", result.data.token);

        toast.success("Login Successful");

        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user)
        );
          console.log("Token stored in localStorage:", localStorage.getItem("token"));
          console.log("User stored:", localStorage.getItem("user"));
          router.push("/");
        } else {
          console.error("No token in response");
          toast.error("Token not received from server");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            toast.error("Invalid email or password");
          } else {
            toast.error(err.response.data.message || "Something went wrong");
          }
        } else {
          toast.error("Server not reachable");
        }
        console.error("Login error:", err);
      }
    },
  });
  const googleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          const userInfo = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            }
          );
  
          const res = await axios.post(
            "http://localhost:5000/user/google-auth",
            {
              email: userInfo.data.email,
              name: userInfo.data.name,
              picture: userInfo.data.picture,
            }
          );
  
          localStorage.setItem("token", res.data.token);
          toast.success("Google login successful");
 
          router.push("/");
        } catch (err) {
          console.error(err);
          toast.error("Google login failed");
        }
      },
      onError: () => toast.error("Google sign-in failed"),
    });
  
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SECTION */}
      <div className="relative flex flex-col justify-center px-12 bg-linear-to-br from-[#0b3b3b] via-[#0b2a2a] to-[#05070c]">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
            📄
          </div>
          <span className="text-white text-xl font-semibold">DevDocsAI</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold text-white leading-tight ">
          Generate Beautiful{" "}
          <span className="text-blue-400">Documentation</span>
          <br />In Seconds
        </h1>

        <p className="text-gray-300 max-w-md mb-12">
          Generate documentation that stays up to date AI-powered documentation built for modern development teams.
          Write once,maintain effortlessly.
        </p>

        {/* Stats */}
        <div className="flex gap-10 text-white">
          <div>
            <h3 className="text-xl font-semibold">AI Generated</h3>
            <p className="text-gray-400 text-sm">Automatic documentation</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Developer Focused</h3>
            <p className="text-gray-400 text-sm">Clean and readable output</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Production Ready</h3>
            <p className="text-gray-400 text-sm">Ready for real projects</p>
          </div>
        </div>
      </div> 

      <div className="flex items-center justify-center bg-black">
  <div className="w-full max-w-125 px-6">

    {/* Back */}
    <p className="text-sm text-gray-400 mb-4 cursor-pointer"
      onClick={() => router.push("/")}>
      ← Back to home
    </p>

    {/* Heading */}
    <h2 className="text-3xl font-semibold text-white mb-2">
      Welcome back
    </h2>

    <p className="text-gray-400 mb-6">
      Enter your credentials to access your account
    </p>

    {/* Email */}
    <form onSubmit={formik.handleSubmit} className="space-y-4">
    <div className="mb-4">
      <label className="block text-sm text-gray-400 mb-1">Email</label>
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        className="w-full px-4 py-3 rounded-lg bg-[#0b1220] border border-[#1f2937] text-white"
      />
       {formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
    </div>

    {/* Password */}
    <div className="mb-2">
      <label className="block text-sm text-gray-400 mb-1">Password</label>
      <input
        type="password"
        placeholder="••••••••"
        name="password"
      value={formik.values.password}
       onChange={formik.handleChange}
        className="w-full px-4 py-3 rounded-lg bg-[#0b1220] border border-[#1f2937] text-white"
      />
      {formik.errors.password && (
      <p className="text-red-500 text-sm">{formik.errors.password}</p>
       )}
    </div>

    {/* Forgot */}
    <div className="flex justify-end mb-6">
      <span className="text-sm text-blue-600 cursor-pointer">
        Forgot password?
      </span>
    </div>

    {/* Button */}
    <button
    type="submit"
  className=" w-full py-3 rounded-lg font-semibold bg-linear-to-r from-[hsl(199_89%_48%)] to-[hsl(280_80%_60%)] text-[hsl(222_47%_4%)]
    shadow-[0_0_10px_hsl(199_89%_48%)] transform
    transition-all duration-200 ease-out
    hover:scale-[1.03]
    hover:shadow-[0_0_1px_hsl(199_89%_48%)]
    
    active:scale-[0.98]">
  Sign in
</button>
</form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="px-3 text-xs text-gray-400">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>
{/* GOOGLE BUTTON */}
        <button
          onClick={() => googleLogin()}
          className="w-full h-12 flex items-center justify-center gap-3
          rounded-lg border border-gray-700 bg-[#0b1220] text-white"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="w-5 h-5"
            alt="Google"
          />
          Continue with Google
        </button>

    {/* Footer */}
    <p className="text-center text-gray-400 text-sm mt-6">
      Don’t have an account?{" "}
       <span
      onClick={() => router.push("/signup")}
      className="text-blue-600 cursor-pointer">Sign up</span>
    </p>

    <p className="text-center text-xs text-gray-500 mt-3">
      By continuing, you agree to our{" "}
      <span className="underline">Terms of Service</span> and{" "}
      <span className="underline">Privacy Policy</span>
    </p>

  </div>
</div>
    </div>

  );
}