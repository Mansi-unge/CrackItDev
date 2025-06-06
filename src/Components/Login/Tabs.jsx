import React from 'react';

const Tabs = ({ activeTab, setActiveTab, resetFields }) => {
  return (
    <div className="mb-8 flex space-x-10">
      {['login', 'signup'].map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            resetFields();
          }}
          className={`text-xl font-semibold pb-2 border-b-2 transition-all duration-300 ease-in-out ${
            activeTab === tab
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-gray-400 hover:text-indigo-500'
          }`}
        >
          {tab === 'login' ? 'Login' : 'Sign Up'}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
