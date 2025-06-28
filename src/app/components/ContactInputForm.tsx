import React from "react";

type ContactInfo = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  url: string;
};

export default function ContactInputForm({
  contactInfo,
  setContactInfo,
}: {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={contactInfo.firstName}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, firstName: e.target.value })
            }
            placeholder="First Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={contactInfo.lastName}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, lastName: e.target.value })
            }
            placeholder="Last Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={contactInfo.phone}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, phone: e.target.value })
          }
          placeholder="Phone Number"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={contactInfo.email}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, email: e.target.value })
          }
          placeholder="Email Address"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Organization
        </label>
        <input
          type="text"
          value={contactInfo.organization}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, organization: e.target.value })
          }
          placeholder="Organization"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website
        </label>
        <input
          type="url"
          value={contactInfo.url}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, url: e.target.value })
          }
          placeholder="Website"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>
  );
}
