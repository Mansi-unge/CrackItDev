import React from 'react';
import Logo from './Logo';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12 md:px-10">
      <div className="flex flex-col lg:flex-row flex-wrap gap-10 justify-between">

        {/* Section 1: Logo and Motivational Text */}
        <div className="flex-1 min-w-[360px]">
          <Logo />
          <p className="text-sm italic text-gray-300 my-6">
            "Tech Interviews, Cracked the Right Way."
          </p>
          <p className="text-sm text-gray-400">
            The ultimate destination for tech interview preparation. We help developers crack interviews at top tech companies with comprehensive guides, practice problems, and expert tips.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="flex-1 min-w-[100px]">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/">Home</a></li>
            <li><a href="/topics">Topics</a></li>
            <li><a href="/interview-prep">Interview Prep</a></li>
            <li><a href="/faang">FAANG Guide</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Section 3: Skills */}
        <div className="flex-1 min-w-[340px]">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2 text-sm text-gray-300">
            {[
              'Java', 'Python', 'HTML', 'CSS', 'JS',
              'React', 'Node.js', 'DevOps', 'AWS',
              'DBMS', 'OS', 'DSA', 'System Design'
            ].map((skill, index) => (
              <span key={index} className="bg-gray-800 px-2 py-1 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Section 4: Top Companies */}
        <div className="flex-1 min-w-[120px]">
          <h2 className="text-xl font-semibold mb-4">Top Companies</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Google</li>
            <li>Amazon</li>
            <li>Microsoft</li>
            <li>Meta (Facebook)</li>
            <li>Netflix</li>
            <li>Adobe</li>
          </ul>
        </div>

        {/* Section 5: Newsletter and Social Links */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-xl font-semibold mb-4">Get Interview Tips</h2>
          <p className="text-sm text-gray-400 mb-2">Get tips, updates, and more in your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="bg-white w-full px-3 py-2 text-sm text-black rounded-md outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Send
            </button>
          </form>
          <div className="flex gap-4 text-xl text-gray-400">
            <a href="#"><FaFacebook className="hover:text-white" /></a>
            <a href="#"><FaTwitter className="hover:text-white" /></a>
            <a href="#"><FaLinkedin className="hover:text-white" /></a>
            <a href="#"><FaInstagram className="hover:text-white" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
