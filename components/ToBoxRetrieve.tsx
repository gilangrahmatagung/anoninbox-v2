import { ErrMsg } from "@/lib/CommonMessage";
import { baseUrl, BoxSchema } from "@/app/schemas/schema";
import Card from "@/components/ui/Card";

export default async function ToBox({ box_id }: { box_id: number }) {
  try {
    const response = await fetch(`${baseUrl}/api/boxes/${box_id}`);

    if (response.ok) {
      const responseData: BoxSchema = await response.json();

      return (
        <Card className="space-y-1">
          <h3 className="text-lg font-semibold text-yellow-400">
            {responseData.box_title}
          </h3>
          <p className="text-neutral-300 text-sm">
            {responseData.box_description}
          </p>
        </Card>
      );
    }

    return (
      <p className="text-red-300 text-sm">Box tidak ditemukan</p>
    );
  } catch (err) {
    return <p className="text-red-300 text-sm">{ErrMsg.ServerError}</p>;
  }
}