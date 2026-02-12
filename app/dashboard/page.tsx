import BoxList from "@/components/BoxList";
import BoxCreate from "@/components/BoxCreate";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-yellow-400">Dashboard</h1>
        <p className="text-neutral-300 text-sm leading-relaxed">
          &ldquo;Barangsiapa yang ingin menasihati penguasa, janganlah ia menampakkan dengan terang-terangan. Hendaklah ia pegang tangannya lalu menyendiri dengannya. Jika penguasa itu mau mendengar nasihat itu, maka itu yang terbaik dan bila si penguasa itu enggan (tidak mau menerima), maka sungguh ia telah melaksanakan kewajiban amanah yang dibebankan kepadanya.&rdquo; <br /> <b>Hadits Riwayat Ahmad (III/ 403-404)</b>
        </p>
      </header>

      <BoxCreate />

      <BoxList />
    </div>
  );
}
