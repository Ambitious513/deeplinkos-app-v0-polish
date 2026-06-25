"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { CompanyHero } from "@/components/company/CompanyHero";
import { contactPaths } from "@/content/company";

type ContactErrors = Partial<Record<"name" | "email" | "reason" | "message", boolean>>;

const reasonOptions = [
  "Product support",
  "Partnership or affiliate inquiry",
  "Billing question",
  "Press or media",
  "General question",
];

export function ContactPageContent() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [success, setSuccess] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonOpen, setReasonOpen] = useState(false);
  const meta = useMemo(() => ["Typical reply: 1 to 2 business days", "Email: hello@deeplinkos.com"], []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const nextErrors: ContactErrors = {
      name: !String(formData.get("name") ?? "").trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      reason: !String(formData.get("reason") ?? "").trim(),
      message: !String(formData.get("message") ?? "").trim(),
    };

    setErrors(nextErrors);
    const hasError = Object.values(nextErrors).some(Boolean);
    setSuccess(!hasError);

    if (!hasError) {
      form.reset();
      setReason("");
      setReasonOpen(false);
    }
  }

  return (
    <div className="company-shell">
      <div className="company-container">
        <CompanyHero
          kicker="Contact"
          title="Talk to DeepLinkOS"
          description="Have a product question, support issue, partnership idea, or affiliate request? Send the right context and we will route it to the right person."
          titleId="contact-title"
          meta={meta}
        />

        <section className="contact-layout" aria-label="Contact options">
          <div className="contact-panel">
            <h2>Send a message</h2>
            <p className="contact-intro">
              This preview form validates required fields and shows a success state. Connect it to your form backend before launch.
            </p>
            <form className="contact-form" noValidate onSubmit={handleSubmit}>
              <ContactField error={errors.name} errorText="Please enter your name.">
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" name="name" type="text" placeholder="Your name" required aria-invalid={errors.name || undefined} />
              </ContactField>

              <ContactField error={errors.email} errorText="Please enter a valid email address.">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  aria-invalid={errors.email || undefined}
                />
              </ContactField>

              <ContactField error={errors.reason} errorText="Please choose a reason.">
                <label htmlFor="contact-reason">Reason</label>
                <input id="contact-reason" name="reason" type="hidden" value={reason} />
                <div className="reason-picker">
                  <button
                    className="reason-trigger"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={reasonOpen}
                    aria-controls="contact-reason-options"
                    aria-invalid={errors.reason || undefined}
                    onClick={() => setReasonOpen((open) => !open)}
                  >
                    <span>{reason || "Choose a reason"}</span>
                    <span className="reason-caret" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                  {reasonOpen ? (
                    <div className="reason-options" id="contact-reason-options" role="listbox" aria-label="Contact reason">
                      {reasonOptions.map((option) => (
                        <button
                          className="reason-option"
                          type="button"
                          role="option"
                          aria-selected={reason === option}
                          key={option}
                          onClick={() => {
                            setReason(option);
                            setReasonOpen(false);
                            setErrors((current) => ({ ...current, reason: false }));
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </ContactField>

              <ContactField error={errors.message} errorText="Please add a short message.">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Share the link, campaign, or question we should look at."
                  required
                  aria-invalid={errors.message || undefined}
                />
              </ContactField>

              <button className="contact-submit" type="submit">
                Send message
              </button>
              <div className={`contact-success${success ? " is-visible" : ""}`} role="status" aria-live="polite">
                Thanks. Your message is ready for the DeepLinkOS team. In production, this will submit to the connected form backend.
              </div>
            </form>
          </div>

          <aside className="contact-paths">
            {contactPaths.map((path) => (
              <div className="company-card" key={path.title}>
                <strong>{path.title}</strong>
                <p>{path.body}</p>
                {path.email ? (
                  <p>
                    <a href={`mailto:${path.email}`}>{path.email}</a>
                  </p>
                ) : null}
              </div>
            ))}
          </aside>
        </section>
      </div>
    </div>
  );
}

function ContactField({ children, error, errorText }: { children: ReactNode; error?: boolean; errorText: string }) {
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      {children}
      <span className="form-error">{errorText}</span>
    </div>
  );
}
