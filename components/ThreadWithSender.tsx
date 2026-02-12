"use client";
import { MessageSchema, ThreadAndMessagesSchema } from "@/app/schemas/schema";
import { dashboardFetcher } from "@/lib/Fetcher";
import useSWR from "swr";
import StartThread from "./StartThread";
import SendMessage from "./SendMessage";
import Card from "@/components/ui/Card";

export default function ThreadWithSender({ box_id }: { box_id: number }) {
  const { data, error, isLoading } = useSWR(
    `/api/boxes/${box_id}/threads-with-sender/`,
    dashboardFetcher
  );

  if (isLoading)
    return <p className="text-neutral-400 animate-pulse">Memuat...</p>;

  if (data && data.length > 0) {
    return (
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-100">
          Pesan kamu:
        </h2>
        <ul className="space-y-6">
          {data.map((thread: ThreadAndMessagesSchema) => (
            <li key={thread.id}>
              <Card className="space-y-4">
                <ul className="flex flex-col gap-3">
                  {thread.messages &&
                    thread.messages.map((message: MessageSchema) => (
                      <li
                        key={message.id}
                        className={`flex ${
                          message.is_author_box_maker
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                            message.is_author_box_maker
                              ? "bg-yellow-500/20 text-yellow-100 border border-yellow-500/40"
                              : "bg-neutral-700 text-neutral-200 border border-neutral-600"
                          }`}
                        >
                          {message.message_title && (
                            <p className="font-medium mb-0.5">
                              {message.message_title}
                            </p>
                          )}
                          <p className="text-inherit whitespace-pre-wrap">
                            {message.message_body}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
                <SendMessage box_id={box_id} thread_id={thread.id} />
              </Card>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-neutral-100">
        Memulai pesan:
      </h2>
      <StartThread box_id={box_id} isAuthenticated={true} />
    </section>
  );
}
