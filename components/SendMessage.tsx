"use client";
import { postFetcher } from "@/lib/Fetcher";
import React, { Activity, useState } from "react";
import useSWRMutation from "swr/mutation";
import { MessageCreateSchema } from "@/app/schemas/schema";
import { mutate } from "swr";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import MessageAlert from "@/components/ui/MessageAlert";

export default function SendMessage({
  box_id,
  thread_id,
}: {
  box_id: number;
  thread_id: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const { trigger, isMutating, error } = useSWRMutation(
    `/api/boxes/${box_id}/threads/${thread_id}/`,
    postFetcher
  );

  async function sendMessageSubmit(e: React.FormEvent) {
    e.preventDefault();

    const messageData: MessageCreateSchema = {
      message_title: title,
      message_body: body,
    };

    if (title === "") delete messageData.message_title;

    try {
      await trigger(messageData);
      await mutate(`/api/boxes/${box_id}/threads-with-sender/`);
      await mutate(`/api/boxes/${box_id}/threads/`);
      setTitle("");
      setBody("");
      setSuccMsg("Pesan telah dikirim.");
    } catch {}
  }

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Tutup" : "Balas Pesan"}
      </Button>

      <Activity mode={isVisible ? "visible" : "hidden"}>
        <form
          onSubmit={sendMessageSubmit}
          className="mt-3 space-y-3 rounded-lg border border-neutral-700 bg-neutral-800/80 p-4"
        >
          <Input
            type="text"
            name="title"
            placeholder="Judul (Opsional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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

          {error && (
            <MessageAlert variant="error">{error.message}</MessageAlert>
          )}
          {succMsg && (
            <MessageAlert variant="success">{succMsg}</MessageAlert>
          )}
        </form>
      </Activity>
    </>
  );
}
