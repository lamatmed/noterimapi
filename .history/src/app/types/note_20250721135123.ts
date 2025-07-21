export type Note = {
  text(text: any): [any, any];
  id: string;
  code: string;
  ref: string;
  description: string;
};