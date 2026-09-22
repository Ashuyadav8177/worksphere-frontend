import { useState } from "react";

function ProfilePicture({ name = "User" }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (!selectedImage) return;
    setImage(URL.createObjectURL(selectedImage));
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-5 text-base font-semibold text-gray-900">Profile Picture</h2>

      <div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-violet-100">
        {image ? (
          <img src={image} alt="Profile" className="h-full w-full object-cover" />
        ) : (
          <span className="text-4xl font-semibold text-violet-600">{name.charAt(0)}</span>
        )}
      </div>

      <label
        htmlFor="profile-picture-upload"
        className="mt-5 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-violet-700 hover:shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Upload Photo
      </label>

      <input
        id="profile-picture-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {!image && <p className="mt-2 text-xs text-gray-400">No profile picture selected</p>}
    </div>
  );
}

export default ProfilePicture;