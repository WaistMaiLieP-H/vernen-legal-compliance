export enum BusinessEntityType {
  LLC = "LLC",
  CORPORATION = "CORPORATION",
  S_CORP = "S_CORP",
  SOLE_PROPRIETORSHIP = "SOLE_PROPRIETORSHIP",
  PARTNERSHIP = "PARTNERSHIP",
  NONPROFIT = "NONPROFIT",
}

export enum USState {
  AL = "AL", AK = "AK", AZ = "AZ", AR = "AR", CA = "CA",
  CO = "CO", CT = "CT", DE = "DE", FL = "FL", GA = "GA",
  HI = "HI", ID = "ID", IL = "IL", IN = "IN", IA = "IA",
  KS = "KS", KY = "KY", LA = "LA", ME = "ME", MD = "MD",
  MA = "MA", MI = "MI", MN = "MN", MS = "MS", MO = "MO",
  MT = "MT", NE = "NE", NV = "NV", NH = "NH", NJ = "NJ",
  NM = "NM", NY = "NY", NC = "NC", ND = "ND", OH = "OH",
  OK = "OK", OR = "OR", PA = "PA", RI = "RI", SC = "SC",
  SD = "SD", TN = "TN", TX = "TX", UT = "UT", VT = "VT",
  VA = "VA", WA = "WA", WV = "WV", WI = "WI", WY = "WY",
  DC = "DC",
}

export interface Client {
  id: string;
  name: string;
  entityType: BusinessEntityType;
  states: USState[];
  industry: string;
  createdAt: string;
}
