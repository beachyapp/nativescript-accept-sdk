import { Observable } from 'tns-core-modules/data/observable';
import { AcceptSdk } from 'nativescript-accept-sdk';

export class HelloWorldModel extends Observable {
  public message: string;
  private acceptSdk: AcceptSdk;


  constructor() {
    super();

    this.acceptSdk = new AcceptSdk();
    this.message = 'Getting token for test environment';

    this.acceptSdk
      .getToken()
      .then(token => {
        console.error("WE HAVE A TOKEN!!!");
        console.error(token);

        this.message = token;
      });

  }
}
