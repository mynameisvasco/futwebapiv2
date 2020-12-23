import { IUTPersonaEntity } from "./IUTPersonaEntity";

export interface IUTUserEntity {
  coins: { type: string; amount: number };
  country: string;
  draftTokens: { type: string; amount: number };
  email: string;
  hasPlayerPicksPending: boolean;
  hasUnrecoveredFIFAPointsTransaction: boolean;
  id: number;
  points: { type: string; amount: number };
  selectedPersona: number;
  tradeAccess: number;
  _personas: IUTPersonaEntity[];
  _unopenedPacks: number;
  hasTradeAccess(): boolean;
}
