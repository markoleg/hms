import { useMemo, useState } from "react";
import styles from "./Modal.module.css";
import { handleContactForm } from "@/app/actions/handleContactForm";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import CaptchaProvider from "@/app/lib/CaptchaProvider";
import { sendGAEvent } from "@next/third-parties/google";


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReCaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
  };
  const memoizedReCaptcha = useMemo(() => (
    <GoogleReCaptcha onVerify={handleReCaptchaVerify} />
  ), []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setIsSubmitting(true);
      await handleContactForm(formData);
      setSubmitted(true);
      // Send custom event to Google Analytics
      sendGAEvent("event", "contact_form_submit", { value: "contact_form_submit" });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <p className={styles.succesMessage}>Дякуємо! Ми з вами зв'яжемося.</p>
        ) : (
          <CaptchaProvider recaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <p className={styles.form_head}>Отримайте безкоштовне пробне заняття!</p>
              <input type="text" name="name" id="name" placeholder="Ім'я" required />
              <input type="email" name="email" id="email" placeholder="Email" />
              <input type="tel" name="phone" id="phone" placeholder="Номер телефону" required />

              {memoizedReCaptcha}
              <input type="hidden" name="recaptchaToken" value={recaptchaToken || ""} />

              <button className="cta" type="submit" disabled={isSubmitting || !recaptchaToken}>
                {isSubmitting ? "Надсилаю..." : "Підтвердити"}
              </button>
            </form>
          </CaptchaProvider>
        )}
      </div>
    </div>
  );
}
