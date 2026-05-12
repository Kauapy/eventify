export function formatarData(data) {
  if (!data) return "";
  const d = new Date(data);
  if (Number.isNaN(d.getTime())) return data;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatarDataCurta(data) {
  if (!data) return "";
  const d = new Date(data);
  if (Number.isNaN(d.getTime())) return data;
  return d.toLocaleDateString("pt-BR");
}

export function formatarValor(valor) {
  const num = Number(valor);
  if (Number.isNaN(num) || num <= 0) return "Gratuito";
  return num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function toDateInput(data) {
  if (!data) return "";
  const d = new Date(data);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
