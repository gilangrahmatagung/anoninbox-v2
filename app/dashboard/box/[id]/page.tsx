import BoxRetrieve from "@/components/BoxRetrieve";
import ThreadAndMessages from "@/components/ThreadAndMessages";

export default async function BoxPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-yellow-400">Messages Inbox</h1>
        <p className="text-neutral-400 text-sm">Detail Box:</p>
      </header>

      <BoxRetrieve box_id={id} />

      <section className="border-t border-neutral-700 pt-6 space-y-4">
        <h2 className="text-xl font-semibold text-neutral-100">
          Pesan yang masuk:
        </h2>
        <ThreadAndMessages box_id={id} />
      </section>
    </div>
  );
}
