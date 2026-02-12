"use client";
import { ThreadCreateSchema } from "@/app/schemas/schema";
import { postFetcher } from "@/lib/Fetcher";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import MessageAlert from "@/components/ui/MessageAlert";

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

    if (title === "") delete messageData.message_title;
    if (email === "") delete messageData.non_user_email;

    await trigger(messageData);

    setTitle("");
    setBody("");
    setEmail("");
    setSuccMsg("Pesan telah dikirim.");
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
      {error && (
        <MessageAlert variant="error">{error.message}</MessageAlert>
      )}
    </form>
  );
}
