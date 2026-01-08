export const getBalanceStatus = (entries, exits) => {
  const total = entries + exits;
  if (total === 0) {
    return {
      variant: 'secondary',
      label: 'No data',
      pct: 0,
    };
  }

  const diff = Math.abs(entries - exits);
  const diffPct = (diff / total) * 100;

  if (diffPct <= 5) {
    return {
      variant: 'success',
      label: 'Normal flow', 
      pct: diffPct,
    };
  }

  if (diffPct <= 15) {
    return {
      variant: 'warning',
      label: 'Slight imbalance',
      pct: diffPct,
    };
  }

  return {
    variant: 'danger',
    label: 'High imbalance',
    pct: diffPct,
  };
}

export function getMonthlyDeviationStatus(monthTotals = []) {
  const arr = (monthTotals || [])
    .slice(0, -1) 
    .map((x) => Number(x || 0))
    .filter((x) => Number.isFinite(x));

  // Necesitas al menos 3 meses históricos para que tenga sentido estadístico
  if (arr.length < 3) {
    return { variant: 'secondary', label: 'Not enough data', pct: 0, mean: 0, std: 0 };
  }

  // 2. Calculamos el Promedio (Media)
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;

  if (mean <= 0) {
    return { variant: 'secondary', label: 'No data', pct: 0, mean: 0, std: 0 };
  }

  // 3. Calculamos Varianza y Desviación Estándar (Muestral)
  const variance =
    arr.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (arr.length - 1);

  const std = Math.sqrt(variance);
  
  // 4. Coeficiente de Variación (CV%)
  const cvPct = (std / mean) * 100;

  // 5. Retornamos estado según umbrales
  if (cvPct <= 20) {
    return { variant: 'success', label: 'Normal deviation', pct: cvPct, mean, std };
  }
  if (cvPct <= 40) {
    return { variant: 'warning', label: 'Moderate deviation', pct: cvPct, mean, std };
  }
  
  return { variant: 'danger', label: 'High deviation', pct: cvPct, mean, std };
}

export function getRejectedTrendStatus({
  baselineAvg = 0,
  recentAvg = 0,
  baselineRate = 0, // %
  recentRate = 0,   // %
} = {}) {
  // Sin data real
  if (baselineAvg <= 0 && recentAvg <= 0) {
    return {
      variant: 'secondary',
      label: 'No rejected data',
      pct: 0,
      baselineAvg: 0,
      recentAvg: 0,
      recentRate: 0,
    };
  }

  // No hay baseline, pero sí hay recientes => ojo
  if (baselineAvg <= 0 && recentAvg > 0) {
    return {
      variant: 'warning',
      label: 'Rejected events appearing',
      pct: 100,
      baselineAvg,
      recentAvg,
      recentRate,
    };
  }

  const deltaPct = ((recentAvg - baselineAvg) / baselineAvg) * 100;

  // Umbrales sugeridos (ajustables)
  const rateHigh = recentRate >= 10;      // >= 10% rejected
  const rateModerate = recentRate >= 5;   // >= 5% rejected

  if (deltaPct > 30 || rateHigh) {
    return {
      variant: 'danger',
      label: 'Rejected increasing strongly',
      pct: deltaPct,
      baselineAvg,
      recentAvg,
      recentRate,
    };
  }

  if (deltaPct > 10 || rateModerate) {
    return {
      variant: 'warning',
      label: 'Rejected increasing',
      pct: deltaPct,
      baselineAvg,
      recentAvg,
      recentRate,
    };
  }

  return {
    variant: 'success',
    label: deltaPct < -10 ? 'Rejected decreasing' : 'Rejected stable',
    pct: deltaPct,
    baselineAvg,
    recentAvg,
    recentRate,
  };
}

