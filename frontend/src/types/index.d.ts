export {};

declare global {
  interface Window {
    ethereum: any;
  }
}

export interface IWave {
  waver: any;
  address: string;
  message: string;
  timestamp: any;
}
