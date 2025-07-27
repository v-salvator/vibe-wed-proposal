import React, { useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { motion } from "framer-motion";
import "./Contact.css";
import { AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  message: string;
  response: "yes" | "no" | "";
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    response: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { elementRef: titleRef } = useScrollAnimation<HTMLHeadingElement>({
    animationType: "fade-in",
    threshold: 0.3,
  });

  const { elementRef: subtitleRef } = useScrollAnimation<HTMLParagraphElement>({
    animationType: "fade-in",
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  const { elementRef: formRef } = useScrollAnimation<HTMLFormElement>({
    animationType: "fade-in",
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResponseChange = (response: "yes" | "no") => {
    setFormData((prev) => ({
      ...prev,
      response,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        message: "",
        response: "",
      });
    }, 3000);
  };

  return (
    <section id="contact-section" className="contact section">
      <div className="container">
        <div className="contact-header text-center">
          <h2 ref={titleRef} className="contact-title scroll-animate">
            Share Your Thoughts
          </h2>

          <p ref={subtitleRef} className="contact-subtitle scroll-animate">
            I'd love to hear what you think about this proposal. Your response
            means the world to me.
          </p>
        </div>

        <div className="contact-content">
          <motion.form
            ref={formRef}
            className="contact-form scroll-animate"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Your Response</label>
              <div className="response-buttons">
                <motion.button
                  type="button"
                  className={`response-btn response-yes ${
                    formData.response === "yes" ? "active" : ""
                  }`}
                  onClick={() => handleResponseChange("yes")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💍 Yes, I Will!
                </motion.button>

                <motion.button
                  type="button"
                  className={`response-btn response-no ${
                    formData.response === "no" ? "active" : ""
                  }`}
                  onClick={() => handleResponseChange("no")}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💔 No
                </motion.button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Your Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Share your thoughts, memories, or any message you'd like to send..."
                rows={4}
              />
            </div>

            <motion.button
              type="submit"
              className="btn btn-submit"
              disabled={isSubmitting || !formData.response}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Sending..." : "Send Response"}
            </motion.button>
          </motion.form>

          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="contact-card-title">Location</h3>
              <p className="contact-card-text">
                Wherever you are, that's where I want to be
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="contact-card-title">Contact</h3>
              <p className="contact-card-text">Always here when you need me</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="success-content">
              <div className="success-icon">💕</div>
              <h3 className="success-title">Thank You!</h3>
              <p className="success-text">
                Your response has been received. This means everything to me!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
