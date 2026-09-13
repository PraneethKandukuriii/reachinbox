import Papa from "papaparse";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CsvRow {
  [key: string]: string | undefined;
}

interface CsvResult {
  emails: string[];
  duplicates: number;
  invalid: string[];
}

export function parseRecipientCsv(file: File): Promise<CsvResult> {
  return new Promise((resolve, reject) => {
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const emailColumn = results.meta.fields?.find(
          (field) => field.trim().toLowerCase() === "email",
        );

        if (!emailColumn) {
          reject(new Error("CSV must contain an email column."));
          return;
        }

        const uniqueEmails = new Set<string>();
        const invalid: string[] = [];
        let duplicates = 0;

        for (const row of results.data) {
          const email = row[emailColumn]?.trim().toLowerCase();

          if (!email) {
            continue;
          }

          if (!emailPattern.test(email)) {
            invalid.push(email);
            continue;
          }

          if (uniqueEmails.has(email)) {
            duplicates++;
            continue;
          }

          uniqueEmails.add(email);
        }

        resolve({
          emails: Array.from(uniqueEmails),
          duplicates,
          invalid,
        });
      },

      error: (error) => {
        reject(error);
      },
    });
  });
}