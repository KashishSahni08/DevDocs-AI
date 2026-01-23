'use client';
import React from 'react'

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-[#020617] text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            📄
          </div>
          <span className="font-semibold text-lg">DevDocsAI</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <span className="cursor-pointer hover:text-white">Features</span>
          <span className="cursor-pointer hover:text-white">Preview</span>
          <span className="cursor-pointer hover:text-white">Pricing</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-gray-300 hover:text-white"
          >
            Sign in
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-sm font-medium"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="text-center py-4 px-6 mb-40">
        <h1 className="text-8xl font-bold leading-tight">
          Generate Beautiful{" "}
          <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
           <br/> Documentation
          </span>
          <br /> In Seconds
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mt-6">
          Transform your ideas into professional documentation instantly.
          AI-powered generation made simple,fast,and reliable.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 font-medium"
          >
            Start Creating Free →
          </button>
          <button className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900">
            Watch Demo
          </button>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 text-center gap-10 py-1">
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
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-7 py-15 mx-auto text-center">
        <h1 className="text-4xl font-bold leading-tight items-center justify-center">
          Everything You Need to{" "}
          <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
           Build Great Docs
          </span>
        </h1>

        <p className="text-center text-gray-400 mb-14">
          Powerful features designed to help you create, manage, and deploy
          beautiful documentation with ease.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#020617] border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-10 py-24">
        <div className="max-w-4xl mx-auto bg-linear-to-br from-[#020617] to-[#020617] border border-gray-800 rounded-2xl text-center p-14">
          <h2 className="text-4xl font-bold">
            Ready to Build{" "}
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Amazing Docs?
            </span>
          </h2>

          <p className="text-gray-400 mt-4">
            Join thousands of developers and teams who trust DocuAI.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => router.push("/signup")}
              className="px-6 py-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 font-medium"
            >
              Get Started for Free →
            </button>
            <button className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300">
              Contact Sales
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            No credit card required • Free tier available forever
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-800 px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-gray-400">
        <div>
          <h4 className="text-white font-semibold mb-3">DocuAI</h4>
          <p>AI-powered documentation generation for modern teams.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Product</h4>
          <ul className="space-y-2">
            <li>Features</li>
            <li>Templates</li>
            <li>Pricing</li>
            <li>Changelog</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2">
            <li>Documentation</li>
            <li>API Reference</li>
            <li>Guides</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            <li>About</li>
            <li>Careers</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </footer>

      <div className="text-center text-xs text-gray-500 py-6">
        © 2025 DevDocsAI. All rights reserved.
      </div>
    </div>
  );
}

const features = [
  {
    icon: "",
    title: "AI-Powered Generation",
    desc: "Describe your documentation in plain English and let AI do the rest.",
  },
  {
    icon: "",
    title: "Beautiful Templates",
    desc: "Professionally designed templates optimized for readability.",
  },
  {
    icon: "",
    title: "Real-Time Preview",
    desc: "Instant preview as you type with live updates.",
  },
  {
    icon: "",
    title: "Code Highlighting",
    desc: "Automatic syntax highlighting for 100+ languages.",
  },
  {
    icon: "",
    title: "One-Click Deploy",
    desc: "Publish docs instantly with SSL and CDN support.",
  },
  {
    icon: "",
    title: "Access Control",
    desc: "Secure docs with authentication and permissions.",
  },
];