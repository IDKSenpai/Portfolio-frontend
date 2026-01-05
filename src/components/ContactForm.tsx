import React, { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Icons } from "../icons/Icon";
import api from "../api/axios";

const ContactForm: React.FC = () => {
  const IconPlane = Icons.plane;
  const turnstileRef = useRef<any>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaSuccess = (token: string) => {
    setCaptchaToken(token);
  };

  const handleCaptchaError = () => {
    setCaptchaToken(null);
    setSubmitStatus("error");
  };

  const handleSubmit = async () => {
    // Verify captcha is completed
    if (!captchaToken) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await api.post("/contact-form", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        captchaToken: captchaToken, // Send token to backend for verification
      });

      if (response.status === 200) {
        setSubmitStatus("success");

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        // Reset captcha
        setCaptchaToken(null);
        turnstileRef.current?.reset();
      }

      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (err) {
      setSubmitStatus("error");
      console.error("Error submitting form:", err);

      // Reset captcha on error
      setCaptchaToken(null);
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-neutral-900 border-2 border-red-600 rounded-lg p-6 md:p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

        <div className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black border border-red-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              placeholder="Your Name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-red-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Input */}
          <div>
            <label
              htmlFor="message"
              className="block text-white text-sm font-medium mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-black border border-red-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
              placeholder="Your message here..."
            />
          </div>

          {/* Cloudflare Turnstile */}
          <div className="flex justify-center">
            <Turnstile
              ref={turnstileRef}
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || ""}
              onSuccess={handleCaptchaSuccess}
              onError={handleCaptchaError}
              onExpire={() => setCaptchaToken(null)}
              options={{
                theme: "dark", // Matches your dark theme
                size: "normal",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !formData.name ||
              !formData.email ||
              !formData.message ||
              !captchaToken
            }
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                Sending...
              </>
            ) : (
              <>
                <IconPlane />
                Send Message
              </>
            )}
          </button>

          {/* Success Message */}
          {submitStatus === "success" && (
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-3 text-green-400 text-sm text-center">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <div className="bg-red-900/30 border border-red-600 rounded-lg p-3 text-red-400 text-sm text-center">
              {!captchaToken && !isSubmitting
                ? "Please complete the verification challenge."
                : "Failed to send message. Please try again."}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactForm;
