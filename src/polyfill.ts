import { Blob } from "buffer";
import { createHash, webcrypto } from "crypto";

globalThis.crypto ??= webcrypto as any;

const digest = webcrypto.subtle.digest.bind(webcrypto.subtle);

webcrypto.subtle.digest = async (algorithm, data) =>
  algorithm === "MD5"
    ? Promise.resolve(
        createHash(algorithm)
          .update(Buffer.from("buffer" in data ? data.buffer : data))
          .digest(),
      )
    : digest(algorithm, data);

globalThis.Blob ??= Blob as any;
