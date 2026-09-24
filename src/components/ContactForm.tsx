"use client";
import { FormEvent, useState } from "react";
import type { Locale } from "@/locales";

export function ContactForm({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setSent(true);
    form.reset();
  }
  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="form-row"><label htmlFor="contact-name">{id ? "Nama" : "Name"}<input id="contact-name" name="name" autoComplete="name" required placeholder={id ? "Nama Anda" : "Your name"} /></label><label htmlFor="contact-organization">{id ? "Organisasi" : "Organization"}<input id="contact-organization" name="organization" autoComplete="organization" required placeholder={id ? "Nama organisasi" : "Organization name"} /></label></div>
    <label htmlFor="contact-email">{id ? "Email kerja" : "Work email"}<input id="contact-email" type="email" name="email" autoComplete="email" required placeholder="name@organization.com" /></label>
    <label htmlFor="contact-message">{id ? "Ceritakan kebutuhan Anda" : "Tell us about your needs"}<textarea id="contact-message" name="message" rows={4} required placeholder={id ? "Masalah atau proses yang ingin diperbaiki" : "The problem or process you want to improve"} /></label>
    <label className="check" htmlFor="contact-consent"><input id="contact-consent" type="checkbox" name="consent" required /> <span>{id ? "Saya menyetujui data ini digunakan untuk menindaklanjuti permintaan saya." : "I agree that this data may be used to follow up on my request."}</span></label>
    <button className="button" type="submit">{id ? "Kirim Permintaan" : "Send Inquiry"}</button>
    {sent && <p className="form-success" role="status">{id ? "Terima kasih. Permintaan Anda siap ditindaklanjuti setelah kontak resmi dikonfirmasi." : "Thank you. Your inquiry is ready to be followed up once official contact details are confirmed."}</p>}
  </form>;
}
