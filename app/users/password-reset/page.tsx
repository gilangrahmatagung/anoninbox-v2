"use client";
import { baseUrl } from "@/app/schemas/schema";
import { ErrMsg } from "@/lib/CommonMessage";
import { getCookie } from "cookies-next/client";
import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import MessageAlert from "@/components/ui/MessageAlert";
import Card from "@/components/ui/Card";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  async function PasswordResetSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const csrfToken: string = (await getCookie("csrftoken")) || "";
      const response = await fetch(`${baseUrl}/users/ask-password-reset/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ email }),
      });
      await response.json();

      if (response.ok) {
        setErrMsg("");
        setSuccMsg(
          "Tautan atur ulang sandi telah dikirim melalui email. Silakan periksa email kamu."
        );
      } else {
        setSuccMsg("");
        setErrMsg("Email belum terdaftar.");
      }
    } catch (err) {
      setSuccMsg("");
      setErrMsg(ErrMsg.ServerError);
    }
  }

  return (
    <Card className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-yellow-400">Atur ulang sandi</h1>
      <form onSubmit={PasswordResetSubmit} className="space-y-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="primary" className="w-full">
          Kirim tautan
        </Button>
        {succMsg && (
          <MessageAlert variant="success">{succMsg}</MessageAlert>
        )}
        {errMsg && <MessageAlert variant="error">{errMsg}</MessageAlert>}
      </form>
    </Card>
  );
}