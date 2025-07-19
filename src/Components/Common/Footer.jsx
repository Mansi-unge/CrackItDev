import React, { useState } from 'react';
import axios from 'axios';
import Logo from './Logo';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://crackitdev-1.onrender.com/api/newsletter/subscribe', { email });
      setStatus(res.data.message);
      setEmail('');
    } catch (err) {
      console.error("❌ API Error:", err);
      setStatus('Something went wrong. Try again later.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white px-4 py-10 sm:px-6 md:px-10 lg:px-16">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

        {/* Section 1: Logo + Tagline */}
        <div>
          <Logo />
          <p className="text-sm italic text-gray-300 my-4">
            "Tech Interviews, Cracked the Right Way."
          </p>
          <p className="text-sm text-gray-400">
            The ultimate destination for tech interview preparation. We help developers crack interviews at top tech companies with comprehensive guides, practice problems, and expert tips.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="lg:ms-16">
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/">Home</a></li>
            <li><a href="/topics">TheoryHub</a></li>
            <li><a href="/challenges">CodeLab</a></li>
            <li><a href="/quiz">QuickQuiz</a></li>
          </ul>
        </div>

        {/* Section 3: Skills */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Skills</h2>
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
        <div>
          <h2 className="text-lg font-semibold mb-3">Top Companies</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Google</li>
            <li>Amazon</li>
            <li>Microsoft</li>
            <li>Meta (Facebook)</li>
            <li>Netflix</li>
            <li>Adobe</li>
          </ul>
        </div>

        {/* Section 5: Newsletter + Social */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Get Interview Tips</h2>
          <p className="text-sm text-gray-400 mb-3">Get tips, updates, and more in your inbox.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="bg-white w-full px-3 py-2 text-sm text-black rounded-md outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Send
            </button>
          </form>
          {status && <p className="text-xs text-gray-300 mt-2">{status}</p>}

          <div className="flex gap-4 text-xl text-gray-400 mt-4">
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
