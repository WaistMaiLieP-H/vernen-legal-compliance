export enum PersonaCitizenStatus {
  CONCEIVED = "CONCEIVED",
  SHELL_DEPLOYED = "SHELL_DEPLOYED",
  WORKERS_ACTIVE = "WORKERS_ACTIVE",
  KNOWLEDGE_ACCRUING = "KNOWLEDGE_ACCRUING",
  AUTONOMOUS = "AUTONOMOUS",
  CERTIFIED = "CERTIFIED",
}

export interface PersonaCitizen {
  id: string;
  name: string;
  trademark: string;
  domain: string;
  description: string;
  status: PersonaCitizenStatus;
  workers: string[];
  knowledgeStoreId: string;
  conceivedAt: string;
  deployedAt?: string;
}

export enum WorkerStatus {
  DESIGNED = "DESIGNED",
  DEPLOYED = "DEPLOYED",
  OPERATIONAL = "OPERATIONAL",
  SUSPENDED = "SUSPENDED",
}

export interface Worker {
  id: string;
  name: string;
  personaId: string;
  description: string;
  status: WorkerStatus;
  deployedAt?: string;
}
