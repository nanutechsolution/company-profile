"use client";
import { FormEvent, useState } from "react";
import type { Locale } from "@/locales";

export function ContactForm({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/contact.php", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(id ? "Pesan belum terkirim. Silakan coba lagi atau gunakan kontak resmi kami." : "Your message was not sent. Please try again or use our official contact details.");
    }
  }
  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="form-row"><label htmlFor="contact-name">{id ? "Nama" : "Name"}<input id="contact-name" name="name" autoComplete="name" required placeholder={id ? "Nama Anda" : "Your name"} /></label><label htmlFor="contact-organization">{id ? "Organisasi" : "Organization"}<input id="contact-organization" name="organization" autoComplete="organization" required placeholder={id ? "Nama organisasi" : "Organization name"} /></label></div>
    <label htmlFor="contact-email">{id ? "Email kerja" : "Work email"}<input id="contact-email" type="email" name="email" autoComplete="email" required placeholder="name@organization.com" /></label>
    <label htmlFor="contact-message">{id ? "Ceritakan kebutuhan Anda" : "Tell us about your needs"}<textarea id="contact-message" name="message" rows={4} required placeholder={id ? "Masalah atau proses yang ingin diperbaiki" : "The problem or process you want to improve"} /></label>
    <label className="check" htmlFor="contact-consent"><input id="contact-consent" type="checkbox" name="consent" required /> <span>{id ? "Saya menyetujui data ini digunakan untuk menindaklanjuti permintaan saya." : "I agree that this data may be used to follow up on my request."}</span></label>
    <label className="form-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? (id ? "Mengirim..." : "Sending...") : id ? "Kirim Permintaan" : "Send Inquiry"}<span aria-hidden="true">→</span></button>
    {status === "sent" && <p className="form-success" role="status">{id ? "Terima kasih. Pesan Anda telah terkirim." : "Thank you. Your message has been sent."}</p>}
    {status === "error" && <p className="form-error" role="alert">{error}</p>}
  </form>;
}
