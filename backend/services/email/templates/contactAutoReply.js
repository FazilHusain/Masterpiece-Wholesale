import masterLayout from "../layouts/masterLayout.js";

const contactAutoReplyTemplate = ({ name }) => {
  return masterLayout({
    title: "We've Received Your Enquiry",

    heading: "Thank You",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Thank you for contacting
      <strong>His Masterpiece</strong>.

      </p>

      <p>

      Your enquiry has been received successfully.

      </p>

      <p>

      Our team will review your message
      and respond within 24 business hours.

      </p>

      <p>

      We appreciate your interest.

      </p>
    `,
  });
};

export default contactAutoReplyTemplate;