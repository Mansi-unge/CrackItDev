// components/Dashboard/UserInfoCard.jsx
import React from "react";
import dayjs from "dayjs";

const UserInfoCard = ({ user }) => {
  if (!user) return null;

  const { username, email, createdAt } = user;

  return (
    <div className="p-6 space-y-1 text-gray-700 bg-white  border-2 rounded-3xl hover:shadow-xl border-blue-300 ">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-blue-700">
        User Info
      </h2>
      <div className="flex items-center gap-4">
        <span className="text-blue-700 font-semibold w-24">Username:</span>
        <span className="text-gray-800">{username}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-blue-700 font-semibold w-24">Email:</span>
        <span className="text-gray-800">{email}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-blue-700 font-semibold w-24">Joined:</span>
        <span className="text-gray-800">{dayjs(createdAt).format("MMM D, YYYY")}</span>
      </div>
    </div>
  );
};
export default UserInfoCard;
