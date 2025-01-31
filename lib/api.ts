export async function getPredictionData() {
  const res = await fetch(`/api/rank`);
  if (!res.ok) {
    throw new Error("Failed to fetch prediction data");
  }
  return res.json();
}

export async function getPerformanceData() {
  const res = await fetch(`/api/performance`);
  if (!res.ok) {
    throw new Error("Failed to fetch performance data");
  }
  return res.json();
}

export async function getTrendsData() {
  const res = await fetch(`/api/trends`);
  if (!res.ok) {
    throw new Error("Failed to fetch trends data");
  }
  return res.json();
}
