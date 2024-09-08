import pako from "pako";
import * as fuzzball from "fuzzball";

export async function loadForbiddenPasswords(): Promise<string[]> {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/django/django/main/django/contrib/auth/common-passwords.txt.gz`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok!");
    }

    const arrayBuffer = await response.arrayBuffer();
    const decompressedData = pako.ungzip(new Uint8Array(arrayBuffer), {
      to: "string",
    });

    const forbiddenPasswords = decompressedData
      .split("\n")
      .map((line) => line.trim().toLowerCase());
    return forbiddenPasswords;
  } catch (err) {
    throw new Error(`Error reading the file: ${(err as Error).message}`);
  }
}

// Use fuzzball library to check the similarity ratio between attributes and password
export function calculateSimilarity(attribute: string, password: string) {
  return fuzzball.ratio(attribute, password) / 100;
};
