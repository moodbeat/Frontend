import React, { useState } from "react";
import styles from "@/components/Accordion/Accordion.module.scss";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  faqItems: FAQItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ faqItems }) => {
  // Если установить setActiveIndex = null, все элементы будут collapsed
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={styles.accordion}>
      {faqItems.map((item, index) => (
        <div key={index}>
          <div
            className={`${styles.element} ${
              activeIndex === index ? `${styles.elementActive}` : ""
            }`}
            onClick={() => toggleAccordion(index)}
            style={{ cursor: "pointer" }}
          >
            {item.question}
          </div>
          {activeIndex === index && (
            <p className={styles.text}>{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};
