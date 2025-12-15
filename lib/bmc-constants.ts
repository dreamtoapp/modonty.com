export const BMC_SECTION_IDS = {
  KEY_PARTNERS: 'keyPartners',
  KEY_ACTIVITIES: 'keyActivities',
  KEY_RESOURCES: 'keyResources',
  VALUE_PROPOSITIONS: 'valuePropositions',
  CUSTOMER_RELATIONSHIPS: 'customerRelationships',
  CHANNELS: 'channels',
  CUSTOMER_SEGMENTS: 'customerSegments',
  COST_STRUCTURE: 'costStructure',
  REVENUE_STREAMS: 'revenueStreams',
} as const;

export const ALL_BMC_SECTION_IDS = Object.values(BMC_SECTION_IDS);

export type BMCSectionId = typeof BMC_SECTION_IDS[keyof typeof BMC_SECTION_IDS];









