export type ReceiptStatus = "pendente" | "aprovado" | "reprovado";

export type Church = {
  id: string;
  name: string;
  city: string;
  cotas: number;
  amount: number;
  participants: number;
};

export type Participant = {
  id: string;
  name: string;
  whatsapp: string;
  city: string;
  churchId: string;
  churchName: string;
  cotas: number;
  amount: number;
  date: string;
  status: ReceiptStatus;
  createdAt: string;
  hideFromRanking: boolean;
};

export type Contribution = {
  id: string;
  participantName: string;
  churchName: string;
  cotas: number;
  amount: number;
  createdAt: string;
  status: ReceiptStatus;
};

export type Settings = {
  goalAmount: number;
  cotaValue: number;
  totalCotas: number;
  whatsappNumber: string;
  whatsappContactName: string;
};

export type ImpactStats = {
  peopleReached: number;
  livesTransformed: number;
  familiesSupported: number;
  newPeople: number;
  projectsCompleted: number;
};

export type CampaignStats = {
  totalRaised: number;
  totalCotasFilled: number;
  totalParticipants: number;
  totalChurches: number;
  totalReceipts: number;
};

export type TopParticipant = {
  name: string;
  churchName: string;
  cotas: number;
  amount: number;
};
