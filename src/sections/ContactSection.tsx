import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import SocialLink from "../components/SocialLink";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="min-h-screen px-6 md:px-8 lg:px-4 pb-8 bg-black"
    >
      <article className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-6xl font-bold inline bg-linear-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-400 lg:text-lg text-base mt-2">
            Let's discuss your project or just say hello!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <ContactInfo />

            {/* Social Media Links */}
            <SocialLink />
          </div>
        </div>
      </article>
    </section>
  );
};

export default ContactSection;
