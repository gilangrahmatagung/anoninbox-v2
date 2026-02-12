"use client";
import { baseUrl } from "@/app/schemas/schema";
import { ErrMsg } from "@/lib/CommonMessage";
import { getCookie } from "cookies-next/client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import MessageAlert from "@/components/ui/MessageAlert";
import Card from "@/components/ui/Card";

function CheckUserVerificationContent() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token");
  const emailParam = searchParams.get("email");

  const [succMsg, setSuccMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function CheckUserVerificationSubmit(token: string, email: string) {
    const csrfToken: string = (await getCookie("csrftoken")) || "";

    try {
      const response = await fetch(`${baseUrl}/users/check-verification/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          email: email,
          verification_token: token,
        }),
      });
      await response.json();

      if (response.ok) {
        setErrMsg("");
        setSuccMsg(
          "Verifikasi akun berhasil. Silakan menuju halaman login."
        );
      } else {
        setSuccMsg("");
        setErrMsg(
          "Verifikasi akun gagal. Periksa kembali token verifikasi."
        );
      }
    } catch (err) {
      setSuccMsg("");
      setErrMsg(ErrMsg.ServerError);
    }
  }

  useEffect(() => {
    if (!tokenParam || !emailParam) {
      setErrMsg("Masukkan email dan token yang sesuai.");
    } else {
      CheckUserVerificationSubmit(tokenParam, emailParam);
    }
  }, [tokenParam, emailParam]);

  return (
    <Card className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-yellow-400">Verifikasi akun</h1>
      {succMsg && (
        <MessageAlert variant="success">{succMsg}</MessageAlert>
      )}
      {errMsg && <MessageAlert variant="error">{errMsg}</MessageAlert>}
    </Card>
  );
}

export default function CheckUserVerificationPage() {
  return (
    <Suspense
      fallback={
        <p className="text-neutral-400 animate-pulse">Memuat...</p>
      }
    >
      <CheckUserVerificationContent />
    </Suspense>
  );
}
