import { Common, AcceptSdkCard, AcceptSdkConfig, AcceptSdkEnvironment } from './accept-sdk.common';

export class AcceptSdk extends Common {
  getToken(
    config: AcceptSdkConfig,
    card: AcceptSdkCard,
  ): Promise<string> {
    return new Promise((resolve, reject) => {

      let environment;

      switch (config.environment) {
        case AcceptSdkEnvironment.TEST: {
          environment = AcceptNSEnvironment.ENV_TEST;
        } break;

        case AcceptSdkEnvironment.PROD: {
          environment = AcceptNSEnvironment.ENV_LIVE;
        } break;

        default: {
          reject(new Error('Environment needs to be set'));
        }
      }

      const acceptConfig = new AcceptNSConfig({
        environment
      });

      acceptConfig.clientName = '5KP3u95bQpv';
      acceptConfig.clientKey = '5FcB6WrfHGS76gHW3v7btBCE3HuuBuke9Pj96Ztfn5R32G5ep42vne7MCWZtAucY';

      const req = new AcceptNSRequest();

      req.cardNumber = card.cardNumber;
      req.expMonth = card.expMonth;
      req.expYear = card.expYear;
      req.cvc = card.cvc;

      try {
        AcceptNS.shared.getTokenWithConfigPayloadCompletion(
          acceptConfig,
          req,
          token => {
            if (token) {
              resolve(token);
            } else {
              reject();
            }
          });
      } catch (e) {
        reject(e);
      }
    });
  }
}
