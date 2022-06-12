export interface Market {
  marketId: number;
  question: string;
  description: string;
  marketType: number;
  options: string[];
  resolverUrl: string;
  creatorImageHash: string;
  endTimestamp: number;
}
