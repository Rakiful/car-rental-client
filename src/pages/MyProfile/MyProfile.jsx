import React, { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import Swal from "sweetalert2";
import {
  FaUser,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaKey,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export const MyProfile = () => {
  const { user, signOutUser, userProfileUpdate } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [editing, setEditing] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // Password change states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          title: "Log Out Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleVerifyEmail = () => {
    sendEmailVerification(user)
      .then(() => {
        setMessage("Verification email sent. Please check your inbox.");
        Swal.fire({
          title: "Email Sent!",
          text: "A verification email has been sent to your inbox.",
          icon: "success",
          confirmButtonText: "Go to Gmail",
        }).then((result) => {
          if (result.isConfirmed) {
            window.open("https://mail.google.com", "_blank");
          }
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", error.message, "error");
      });
  };

  const handleSaveProfile = () => {
    const updates = {
      displayName: name,
      photoURL: photoURL,
    };

    userProfileUpdate(updates)
      .then(() => {
        setEditing(false);
        setMessage("Profile updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating Firebase:", error);
        setMessage("Error updating Firebase profile.");
      });
  };

  const handleRemovePhoto = () => {
    setPhotoURL("");
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      Swal.fire({
        title: "Please fill both old and new password fields.",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }

    if (oldPassword === newPassword) {
      Swal.fire({
        title: "The old password and the new password must be different.",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }

    // password validate
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (passwordRegExp.test(newPassword) === false) {
      Swal.fire({
        title:
          "Password must include at least 1 uppercase, 1 lowercase letter, and be at least 6 characters long.",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    reauthenticateWithCredential(user, credential)
      .then(() => updatePassword(user, newPassword))
      .then(() => {
        setOldPassword("");
        setNewPassword("");
        setShowPasswordFields(false);
        Swal.fire({
          title: "Password changed successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.error("Password change error:", error);
        Swal.fire({
          title: "Plese ! give the correct old password",
          icon: "error",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="container mx-auto my-10 px-4 min-h-[80vh]">
      {!user?.emailVerified && (
        <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded text-center mb-4">
          Your email is not verified.
          <button
            onClick={handleVerifyEmail}
            className="btn ml-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Please Verify Email
          </button>
        </div>
      )}

      {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded text-center mb-4">
          {message}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="flex flex-col items-center md:w-1/2">
          <img
            src={
              photoURL ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt="Profile"
            className="rounded-full w-1/2 md:w-52 md:h-52 object-cover mb-4"
          />

          {editing && (
            <div className="w-full text-center">
              <input
                type="url"
                placeholder="Photo URL"
                className="border p-2 rounded w-full mb-2"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
              <button
                onClick={handleRemovePhoto}
                className="text-red-500 text-sm cursor-pointer hover:underline"
              >
                Remove Photo
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          {editing ? (
            <input
              type="text"
              placeholder="Enter your name"
              className="border p-2 rounded w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-600" />
              <p className="text-lg">
                <span className="font-semibold text-blue-600">Username:</span>{" "}
                {user?.displayName || "Unknown User"}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-600" />
            <p className="text-lg">
              <span className="font-semibold text-blue-600">Email:</span>{" "}
              {user?.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {user?.emailVerified ? (
              <FaCheckCircle className="text-green-600" />
            ) : (
              <FaTimesCircle className="text-red-600" />
            )}
            <p className="text-lg">
              <span className="font-semibold text-blue-600">
                Email Verified:
              </span>{" "}
              {user?.emailVerified ? "✅ Verified" : "❌ Not Verified"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-600">
              Account Created:
            </span>
            <span className="text-sm text-gray-700">
              {user?.metadata?.creationTime?.slice(0, 16) || "Unknown"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-600">Last Sign-In:</span>
            <span className="text-sm text-gray-700">
              {user?.metadata?.lastSignInTime?.slice(0, 16) || "Unknown"}
            </span>
          </div>

          <div>
            {showPasswordFields ? (
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border p-2 rounded w-full"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-xs absolute top-2 right-6"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border p-2 rounded w-full"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-xs absolute top-2 right-6"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={() => {
                      setOldPassword("");
                      setNewPassword("");
                      setShowPasswordFields(false);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowPasswordFields(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-2"
              >
                <FaKey /> Change Password
              </button>
            )}
          </div>

          {/* Edit & Sign Out Buttons */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <FaEdit />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
                >
                  <FaSave />
                  Save Profile
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
