import { Common, AcceptSdkConfig, AcceptSdkCard, AcceptSdkEnvironment } from './accept-sdk.common';
import { ad } from "tns-core-modules/utils/utils";

declare let net: any;

export class AcceptSdk extends Common {
  private prepareCardData(card: AcceptSdkCard) {
    return new net.authorize.acceptsdk.datamodel.transaction.CardData.Builder(
      card.cardNumber,
      card.expMonth,
      card.expYear,
    )
    .cvvCode(card.cvc)
    // .zipCode("")
    // .cardHolderName("")
    .build();
  }

  private prepareTransactionObject(
    config: AcceptSdkConfig,
    creditCard: AcceptSdkCard,
  ) {
    const merchantAuthentication = net.authorize.acceptsdk.datamodel.merchant.ClientKeyBasedMerchantAuthentication
      .createMerchantAuthentication(config.clientName, config.clientKey);

    return net.authorize.acceptsdk.datamodel.transaction.TransactionObject
      .createTransactionObject(net.authorize.acceptsdk.datamodel.transaction.TransactionType.SDK_TRANSACTION_ENCRYPTION)
      .cardData(this.prepareCardData(creditCard))
      .merchantAuthentication(merchantAuthentication)
      .build();
  }

  getToken(
    config: AcceptSdkConfig,
    card: AcceptSdkCard,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        /**
         * build an Accept SDK Api client to make API calls.
         * parameters:
         *  1) Context - current context
         *  2) AcceptSDKApiClient.Environment - Authorize.net ENVIRONMENT
         */

        let environment;

        switch (config.environment) {
          case AcceptSdkEnvironment.TEST: {
            environment = net.authorize.acceptsdk.AcceptSDKApiClient.Environment.SANDBOX;
          } break;

          case AcceptSdkEnvironment.PROD: {
            environment = net.authorize.acceptsdk.AcceptSDKApiClient.Environment.PRODUCTION;
          } break;

          default: {
            reject(new Error('Environment needs to be set'));
          }
        }
        const transactionObject = this.prepareTransactionObject(config, card);
        const apiClient = new net.authorize.acceptsdk.AcceptSDKApiClient.Builder(
            ad.getApplicationContext(),
            environment,
          )
          .connectionTimeout(10000) // optional connection time out in milliseconds
          .build();

        /**
          * Make a call to get Token API
          * parameters:
          *  1) EncryptTransactionObject - The transactionObject for the current transaction
          *  2) callback - callback of transaction
          */

        apiClient.getTokenWithRequest(transactionObject,
          new net.authorize.acceptsdk.datamodel.transaction.callbacks.EncryptTransactionCallback({
            /**
             * @param response net.authorize.acceptsdk.datamodel.transaction.response.EncryptTransactionResponse
             */
            onEncryptionFinished: response => {
              // console.log('#1 ', response.getDataDescriptor());
              // console.log('#2 ', response.getDataValue());

              resolve(response.getDataValue());
            },
            /**
             * @param errorResponse net.authorize.acceptsdk.datamodel.transaction.response.ErrorTransactionResponse
             */
            onErrorReceived: errorResponse => {
              /**
               * net.authorize.acceptsdk.datamodel.common.Message
               */
              const error = errorResponse.getFirstErrorMessage();

              // console.error('#1 ', error.getMessageCode());
              // console.error('#2 ', error.getMessageText());
              reject(new Error(error.getMessageText()));
            },
          }),
        );
      } catch (e) {
        reject(e);
      }
    });
  }
}
