import React, { useState, useEffect } from "react";
import { Icons } from "../icons/Icon";
import type { ContactInformation } from "../data";
import api from "../api/axios";

const ContactInfo: React.FC = () => {
  const IconEnvelop = Icons.envelope;
  const IconPhone = Icons.phone;
  const IconMap = Icons.map;

  const [contactInfo, setContactInfo] = useState<ContactInformation | null>(
    null
  );

  useEffect(() => {
    const fetchContactInformation = async () => {
      try {
        const response = await api.get("information-section");
        setContactInfo(response.data);
      } catch (err) {
        console.error("Error fetching contact information:", err);
      }
    };
    fetchContactInformation();
  }, []);

  const contactDetails = [
    {
      icon: IconEnvelop,
      label: "Email",
      value: contactInfo?.email,
      link: contactInfo?.email ? `mailto:${contactInfo.email}` : undefined,
    },
    {
      icon: IconPhone,
      label: "Phone",
      value: contactInfo?.contact,
      link: contactInfo?.contact
        ? `tel:${contactInfo.contact.replace(/\s/g, "")}`
        : undefined,
    },
    {
      icon: IconMap,
      label: "Location",
      value: contactInfo?.location,
      link: undefined,
    },
  ];

  return (
    <div className="bg-neutral-900 border-2 border-red-600 rounded-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold text-white mb-6">
        Contact Information
      </h3>

      <div className="space-y-4">
        {contactDetails.map((info, index) => {
          if (!info.value) return null; // hide empty fields

          const Icon = info.icon;

          const content = (
            <div className="flex items-center gap-4 p-3 bg-black rounded-lg border border-red-600/30 hover:border-red-600 transition-colors group">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Icon className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">{info.label}</p>
                <p className="text-white text-sm font-medium wrap-break-words">
                  {info.value}
                </p>
              </div>
            </div>
          );

          return info.link ? (
            <a key={index} href={info.link} className="block">
              {content}
            </a>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
