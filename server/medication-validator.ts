interface DosageLimit {
  min: number;
  max: number;
  unit: string;
  interactions?: string[];
  pregnancyRisk?: string;
  renalRisk?: string;
}

const MEDICATION_LIMITS: Record<string, DosageLimit> = {
  'ceporex': { 
    min: 25, 
    max: 100, 
    unit: 'mg',
    pregnancyRisk: 'Category B - Generally considered safe during pregnancy',
    renalRisk: 'Dose adjustment required for severe renal impairment'
  },
  'prednisona': { 
    min: 2.5, 
    max: 60, 
    unit: 'mg',
    interactions: ['anticoagulants', 'nsaids'],
    pregnancyRisk: 'Category C - Use with caution during pregnancy'
  },
  'paracetamol': { 
    min: 250, 
    max: 1000, 
    unit: 'mg',
    interactions: ['warfarin'],
    pregnancyRisk: 'Category A - Safe during pregnancy'
  }
};

export function validateMedication(name: string, dosage: string): string | null {
  const medName = name.toLowerCase();
  const limits = MEDICATION_LIMITS[medName];

  if (!limits) return null;

  const dosageMatch = dosage.match(/(\d+(\.\d+)?)\s*(mg|ml|g)/i);
  if (!dosageMatch) return null;

  const dosageValue = parseFloat(dosageMatch[1]);
  const dosageUnit = dosageMatch[3].toLowerCase();

  if (dosageUnit !== limits.unit) {
    return `Warning: Expected ${limits.unit} but found ${dosageUnit}`;
  }

  if (dosageValue > limits.max) {
    return `Warning: The dosage (${dosageValue}${dosageUnit}) is higher than recommended (${limits.max}${limits.unit})`;
  }

  if (dosageValue < limits.min) {
    return `Warning: The dosage (${dosageValue}${dosageUnit}) is lower than recommended (${limits.min}${limits.unit})`;
  }

  return null;
}