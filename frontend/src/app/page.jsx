"use client";

import React from "react";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Generate documentation in seconds with advanced AI",
  },
  {
    icon: "🎨",
    title: "Beautiful Design",
    desc: "Professional templates that look amazing out of the box",
  },
  {
    icon: "🔧",
    title: "Easy to Customize",
    desc: "Customize colors, fonts, and layouts to match your brand",
  },
  {
    icon: "📱",
    title: "Responsive",
    desc: "Works perfectly on all devices and screen sizes",
  },
  {
    icon: "🔐",
    title: "Secure",
    desc: "Your content is encrypted and kept safe",
  },
  {
    icon: "📊",
    title: "Analytics",
    desc: "Track usage and get insights about your documentation",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="text-center py-20 px-6 mb-40">
        <h1 className="text-7xl md:text-8xl font-bold leading-tight">
          Generate Beautiful{" "}
          <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            <br /> Documentation
          </span>
          <br /> In Seconds
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mt-6">
          Transform your ideas into professional documentation instantly.
          AI-powered generation made simple, fast, and reliable.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-3 rounded-lg bg-linear-to-r  from-blue-500 to-purple-500 font-medium"
          >
            Start Creating Free →
          </button>

          <button
            onClick={() => router.push("/builder")}
            className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900"
          >
            Start Creating
          </button>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 text-center gap-10 py-10">
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
      <section className="px-7 py-24 mx-auto text-center">
        <h2 className="text-4xl font-bold leading-tight">
          Everything You Need to{" "}
          <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Build Great Docs
          </span>
        </h2>

        <p className="text-gray-400 mb-14">
          Powerful features designed to help you create, manage, and deploy
          beautiful documentation with ease.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#020617] border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-linear-to-r  from-blue-500 to-purple-500 flex items-center justify-center mb-4">
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
        <div className="max-w-4xl mx-auto bg-[#020617] border border-gray-800 rounded-2xl text-center p-14">
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
    </>
  );
}