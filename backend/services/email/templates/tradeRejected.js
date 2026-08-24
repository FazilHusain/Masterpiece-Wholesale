import masterLayout from "../layouts/masterLayout.js";

const tradeRejectedTemplate = ({
  name,
  reason,
}) => {
  return masterLayout({
    title: "Trade Application Update",

    heading: "Application Status",

    greeting: `Dear ${name},`,

    content: `
      <p>

      Thank you for your interest in becoming
      a His Masterpiece Trade Partner.

      </p>

      <p>

      After reviewing your application,
      we're unable to approve it at this time.

      </p>

      ${
        reason
          ? `
      <div
      style="
      background:#FFF5F5;
      border-left:4px solid #DC2626;
      padding:18px;
      margin:30px 0;
      ">

      <strong>

      Reason

      </strong>

      <br><br>

      ${reason}

      </div>
      `
          : ""
      }

      <p>

      You're welcome to submit
      a new application after updating
      the required information.

      </p>
    `,
  });
};

export default tradeRejectedTemplate;