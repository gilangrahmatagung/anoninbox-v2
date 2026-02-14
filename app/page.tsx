import Link from "next/link";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 tracking-tight">
          ANONINBOX
        </h1>
        <h2 className="text-lg text-neutral-300 font-medium">
          Get honest advice with anonymous message box
        </h2>
      </header>



      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-neutral-100">
          Anoninbox itu apaan sih?
        </h3>
        <p className="text-neutral-300 leading-relaxed">
          Anoninbox itu aplikasi web supaya kamu bisa saling berkirim pesan
          dengan orang lain secara anonim.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-neutral-100">
          Emang kenapa harus anonim?
        </h3>
        <p className="text-neutral-300 leading-relaxed">
          Dengan pesan anonim kamu bisa mendapatkan saran dan nasihat yang paling relevan untuk perbaikan diri kamu.
          Teman yang ngirim pesan ke kamu juga nggak akan segan untuk ngasih masukan yg paling jujur.
          Kamu bahkan bisa memberi balasan kepada mereka tanpa tahu identitasnya.
          Bahkan kami tak tahu pesan kalian, rahasia dijamin!
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-neutral-100">
          Aplikasi ini cocok untuk siapa?
        </h3>
        <p className="text-neutral-300 leading-relaxed">
          Anoninbox cocok untuk siapapun, untuk pribadi maupun profesional.
          Sebagai pribadi, kamu bisa mendapat nasihat dan saran yg jujur dari teman-teman kamu.
          Untuk profesional, aplikasi ini juga cocok kalau kamu berada di organisasi atau pekerjaan untuk mendapat saran perbaikan untuk hasil kerja yg lebih baik.
          Anggap aplikasi ini semacam kotak saran yg tersedia dalam bentuk digital.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-neutral-100">
          Cara pakenya gimana?
        </h3>
        <p className="text-neutral-300">Gampang banget kok,</p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-300 leading-relaxed">
          <li>Lakukan pendaftaran akun lalu login.</li>
          <li>Buat kotak pesan baru dengan deskripsi sesuai tujuan.</li>
          <li>Bagikan tautan kotak pesan ke orang-orang yg kamu ingin dapat saran dari mereka.</li>
          <li>Orang yg mendapat tautan bisa menulis pesan dengan bebas tanpa takut ketahuan identitas asli mereka.</li>
          <li>Tunggu pesan masuk. Akan ada notifikasi via email saat ada pesan baru yang masuk.</li>
          <li>Kamu juga bisa lanjut berbalas pesan dengan pemberi pesan tetap anonim.</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-200">
          Kelebihan Anoninbox
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="flex flex-col gap-2">
            <img
              src="/icon-anonymous.svg"
              alt=""
              width={32}
              height={32}
              className="invert"
            />
            <h4 className="font-semibold text-yellow-400">Anonim</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Kirim dan terima saran tanpa membuka identitas. Pengirim dan penerima tetap privasi.
            </p>
          </Card>
          <Card className="flex flex-col gap-2">
            <img
              src="/icon-lock.svg"
              alt=""
              width={32}
              height={32}
              className="invert"
            />
            <h4 className="font-semibold text-yellow-400">Pesan terenkripsi</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Pesan dilindungi. Rahasia percakapan kamu aman dan tidak kami simpan isinya.
            </p>
          </Card>
          <Card className="flex flex-col gap-2">
            <img
              src="/icon-email.svg"
              alt=""
              width={32}
              height={32}
              className="invert"
            />
            <h4 className="font-semibold text-yellow-400">Notifikasi Email</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Dapatkan pemberitahuan lewat email saat ada pesan baru yang masuk.
            </p>
          </Card>
        </div>
      </section>

      <section className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-6 text-center space-y-4">
        <h3 className="text-xl font-semibold text-yellow-400">
          Ingin pesan otentik?
        </h3>
        <p className="text-neutral-300 text-sm max-w-md mx-auto">
          Buat kotak saran kamu, bagikan tautan, dan dapatkan pesan yang jujur untukmu.
        </p>
        <Link
          href="/users/login"
          className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium bg-yellow-400 text-neutral-900 hover:bg-yellow-500 transition-colors min-w-[10rem]"
        >
          Masuk ke Anoninbox
        </Link>
      </section>
      
    </div>
  );
}
