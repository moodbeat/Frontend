import React, { useState } from "react";
import "@/shared/styles/styles.css";
import styles from "./LandingPage.module.scss";
import { Accordion } from "@/components/Accordion/Accordion";
import { FeedbackForm } from "./components/FeedbackForm/FeedbackForm";
import { faqItems } from "@/shared/constants";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Hero } from "./components/Hero/Hero";
import { Audience } from "./components/Audience/Audience";
import { Features } from "./components/Features/Features";

export const LandingPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className={styles.landing}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <Audience />
        <Features />

        <section id="faq" className={styles.sectionFaq}>
          <div className={styles.sectionFaqContainer}>
            <h2 className={styles.sectionFaqTitle}>FAQ</h2>
            <Accordion faqItems={faqItems} />
          </div>
        </section>

        <section id="form" className={styles.sectionForm}>
          <div className={styles.sectionFormContainer}>
            {isSubmitted ? (
              <h2 className={styles.sectionFormTitle}>
                Спасибо!
                <br />
                Мы получили Ваше&nbsp;сообщение.
              </h2>
            ) : (
              <FeedbackForm setIsSubmitted={setIsSubmitted} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
