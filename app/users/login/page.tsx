"use client";
import { ErrMsg } from "@/lib/CommonMessage";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { baseUrl } from "@/app/schemas/schema";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import MessageAlert from "@/components/ui/MessageAlert";
import Card from "@/components/ui/Card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function loginSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const csrfToken: string = (await getCookie("csrftoken")) || "";
      const response = await fetch(`${baseUrl}/users/login/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      await response.json();

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        setErrMsg(
          "Email atau password yang Anda masukkan salah. Silakan coba lagi."
        );
      }
    } catch (error) {
      setErrMsg(ErrMsg.ServerError);
    }
  }

  return (
    <Card className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-yellow-400">Masuk</h1>
      <form onSubmit={loginSubmit} className="space-y-3">
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
        <Button type="submit" variant="primary" className="w-full">
          Masuk
        </Button>

        <p className="text-sm text-neutral-400">
          Belum punya akun?{" "}
          <Link
            href="/users/register"
            className="text-yellow-400 hover:underline"
          >
            Mendaftar akun baru
          </Link>
        </p>
        <p className="text-sm text-neutral-400">
          Lupa sandi?{" "}
          <Link
            href="/users/password-reset"
            className="text-yellow-400 hover:underline"
          >
            Atur ulang sandi
          </Link>
        </p>

        {errMsg && (
          <MessageAlert variant="error">{errMsg}</MessageAlert>
        )}
      </form>
    </Card>
  );
}
