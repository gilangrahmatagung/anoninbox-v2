"use client";
import { baseUrl, UserSchema } from "@/app/schemas/schema";
import { ErrMsg } from "@/lib/CommonMessage";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import MessageAlert from "@/components/ui/MessageAlert";
import Card from "@/components/ui/Card";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  async function registerSubmit(e: React.FormEvent) {
    e.preventDefault();

    const userData: UserSchema = {
      email: email,
      password: password,
    };

    if (password !== confirmPassword) {
      setErrMsg("Sandi konfirmasi tidak cocok. Silakan periksa kembali.");
      setPassword("");
      setConfirmPassword("");
    } else {
      try {
        const csrfToken: string = (await getCookie("csrftoken")) || "";
        const response = await fetch(`${baseUrl}/users/register/`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          body: JSON.stringify(userData),
        });
        await response.json();

        if (response.ok) {
          setErrMsg("");
          setSuccMsg(
            "Kami telah mengirimkan tautan verifikasi ke email terdaftar. Silakan lakukan verifikasi."
          );
          setEmail("");
          setConfirmPassword("");
          setPassword("");
        } else {
          setSuccMsg("");
          setErrMsg("Email yang kamu masukkan telah terdaftar.");
          setEmail("");
          setConfirmPassword("");
          setPassword("");
        }
      } catch (err) {
        setSuccMsg("");
        setErrMsg(ErrMsg.ServerError);
        setEmail("");
        setConfirmPassword("");
        setPassword("");
      }
    }
  }

  return (
    <Card className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-yellow-400">Daftar</h1>
      <form onSubmit={registerSubmit} className="space-y-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Sandi"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Konfirmasi sandi"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" variant="primary" className="w-full">
          Daftar
        </Button>

        {succMsg && (
          <MessageAlert variant="success">{succMsg}</MessageAlert>
        )}
        {errMsg && (
          <MessageAlert variant="error">{errMsg}</MessageAlert>
        )}
      </form>
    </Card>
  );
}
