'use client';

import { FaSlack } from 'react-icons/fa';
import { IoLogoLinkedin } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';

export default function Footer() {
  return (
    <footer className="bg-[#002d62] text-white px-6 md:px-20 py-12">
      {/* Top section */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center border-b border-white/20 pb-10">
        {/* Logo and Status */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">✶ scout</h2>
          <div className="inline-flex items-center px-3 py-1 bg-black text-xs font-medium rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            ALL SYSTEMS OPERATIONAL
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-white/80">
          <div>
            <h4 className="uppercase mb-3 text-white text-xs tracking-wider">Links</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Features</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Docs</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase mb-3 text-white text-xs tracking-wider">Solutions</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Slack Bot</a></li>
              <li><a href="#" className="hover:underline">Discord Bot</a></li>
              <li><a href="#" className="hover:underline">Command</a></li>
              <li><a href="#" className="hover:underline">Onsite Chat</a></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase mb-3 text-white text-xs tracking-wider">Legal</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-white/60">
        <p className="mb-4 md:mb-0">Copyright © 2024 Scout. All rights reserved.</p>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center border border-white/30 hover:bg-white/10 transition rounded">
            <FaSlack className="text-xl" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-white/30 hover:bg-white/10 transition rounded">
            <RxCross1 className="text-xl" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-white/30 hover:bg-white/10 transition rounded">
            <IoLogoLinkedin className="text-xl" />
          </button>
        </div>
      </div>
    </footer>
  );
}
