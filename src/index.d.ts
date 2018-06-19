import { Common, AcceptSdkConfig, AcceptSdkCard } from './accept-sdk.common';
export declare class AcceptSdk extends Common {
  getToken(config: AcceptSdkConfig, card: AcceptSdkCard): Promise<string>;
}
