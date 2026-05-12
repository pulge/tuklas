import { toast } from "@/lib/toast";

/**
 * Exports data as a JSON file
 */
export function exportToJson(data: Record<string, unknown>[], filename: string) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  toast.success('Data exported as JSON');
}

/**
 * Exports data as a CSV file (Excel compatible)
 */
export function exportToCsv(headers: string[], rows: (string | number | boolean | null | undefined)[][], filename: string) {
  if (rows.length === 0) return;

  const csvContent = [
    headers.join(","),
    ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
  ].join("\n");

  // Prepend BOM (\uFEFF) for Excel UTF-8 compatibility
  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success('Data exported as CSV/Excel');
}
