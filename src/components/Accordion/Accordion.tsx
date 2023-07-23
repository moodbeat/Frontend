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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div>
      {faqItems.map((item, index) => (
        <div key={index}>
          <div
            onClick={() => toggleAccordion(index)}
            style={{ cursor: "pointer" }}
          >
            {item.question}
            {activeIndex === index ? (
              <span
                className={`${styles.accordion} ${styles.accordionUp}`}
              ></span>
            ) : (
              <span
                className={`${styles.accordion} ${styles.accordionDown}`}
              ></span>
            )}
          </div>
          {activeIndex === index && <p>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};
