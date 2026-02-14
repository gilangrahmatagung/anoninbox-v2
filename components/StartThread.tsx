"use client";
import { ThreadCreateSchema } from "@/app/schemas/schema";
import { postFetcher } from "@/lib/Fetcher";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import MessageAlert from "@/components/ui/MessageAlert";
import { ErrMsg } from "@/lib/CommonMessage";

export default function StartThread({
  box_id,
  isAuthenticated,
}: {
  box_id: number;
  isAuthenticated: boolean;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");

  const [succMsg, setSuccMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { trigger, isMutating, error } = useSWRMutation(
    `/api/boxes/${box_id}/threads/`,
    postFetcher
  );

  async function startThreadSubmit(e: React.FormEvent) {
    e.preventDefault();

    const messageData: ThreadCreateSchema = {
      non_user_email: email,
      message_title: title,
      message_body: body,
    };

    // sedikit validasi
    if (title === "") delete messageData.message_title;
    if (email === "") delete messageData.non_user_email;

    if (messageData.message_title && messageData.message_title.length > 50) {
      setSuccMsg("")
      setErrMsg("Judul tidak boleh lebih dari 50 karakter.");
      return
    }

    if (messageData.message_body.length>1000){
      setSuccMsg("")
      setErrMsg("Pesan tidak boleh lebih dari 1000 karakter.")
      return
    }

    try{
      await trigger(messageData);

      if (error){
        setSuccMsg("")
        setErrMsg(error.message)

      } else {
        setTitle("");
        setBody("");
        setEmail("");

        setErrMsg("")
        setSuccMsg("Pesan telah dikirim.");
      }
    }

    catch{
      setSuccMsg("")
      setErrMsg(ErrMsg.ClientError)
    }
  }

  return (
    <form
      onSubmit={startThreadSubmit}
      className="space-y-3 rounded-lg border border-neutral-700 bg-neutral-800/80 p-4"
    >
      <Input
        type="text"
        name="title"
        placeholder="Judul (opsional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {!isAuthenticated && (
        <Input
          type="email"
          name="email"
          placeholder="Email (opsional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      <Textarea
        name="body"
        placeholder="Pesan"
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
      />

      <Button type="submit" variant="primary" disabled={isMutating}>
        {isMutating ? "Menyimpan..." : "Kirim Pesan"}
      </Button>

      {succMsg && (
        <MessageAlert variant="success">{succMsg}</MessageAlert>
      )}
      {errMsg && (
        <MessageAlert variant="error">{errMsg}</MessageAlert>
      )}
    </form>
  );
}
