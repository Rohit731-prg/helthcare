import React, { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useStore } from "zustand";

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const transactions = useUserStore((state) => state.transactions);

  useEffect(() => {
    useUserStore.getState().fetchUserByID(id);
    useUserStore.getState().transactionsById(id);
  }, [id]);

  return (
    <>
      {user ? (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 py-8 px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Profile Card */}
            <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6 w-full">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full border-4 border-green-400"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600">{user.phone}</p>
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Wallet Balance</span>
                    <p className="text-xl font-semibold text-green-600">₹ {user.walletBalance}</p>
                  </div>
                </div>
              </div>

              <div className="self-start md:self-center">
                <button
                  className="p-3 bg-yellow-400 hover:bg-yellow-300 text-black rounded-full shadow-md transition"
                  onClick={() => navigate(`/updateProfile/${id}`)}
                  title="Edit Profile"
                >
                  <FaEdit size={20} />
                </button>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white shadow-xl rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Transactions</h3>

              {transactions && transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm md:text-base text-left border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-gray-600 font-medium">
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((t, index) => (
                        <tr
                          key={index}
                          className="bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm"
                        >
                          <td className="px-4 py-2 rounded-l-lg">
                            {new Date(t.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2">Payment</td>
                          <td className="px-4 py-2 text-right rounded-r-lg">₹ {t.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No transactions found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      )}
    </>
  );
}

export default Profile;
