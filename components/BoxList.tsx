"use client";
import { dashboardFetcher } from "@/lib/Fetcher";
import useSWR from "swr";
import { baseUrl, BoxSchema, originWeb } from "@/app/schemas/schema";
import Link from "next/link";
import { handleCopy } from "@/lib/Utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function BoxList() {
  const { data, error, isLoading } = useSWR("/api/boxes/", dashboardFetcher);

  if (error)
    return (
      <p className="text-red-300 text-sm">
        Daftar Box tidak ada. Pastikan kamu sudah login.
      </p>
    );
  if (isLoading)
    return (
      <p className="text-neutral-400 animate-pulse">Memuat...</p>
    );

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-neutral-100">Daftar Box</h2>
      {data.length === 0 ? (
        <p className="text-neutral-400">
          Kamu belum punya Box. Ayo buat Box baru.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {data.map((box: BoxSchema) => (
            <li key={box.id}>
              <Card className="flex flex-col gap-3 hover:border-neutral-600 transition-colors">
                <Link
                  href={`/dashboard/box/${box.id}`}
                  className="block group"
                >
                  <h3 className="font-semibold text-yellow-400 group-hover:underline">
                    {box.box_title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    {box.created_at}
                  </p>
                </Link>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    handleCopy(`${originWeb}/to-box/${box.id}`)
                  }
                  className="self-start gap-2"
                >
                  <img
                    src="/share.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="inline-block invert"
                  />
                  Bagikan
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
