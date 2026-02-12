import StartThread from "@/components/StartThread";
import ThreadWithSender from "@/components/ThreadWithSender";
import ToBox from "@/components/ToBoxRetrieve";
import { cookies } from "next/headers";

export default async function ToBoxPage({
  params,
}: {
  params: Promise<{ tobox_id: number }>;
}) {
  const { tobox_id } = await params;

  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("sessionid");

  if (isAuthenticated) {
    return (
      <div className="space-y-8">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold text-yellow-400">Box:</h2>
          <ToBox box_id={tobox_id} />
        </header>
        <ThreadWithSender box_id={tobox_id} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-yellow-400">Box:</h2>
        <ToBox box_id={tobox_id} />
      </header>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-100">Pesan kamu:</h2>
        <StartThread box_id={tobox_id} isAuthenticated={false} />
      </section>
    </div>
  );
}
