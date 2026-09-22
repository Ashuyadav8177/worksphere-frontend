import ProfileInfo from "../components/ProfileInfo";
import ProfilePicture from "../components/ProfilePicture";
import ChangePassword from "../components/changePassword";

function Profile() {
  const profile = {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    department: "IT",
    designation: "Software Engineer",
    employeeId: "EMP001",
    joiningDate: "2025-07-15",
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500">Home / Profile</p>
      </div>

      {/* Picture + Info */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfilePicture name={profile.name} />
        </div>

        <div className="lg:col-span-2">
          <ProfileInfo
            name={profile.name}
            email={profile.email}
            phone={profile.phone}
            department={profile.department}
            designation={profile.designation}
            employeeId={profile.employeeId}
            joiningDate={profile.joiningDate}
          />
        </div>
      </div>

      {/* Change Password */}
      <ChangePassword />
    </div>
  );
}

export default Profile;