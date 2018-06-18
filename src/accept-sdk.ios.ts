import { Common } from './accept-sdk.common';
import { ios } from 'tns-core-modules/utils/utils';

export class AcceptSdk extends Common {
  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const req = new AcceptNSRequest();

      req.cardNumber = '4111111111111111';
      req.expMonth = '10';
      req.expYear = '22';
      req.cvc = '222';

      const config = new AcceptNSConfig({
        environment: AcceptNSEnvironment.ENV_TEST,
      });

      config.clientName = '5KP3u95bQpv';
      config.clientKey = '5FcB6WrfHGS76gHW3v7btBCE3HuuBuke9Pj96Ztfn5R32G5ep42vne7MCWZtAucY';

      AcceptNS.shared.getTokenWithConfigPayloadCompletion(config, req, token => {
        resolve(token);
      });
    });

  }


  getTokenObjC() {
    const handler = ios
      .getter(AcceptSDKHandler, AcceptSDKHandler.alloc)
      .initWithEnvironment(AcceptSDKEnvironment.ENV_TEST);

    const request = ios
      .getter(AcceptSDKRequest, AcceptSDKRequest.alloc)
      .init();

    request.merchantAuthentication.name = '5KP3u95bQpv';
    request.merchantAuthentication.clientKey = '5FcB6WrfHGS76gHW3v7btBCE3HuuBuke9Pj96Ztfn5R32G5ep42vne7MCWZtAucY';

    try {
      request.securePaymentContainerRequest.webCheckOutDataType.token.cardNumber = '4111111111111111';
      request.securePaymentContainerRequest.webCheckOutDataType.token.expirationMonth = '10';
      request.securePaymentContainerRequest.webCheckOutDataType.token.expirationYear = '22';
      request.securePaymentContainerRequest.webCheckOutDataType.token.cardCode = '222';
    } catch (e) {
      console.error('HIR!!! AFTER ERROR');

      const webCheckOutDataType = ios
        .getter(WebCheckOutDataType, WebCheckOutDataType.alloc)
        .init();

      webCheckOutDataType.token.cardNumber = '4111111111111111';
      webCheckOutDataType.token.expirationMonth = '10';
      webCheckOutDataType.token.expirationYear = '22';
      webCheckOutDataType.token.cardCode = '222';

      request.securePaymentContainerRequest.webCheckOutDataType = webCheckOutDataType;
    }

    handler.getTokenWithRequestSuccessHandlerFailureHandler(
      request,
      (res: AcceptSDKTokenResponse) => {
        console.log("UHUUUU 2222!!!!");
      },
      (error: AcceptSDKErrorResponse) => {
        console.error("ERROR  2222: ");
        console.error(error);
        try {
          console.error(error.getMessages());
        } catch (e) {

        }
      }
    );
  }
}
