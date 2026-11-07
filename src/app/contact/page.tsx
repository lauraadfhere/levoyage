import { ContactForm } from "@/components/contact-form";
import { MarketingPage } from "@/components/site-chrome";

export default function ContactPage() {
  return (
    <MarketingPage
      eyebrow="CONTACT"
      title="Let’s make travel in Algeria easier."
      intro="For platform support, partner questions or media enquiries, send the team a message."
    >
      <ContactForm />
    </MarketingPage>
  );
}
