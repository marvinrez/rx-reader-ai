
interface DosageLimit {
  min: number;
  max: number;
  unit: string;
  interactions?: string[];
  pregnancyRisk?: string;
  renalRisk?: string;
  commonAbbreviations?: string[];
}

const MEDICATION_LIMITS: Record<string, DosageLimit> = {
  'ceporex': { 
    min: 25, 
    max: 100, 
    unit: 'mg',
    commonAbbreviations: ['cpx', 'cpr'],
    pregnancyRisk: 'Category B - Generally considered safe during pregnancy',
    renalRisk: 'Dose adjustment required for severe renal impairment'
  },
  'prednisona': { 
    min: 2.5, 
    max: 60, 
    unit: 'mg',
    commonAbbreviations: ['pred', 'pdm'],
    interactions: ['anticoagulants', 'nsaids'],
    pregnancyRisk: 'Category C - Use with caution during pregnancy'
  },
  'paracetamol': { 
    min: 250, 
    max: 1000, 
    unit: 'mg',
    commonAbbreviations: ['pcm', 'para'],
    interactions: ['warfarin'],
    pregnancyRisk: 'Category A - Safe during pregnancy'
  },
  'clonazepam': { 
    min: 0.25, 
    max: 2, 
    unit: 'mg',
    commonAbbreviations: ['clon', 'clz'],
    interactions: ['alcohol', 'opioids'],
    pregnancyRisk: 'Category D - Risk during pregnancy',
    renalRisk: 'Use with caution in renal impairment'
  }
};

export function validateMedication(name: string, dosage: string): {
  warning: string | null;
  interactions?: string[];
  pregnancyRisk?: string;
  renalRisk?: string;
} {
  const medName = name.toLowerCase();
  const limits = MEDICATION_LIMITS[medName];
  
  if (!limits) return { warning: null };

  const dosageMatch = dosage.match(/(\d+(\.\d+)?)\s*(mg|ml|g)/i);
  if (!dosageMatch) return { warning: null };

  const dosageValue = parseFloat(dosageMatch[1]);
  const dosageUnit = dosageMatch[3].toLowerCase();

  let warning = null;
  if (dosageUnit !== limits.unit) {
    warning = `Warning: Expected ${limits.unit} but found ${dosageUnit}`;
  } else if (dosageValue > limits.max) {
    warning = `Warning: The dosage (${dosageValue}${dosageUnit}) is higher than recommended (${limits.max}${limits.unit})`;
  } else if (dosageValue < limits.min) {
    warning = `Warning: The dosage (${dosageValue}${dosageUnit}) is lower than recommended (${limits.min}${limits.unit})`;
  }

  return {
    warning,
    interactions: limits.interactions,
    pregnancyRisk: limits.pregnancyRisk,
    renalRisk: limits.renalRisk
  };
}
