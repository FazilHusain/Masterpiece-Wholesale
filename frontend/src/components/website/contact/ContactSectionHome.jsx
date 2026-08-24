import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import WholesaleCard from "./WholesaleCard";

const ContactSectionHome = () => {
  return (
    <div>
      <section className="bg-[#F9F7F2] py-16">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid lg:grid-cols-[53%_47%] gap-16 items-start">
            <ContactForm />

            <div className="flex flex-col justify-start">
              <ContactInfo />
              <WholesaleCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSectionHome;
