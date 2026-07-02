import { Readable } from "stream";
import busboy from "busboy";

async function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });
    const fields = {};

    bb.on("file", (fieldname, file, info) => {
      const chunks = [];

      file.on("data", (data) => {
        chunks.push(data);
      });

      file.on("end", () => {
        fields[fieldname] = {
          buffer: Buffer.concat(chunks),
          filename: info.filename,
          encoding: info.encoding,
          mimetype: info.mimeType,
        };
      });

      file.on("error", (err) => {
        reject(err);
      });
    });

    bb.on("close", () => {
      resolve(fields);
    });

    bb.on("error", (err) => {
      reject(err);
    });

    if (req.body instanceof Buffer) {
      bb.write(req.body);
      bb.end();
    } else if (typeof req.body === "string") {
      bb.write(Buffer.from(req.body));
      bb.end();
    } else {
      req.pipe(bb);
    }
  });
}

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
    // Parse multipart form data
    const fields = await parseMultipartForm(req);

    if (!fields.image_file) {
      return new Response(JSON.stringify({ error: "No image file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const imageData = fields.image_file;
    const formData = new FormData();

    const imageBlob = new Blob([imageData.buffer], {
      type: imageData.mimetype || "image/jpeg",
    });

    formData.append("image_file", imageBlob, imageData.filename || "image.png");
    formData.append("size", "regular");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: formData,
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

    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
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
