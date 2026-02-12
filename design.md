- halaman reset password v
- fitur bagikan box v
- hassession bermasalah v
- fitur memudahkan authenticated user to send to box
- validasi maks desc dan body message di FE

- mencegah start thread dua kali

BELUM TERLALU PERLU
- id box terlalu mudah dicari, bisa backend yg ubah bisa cm salting di url page nya
- display loading yg ngga pakai useSWR
- Harap isi bidang ini required html dihias


AGAK SUDAH
- profil, at least tahu sedang login dengan akun apa, bisananti
- nama user? kayanya belum dulu
- bikin menu v


TESTING:
- harus coba di hit lebih dari sekali, gimana response dan konfirmasi ui nya kek apa

Ide:
- tentang single type backend-frontend. Terus bagaimana kontrak API yg baik, apakah error message response harus terbaca user?. Bagaimana jika semua di backend response sudah lengkap? {status: enum, message:, data, dll}. Di frontend success msg bagaimana kelola? Bisakah menyatukan succ dan err message? lihat fetchernya
