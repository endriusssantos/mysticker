export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.REMOVE_BG_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "REMOVE_BG_API_KEY is not configured" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const formData = await req.formData();
    const imageFile = formData.get("image_file");

    if (!imageFile || typeof imageFile === "string") {
      return new Response(JSON.stringify({ error: "No image file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const removeBgFormData = new FormData();
    removeBgFormData.append(
      "image_file",
      imageFile,
      imageFile.name || "image.png",
    );
    removeBgFormData.append("size", "regular");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: removeBgFormData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("remove.bg failed", response.status, errorText);

      return new Response(
        JSON.stringify({
          error: "Failed to remove background",
          details: errorText,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("content-type") || "image/png",
        "Cache-Control": "public, max-age=0, s-maxage=3600",
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return new Response(
        JSON.stringify({ error: "The background removal request timed out" }),
        {
          status: 504,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    console.error("Error removing background:", error);

    return new Response(
      JSON.stringify({
        error: "Unexpected error while removing background",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
