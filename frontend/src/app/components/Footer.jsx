"use client";
import { useRouter } from "next/navigation";

export default function Footer () {
    const router = useRouter();
    return(
    <footer className="border-t border-gray-800 px-10 py-16 text-sm text-gray-400">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

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

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-12 text-center text-xs text-gray-500">
        © 2025 DevDocsAI. All rights reserved.
      </div>

    </footer>
  );
}