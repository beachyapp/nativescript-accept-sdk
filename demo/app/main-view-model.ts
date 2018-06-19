import { Observable } from 'tns-core-modules/data/observable';
import { AcceptSdk } from 'nativescript-accept-sdk';

export class HelloWorldModel extends Observable {
  public message: string;
  private acceptSdk: AcceptSdk;


  constructor() {
    super();

    this.acceptSdk = new AcceptSdk();
    this.message = 'Getting token for test environment';

    const cc = {
      cardNumber: '4111111111111111',
      expMonth: '11',
      expYear: '22',
      cvc: '256',
    };

    const config = {
      clientName: '5KP3u95bQpv',
      clientKey: '5FcB6WrfHGS76gHW3v7btBCE3HuuBuke9Pj96Ztfn5R32G5ep42vne7MCWZtAucY',
      environment: 'test',
    };


    this.acceptSdk
      .getToken(config, cc)
      .then(token => {
        console.error("WE HAVE A TOKEN!!!");
        console.error(token);

        this.message = token;
      });

  }
}
