'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "Lowercase letter is required")
    .matches(/[A-Z]/, "Uppercase letter is required")
    .matches(/[0-9]/, "Number is required")
    .matches(/\W/, "Special character is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function SignUp() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await axios.post(
          "http://localhost:5000/user/register", 
          values,
          { headers: { "Content-Type": "application/json" } }
        );

        toast.success("User registered successfully");
        resetForm();

        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user));
        }
          console.log("User stored:", localStorage.getItem("user"));

        router.push("/");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    },
  });

  /* ---------------- GOOGLE LOGIN ---------------- */
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

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-center bg-black">
        <div className="w-full max-w-125 px-6">

          {/* Back */}
          <p className="text-sm text-gray-400 mb-4 cursor-pointer"
          onClick={() => router.push("/")}>
            ← Back to home
          </p>

          {/* Title */}
          <h2 className="text-3xl font-semibold text-white mb-2">
            Create your account
          </h2>

          <p className="text-gray-400 mb-6">
            Start generating amazing documentation today
          </p>

          {/* Full Name */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="your name"
              value={formik.values.name}
            onChange={formik.handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#0b1220] border border-[#1f2937] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             {formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}

          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formik.values.email}
             onChange={formik.handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#0b1220] border border-[#1f2937] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             {formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
               value={formik.values.password}
            onChange={formik.handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#0b1220] border border-[#1f2937] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             {formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
          </div>

          {/* Create Account Button */}
          <button type="submit"
            className="
              w-full py-3 rounded-lg font-semibold
              bg-linear-to-r
              from-[hsl(199_89%_48%)]
              to-[hsl(280_80%_60%)]
              text-[hsl(222_47%_4%)]
              shadow-[0_0_10px_hsl(199_89%_48%)]
              transform transition-all duration-200
              hover:scale-[1.03]
              active:scale-[0.98]
            "
          >
         Create Account
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
            Already have an account?{" "}
            <span className="text-blue-400 cursor-pointer"
           onClick={() => router.push("/login")}
            >Sign in</span>
          </p>

        </div>
      </div>
    </div>
  );
}
          