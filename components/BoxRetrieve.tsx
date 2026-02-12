"use client";
import { dashboardFetcher } from "@/lib/Fetcher";
import useSWR from "swr";
import { BoxSchema, originWeb } from "@/app/schemas/schema";
import { handleCopy } from "@/lib/Utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function BoxRetrieve({ box_id }: { box_id: number }) {
  const { data, error, isLoading } = useSWR<BoxSchema>(
    `/api/boxes/${box_id}`,
    dashboardFetcher
  );

  if (error)
    return (
      <p className="text-red-300 text-sm">
        Box tidak ditemukan. Pastikan kamu sudah login.
      </p>
    );
  if (isLoading)
    return <p className="text-neutral-400 animate-pulse">Memuat...</p>;

  return (
    <Card className="space-y-2">
      <h2 className="text-lg font-semibold text-yellow-400">
        {data?.box_title}
      </h2>
      <p className="text-neutral-300 text-sm">{data?.box_description}</p>
      <p className="text-neutral-500 text-xs">
        Dibuat pada: {data?.created_at}
      </p>
      <p className="text-neutral-500 text-xs">
        Diperbarui pada: {data?.updated_at}
      </p>
      <Button
        type="button"
        variant="secondary"
        onClick={() => handleCopy(`${originWeb}/to-box/${data?.id}`)}
        className="mt-2 gap-2"
      >
        <img src="/share.svg" alt="" width={18} height={18} className="invert" />
        Bagikan
      </Button>
    </Card>
  );
}
