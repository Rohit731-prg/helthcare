import { create } from "zustand";
import toast, { Toaster } from 'react-hot-toast';
import axios from "../utils/axios";

const useUserStore = create((set, get) => ({
    user: null,
    transactions: null,

    login: async (userDetials) => {
        try {
            const res = await axios.post('http://localhost:2100/api/users/login', {
                phone: userDetials.number,
                password: userDetials.password
            });
            if (res.data.status === 200) {
                set({ user: res.data.user });
                toast.success(res.data.message);
                return res.data.user;
            }
            toast.error(res.data.message);
            return false;
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            return false;
        }
    },

    signup: async (userDetails) => {
        console.log(userDetails);
        try {
            const res = await axios.post('http://localhost:2100/api/users/register', {
                name: userDetails.name,
                phone: userDetails.phone,
                gender: userDetails.gender,
                dateOfBirth: userDetails.dateOfBirth,
                password: userDetails.password,
                profilePicture: userDetails.profilePicture
            });
            
            toast.success(res.data.message);
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            return false;
        }
    },

    transactionsById: async (id) => {
        try {
            const transactionsCollected = await axios.post(`http://localhost:2100/api/transaction/getTransactionByID/${id}`);
            set({ transactions: transactionsCollected.data.data });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    },

    fetchUserByID: async (id) => {
        try {
            const userDetails = await axios.post(`http://localhost:2100/api/users/getUserByID/${id}`);
            set({ user: userDetails.data.user });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    },

    setUpdatedProfileImage: async (image) => {
        try {
            const response = await axios.put(`http://localhost:2100/api/users/updateProfileImage/${get().user._id}`, { profilePicture: image });
            set({ user: response.data.user });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
}));

export default useUserStore;