import { ref } from "vue";

export function useCurrentTimeISO() {
  const currentISOTime = ref("");

  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  currentISOTime.value = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return { currentISOTime };
}
