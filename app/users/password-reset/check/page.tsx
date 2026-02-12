"use client";
import { baseUrl } from "@/app/schemas/schema";
import { ErrMsg } from "@/lib/CommonMessage";
import { getCookie } from "cookies-next/client";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import MessageAlert from "@/components/ui/MessageAlert";
import Card from "@/components/ui/Card";

function CheckPasswordResetForm() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token");
  const emailParam = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!tokenParam || !emailParam) {
      setErrMsg(
        "Masukkan email dan token yang sesuai. Periksa tautan yang terkirim melalui email."
      );
    }
  }, [tokenParam, emailParam]);

  async function CheckPasswordResetSubmit(e: React.FormEvent) {
    e.preventDefault();

    const csrfToken: string = (await getCookie("csrftoken")) || "";

    if (newPassword !== confirmPassword) {
      setSuccMsg("");
      setErrMsg("Sandi konfirmasi tidak cocok. Silakan periksa lagi.");
    } else {
      try {
        const response = await fetch(
          `${baseUrl}/users/check-password-reset/`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({
              email: emailParam,
              verification_token: tokenParam,
              password: newPassword,
            }),
          }
        );
        await response.json();

        if (response.ok) {
          setErrMsg("");
          setSuccMsg(
            "Pengaturan ulang sandi berhasil. Silakan menuju halaman login."
          );
        } else {
          setSuccMsg("");
          setErrMsg("Pengaturan ulang sandi gagal. Periksa kembali token.");
        }
      } catch (err) {
        setSuccMsg("");
        setErrMsg(ErrMsg.ServerError);
      }
    }
  }

  return (
    <Card className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-yellow-400">Atur ulang sandi</h1>
      <form onSubmit={CheckPasswordResetSubmit} className="space-y-3">
        <Input
          type="password"
          name="password"
          placeholder="Sandi"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
          Atur ulang
        </Button>
        {succMsg && (
          <MessageAlert variant="success">{succMsg}</MessageAlert>
        )}
        {errMsg && <MessageAlert variant="error">{errMsg}</MessageAlert>}
      </form>
    </Card>
  );
}

export default function CheckPasswordResetPage() {
  return (
    <Suspense fallback={<p className="text-neutral-400 animate-pulse">Memuat...</p>}>
      <CheckPasswordResetForm />
    </Suspense>
  );
}
