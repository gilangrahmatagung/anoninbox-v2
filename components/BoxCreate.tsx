"use client";
import { postFetcher } from "@/lib/Fetcher";
import React, { useState, Activity } from "react";
import useSWRMutation from "swr/mutation";
import { BoxCreateSchema } from "@/app/schemas/schema";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import MessageAlert from "@/components/ui/MessageAlert";

export default function BoxCreate() {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [succMsg, setSuccMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { trigger, isMutating, error } = useSWRMutation(
    "/api/boxes/",
    postFetcher
  );

  async function createBoxSubmit(e: React.FormEvent) {
    e.preventDefault();

    const boxData: BoxCreateSchema = {
      box_title: title,
      box_description: description,
    };

    await trigger(boxData);

    if (error){
      setSuccMsg("")
      setErrMsg(error.message)
    }

    else{
      setTitle("");
      setDescription("");

      setErrMsg("")
      setSuccMsg("Kotak baru telah dibuat.");
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="primary"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Tutup" : "Buat Box Baru"}
      </Button>

      <Activity mode={isVisible ? "visible" : "hidden"}>
        <form
          onSubmit={createBoxSubmit}
          className="mt-4 space-y-3 rounded-lg border border-neutral-700 bg-neutral-800/80 p-4"
        >
          <Input
            type="text"
            name="title"
            placeholder="Judul"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            name="description"
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <div className="flex flex-wrap gap-2">
            <Button type="submit" variant="primary" disabled={isMutating}>
              {isMutating ? "Menyimpan..." : "Buat Box"}
            </Button>
          </div>

          {succMsg && (
            <MessageAlert variant="success">{succMsg}</MessageAlert>
          )}
          {errMsg && (
            <MessageAlert variant="error">{errMsg}</MessageAlert>
          )}
        </form>
      </Activity>
    </>
  );
}
