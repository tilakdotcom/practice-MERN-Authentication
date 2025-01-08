import { refreshTokenRequest } from "@/lib/api";
import { useAppSelector } from "@/store/hooks";
import React from "react";

const WelcomePage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto mt-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Welcome to Your Dashboard!
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your account, explore features, and customize your experience.
          We are excited to have you on board!
        </p>
        <div className="">
          <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-green-700">
              Your Profile
            </h2>
            <p className="text-gray-700 mt-2">
              Your profile information and preferences.
            </p>
            <div className=" capitalize">
              <button
                onClick={() => refreshTokenRequest()}
                className="py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
              >
                View Profile
              </button>

              <pre className=" p-4 ">
                {user && JSON.stringify(user, null, 4)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
