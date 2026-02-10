export async function handleCopy(link: string){
    try {
        await navigator.clipboard.writeText(link);
        alert("Tautan berhasil disalin!");
    } catch (err) {
        alert("Gagal membagikan.");
    }
}