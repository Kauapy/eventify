const KEY = "eventify:interesses";

export function getInteresses() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function temInteresse(id) {
  return getInteresses().includes(id);
}

export function toggleInteresse(id) {
  const atuais = getInteresses();
  const novos = atuais.includes(id)
    ? atuais.filter((x) => x !== id)
    : [...atuais, id];
  localStorage.setItem(KEY, JSON.stringify(novos));
  return novos.includes(id);
}
