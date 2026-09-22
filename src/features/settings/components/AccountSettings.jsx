import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

function AccountSettings() {
  const [name, setName] = useState("Rahul Sharma");
  const [email, setEmail] = useState("rahul@gmail.com");
  const [phone, setPhone] = useState("9876543210");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Account settings updated successfully");
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-5 text-base font-semibold text-gray-900">Account Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Full Name" value={name} onChange={(event) => setName(event.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input label="Phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />

          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Language</label>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-all duration-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Timezone</label>
            <select
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-all duration-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            >
              <option value="Asia/Kolkata">Asia/Kolkata</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-100 pt-5">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AccountSettings;