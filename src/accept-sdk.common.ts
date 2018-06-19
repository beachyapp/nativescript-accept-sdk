import { Observable } from 'tns-core-modules/data/observable';

export const AcceptSdkEnvironment = {
  PROD: 'prod',
  TEST: 'test',
};

export class AcceptSdkConfig {
  clientName: string;
  clientKey: string;
  environment: string;
}

export class AcceptSdkCard {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc?: string;
}

export class Common extends Observable {
  public getToken(
    config: AcceptSdkConfig,
    card: AcceptSdkCard,
  ): Promise<string>  {
    return new Promise((_resolve, reject) => {
      reject(new Error('Not implemented'));
    });
  }
}
