import axios from 'axios';
import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const [avatar, setAvatar] = useState(null);
 const [userData, setUserData] = useState({});
 //below code of password change form data
 const [passwordData, setPasswordData] = useState({
   currentPassword: '',
   newPassword: '',
   confirmPassword: ''})
  // below backend link
 const backendUrl = useSelector((state)=>state.prod.link)
 const fileInputRef = useRef(null);

 useEffect(()=>{
  const fetch = async ()=>{
    try{
      const res = await axios.get(`${backendUrl}/api/getprofiledata`,{
        withCredentials: true,
      });
      const data = await res.data;
      setUserData(data.user);
      // console.log("User Data:", data.user);

    }
    catch(error){

    }
  }
  fetch()
 },[])

 const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      // Password length validation
      if (passwordData.newPassword.length < 6) {
        toast.error('New password must be at least 6 characters long');
        return;
      }

      // Existing password match validation
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }
      
      const res = await axios.post(`${backendUrl}/api/changePassword`, passwordData, {
        withCredentials: true,
      });
      
      if (res.data.success) {
        toast.success("Password changed successfully");
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred while changing the password");
    }
}


const handleAvatarChange = async (event) => {
    try {
      const file = event?.target?.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post(
        `${backendUrl}/api/update-avatar`,
        formData,
        {
          headers: { 
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        // Update both avatar and userData states
        setAvatar(res.data.data.url);
        setUserData(prev => ({
          ...prev,
          avatar: {
            url: res.data.data.url,
            publicId: res.data.data.publicId
          }
        }));
        toast.success('Avatar updated successfully');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error(error.response?.data?.message || 'Failed to update avatar');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
};
  return (
    <div className="container mx-auto">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex flex-col mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
              <img 
                // src={avatar || '/img/default_avator.jpg'} 
                src={userData.avatar?.url || '/img/default_avatar.jpg'} 
                alt="Profile" 
                className="w-full h-full object-cover"
                
                
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
              aria-label="Upload avatar"
            />
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              Change Avatar
            </button>
          </div>
          <h2 className="text-gray-600 mt-4">{userData.email}</h2>
          <h1 className="text-2xl font-bold mt-2">{userData.username}</h1>
        </div>

        {/* Password Change Form */}
        <div className="max-w-md ">
          <h3 className="text-xl font-semibold mb-6">Change account's password</h3>
          <form className="space-y-4 grid sm:grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handlesubmit}>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={passwordData.currentPassword}
                onChange={(e)=>setPasswordData({...passwordData, currentPassword: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={passwordData.newPassword}
                onChange={(e)=>setPasswordData({...passwordData, newPassword: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={passwordData.confirmPassword}
                onChange={(e)=>setPasswordData({...passwordData, confirmPassword: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-6"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dashboard