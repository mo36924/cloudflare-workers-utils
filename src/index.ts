export const minPartSize = 1024 * 1024 * 5;

export const defineWorker = <Env = {}>(handler: ExportedHandler<Env>): ExportedHandler<Env> => handler;

export const defineFetchHandler = <Env = {}>(fetch: ExportedHandlerFetchHandler<Env>): ExportedHandler<Env> => ({
  fetch,
});

export const defineScheduledHandler = <Env = {}>(
  scheduled: ExportedHandlerScheduledHandler<Env>,
): ExportedHandler<Env> => ({
  scheduled,
});

export const compress =
  typeof Blob === "undefined"
    ? async (data: string | ArrayBuffer | Blob) => {
        const { Blob } = await import("buffer");
        return new Response(
          (
            new Blob([
              typeof data === "string" ? data : "byteLength" in data ? Buffer.from(data) : data,
            ]).stream() as any as ReadableStream
          ).pipeThrough(new CompressionStream("gzip")),
        ).arrayBuffer();
      }
    : (data: string | ArrayBuffer | Blob) =>
        new Response(
          (new Blob([data]).stream() as any as ReadableStream).pipeThrough(new CompressionStream("gzip")),
        ).arrayBuffer();

export const md5 =
  typeof global !== "undefined"
    ? async (data: ArrayBuffer | ArrayBufferView) => {
        const { createHash } = await import("crypto");
        return createHash("md5")
          .update(Buffer.from("buffer" in data ? data.buffer : data))
          .digest();
      }
    : (data: ArrayBuffer | ArrayBufferView) => crypto.subtle.digest("MD5", data);

export const sha1 = (data: ArrayBuffer | ArrayBufferView) => crypto.subtle.digest("SHA-1", data);

export const hex = (data: ArrayBuffer) =>
  [...new Uint8Array(data)].map((x) => x.toString(16).padStart(2, "0")).join("");

export const base64 = (data: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(data)));
export const base64url = (data: ArrayBuffer) =>
  base64(data).replace(/[+/=/]/g, (m) => (m === "+" ? "-" : m === "/" ? "_" : ""));

export const contentType = (pathname: string) => {
  switch (pathname.match(/\.(\w+)$/)?.[1]) {
    case "css":
      return "text/css; charset=utf-8";
    case "ico":
      return "image/vnd.microsoft.icon";
    case "txt":
      return "text/plain; charset=utf-8";
    case "json":
      return "application/json";
    case "xml":
      return "application/xml";
    default:
      return "text/html; charset=utf-8";
  }
};
