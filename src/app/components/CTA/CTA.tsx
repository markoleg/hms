"use client";
import { ReactNode, useState } from "react";
import Modal from "../Modal/Modal";

export default function CTA({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button className="cta" onClick={() => openModal()}>
        {children}
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
