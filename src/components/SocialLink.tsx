import React, { useState, useEffect } from "react";
import { Icons } from "../icons/Icon";
import api from "../api/axios";
import type { ContactInformation } from "../data";

const SocialLink: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInformation | null>(
    null
  );

  const IconLinkedIn = Icons.linkedIn;
  const IconFacebook = Icons.facebook;
  const IconGithub = Icons.github;

  useEffect(() => {
    const fetchContactInformation = async () => {
      try {
        const response = await api.get("information-section");
        // Assuming the API returns an array, take the first item
        setContactInfo(response.data);
      } catch (err) {
        console.error("Error fetching contact information:", err);
      }
    };
    fetchContactInformation();
  }, []);

  const socialLinks = [
    {
      icon: IconLinkedIn,
      name: "LinkedIn",
      url: contactInfo?.linkedin_acc,
      color: "#0A66C2",
    },
    {
      icon: IconGithub,
      name: "GitHub",
      url: contactInfo?.github_acc,
      color: "#ffffff",
    },
    {
      icon: IconFacebook,
      name: "Facebook",
      url: contactInfo?.facebook_acc,
      color: "#1877F2",
    },
  ].filter((social) => social.url && social.url.trim() !== "");

  return (
    <>
      {socialLinks.length > 0 && (
        <div className="bg-neutral-900 border-2 border-red-600 rounded-lg p-6 md:p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Connect With Me
          </h3>

          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-black border-2 border-red-600 rounded-lg flex items-center justify-center hover:border-red-500 hover:scale-110 transition-all group"
                  aria-label={social.name}
                >
                  <Icon className="text-2xl" style={{ color: social.color }} />
                </a>
              );
            })}
          </div>

          <p className="text-gray-400 text-sm mt-6">
            Feel free to reach out through any of these platforms. I'm always
            open to discussing new projects, creative ideas, or opportunities.
          </p>
        </div>
      )}
    </>
  );
};

export default SocialLink;
