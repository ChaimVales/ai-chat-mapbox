/**
 * FEATURE: export-excel
 * Download AI response as Excel file (.xlsx).
 * Detects markdown tables and exports them as proper Excel sheets.
 * Supports RTL for Hebrew content automatically.
 *
 * Requires: npm install xlsx
 *
 * Files this feature touches:
 *   - src/components/chat/MessageBubble.tsx (add <ExcelButton /> on assistant messages)
 *
 * To remove: delete folder + remove import + remove <ExcelButton /> from MessageBubble.
 */

import { FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Props {
  text: string;
}

/** Detects if text contains Hebrew/Arabic characters */
function isRTL(text: string): boolean {
  return /[֐-׿؀-ۿ܀-߿]/.test(text);
}

/**
 * Parses Markdown tables from text.
 * Returns array of tables, each as array of rows (rows are arrays of cells).
 */
function parseMarkdownTables(text: string): string[][][] {
  const tables: string[][][] = [];
  const lines = text.split('\n');
  let currentTable: string[][] = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // A table row contains pipes
    if (line.startsWith('|') && line.endsWith('|')) {
      // Skip separator lines like |---|---|
      if (/^\|[\s\-:|]+\|$/.test(line)) {
        inTable = true;
        continue;
      }
      const cells = line
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      currentTable.push(cells);
      inTable = true;
    } else if (inTable && currentTable.length > 0) {
      tables.push(currentTable);
      currentTable = [];
      inTable = false;
    }
  }
  if (currentTable.length > 0) tables.push(currentTable);

  return tables;
}

export function ExcelButton({ text }: Props) {
  const handleExport = () => {
    const rtl = isRTL(text);
    const tables = parseMarkdownTables(text);

    const workbook = XLSX.utils.book_new();

    if (tables.length > 0) {
      // Found markdown tables - export each as a sheet
      tables.forEach((table, idx) => {
        const sheet = XLSX.utils.aoa_to_sheet(table);

        // Set RTL view if Hebrew
        if (rtl) {
          sheet['!views'] = [{ RTL: true }];
        }

        // Auto-width columns
        const colWidths = table[0].map((_, colIdx) => {
          const maxLen = Math.max(
            ...table.map((row) => (row[colIdx] || '').length),
            10,
          );
          return { wch: Math.min(maxLen + 2, 50) };
        });
        sheet['!cols'] = colWidths;

        XLSX.utils.book_append_sheet(
          workbook,
          sheet,
          tables.length > 1 ? `Table${idx + 1}` : 'Data',
        );
      });
    } else {
      // No tables - export as plain text in one cell, split by lines
      const lines = text.split('\n').map((line) => [line]);
      const sheet = XLSX.utils.aoa_to_sheet(lines);
      if (rtl) sheet['!views'] = [{ RTL: true }];
      sheet['!cols'] = [{ wch: 80 }];
      XLSX.utils.book_append_sheet(workbook, sheet, rtl ? 'תוכן' : 'Content');
    }

    // Download
    const filename = `chat-${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-green-600 ms-2"
      aria-label="Export to Excel"
      title="הורד כ-Excel"
    >
      <FileSpreadsheet className="w-3 h-3" />
      Excel
    </button>
  );
}
