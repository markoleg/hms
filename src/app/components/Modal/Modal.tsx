import { useState } from "react";
import styles from "./Modal.module.css";
import { handleContactForm } from "@/app/actions/handleContactForm";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <p>Дякуємо! Ми з вами зв'яжемося.</p>
        ) : (
          <form
            action={handleContactForm}
            className={styles.form}
            onSubmit={() => setSubmitted(true)}
          >
            <p className={styles.form_head}>
              Отримайте безкоштовне пробне заняття!
            </p>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ім'я"
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Номер телефону"
              required
            />
            <button className="cta">Підтвердити</button>
          </form>
        )}
      </div>
    </div>
  );
}
