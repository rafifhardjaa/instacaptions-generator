import captions from "../../../../data/captions";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (!category || !captions[category]) {
    return Response.json({ error: "Kategori tidak ditemukan" }, { status: 400 });
  }

  const randomCaption =
    captions[category][Math.floor(Math.random() * captions[category].length)];

  return Response.json({ caption: randomCaption });
}
