
interface DosageLimit {
  min: number;
  max: number;
  unit: string;
}

const MEDICATION_LIMITS: Record<string, DosageLimit> = {
  'ceporex': { min: 25, max: 100, unit: 'mg' },
  'prednisona': { min: 2.5, max: 60, unit: 'mg' },
  'tarex': { min: 50, max: 200, unit: 'mg' },
};

export function validateMedication(name: string, dosage: string): string | null {
  const medName = name.toLowerCase();
  const limits = MEDICATION_LIMITS[medName];
  
  if (!limits) return null;

  const dosageMatch = dosage.match(/(\d+(\.\d+)?)\s*(mg|ml|g)/i);
  if (!dosageMatch) return null;

  const dosageValue = parseFloat(dosageMatch[1]);
  const dosageUnit = dosageMatch[3].toLowerCase();

  if (dosageUnit !== limits.unit) return null;

  if (dosageValue > limits.max) {
    return `Warning: The dosage (${dosageValue}${dosageUnit}) is higher than the recommended maximum (${limits.max}${limits.unit})`;
  }
  
  if (dosageValue < limits.min) {
    return `Warning: The dosage (${dosageValue}${dosageUnit}) is lower than the recommended minimum (${limits.min}${limits.unit})`;
  }

  return null;
}
