import React, { useEffect } from "react";
import useUserStore from "../store/userStore";
import { RiImageEditFill } from "react-icons/ri";
import { Toaster  } from "react-hot-toast";
import { useParams } from "react-router-dom";

function UpdateProfile() {
  const { id } = useParams();
  const user = useUserStore((state) => state.user);

  const handleImageChange = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      await useUserStore.getState().setUpdatedProfileImage(base64Image);
    };
  };

  useEffect(() => {
    console.log("Fetching user by ID:", id);
    useUserStore.getState().fetchUserByID(id);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      {user && (
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Update Profile Picture
          </h2>

          <div className="relative">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-green-400"
            />
            <label className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full cursor-pointer hover:bg-yellow-300 transition">
              <RiImageEditFill size={20} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="w-full text-left space-y-3 text-gray-700 mt-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">Full Name</p>
              <p className="text-lg">{user.name}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Phone Number
              </p>
              <p className="text-lg">{user.phone}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">Gender</p>
              <p className="text-lg">{user.gender || "Not specified"}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Date of Birth
              </p>
              <p className="text-lg">
                {user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "Not specified"}
              </p>
            </div>
          </div>
          <Toaster  />
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
