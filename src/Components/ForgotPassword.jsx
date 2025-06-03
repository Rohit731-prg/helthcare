import React, { useState } from "react";

function ForgotePassword() {
  const [isOTPsent, setIsOTPsent] = useState(false);
  const [ phoneNumber , setPhoneNumber] = useState('');
  const [otp, setOPT] = useState('');

  const sendOTP = (e) => {
    e.preventDefault();
    setIsOTPsent(true);
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    // Add OTP verification logic here
    alert("OTP Verified!");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-green-200 via-teal-100 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {!isOTPsent ? (
          <form onSubmit={sendOTP} className="flex flex-col">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Forgot Password
            </h2>

            <label className="text-sm font-semibold text-gray-700 mb-2">
              Enter Mobile Number
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="e.g. 9876543210"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOTP} className="flex flex-col">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Verify OTP
            </h2>

            <label className="text-sm font-semibold text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOPT(e.target.value)}
              placeholder="Enter the 4-digit OTP"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotePassword;
