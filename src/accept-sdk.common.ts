import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';

export class Common extends Observable {
  public message: string;

  constructor() {
    super();
    this.message = Utils.SUCCESS_MSG();
  }

  public greet() {
    return "Hello, NS";
  }

  public getToken(): Promise<string>  {
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  public getTokenObjC() {

  }
}

export class Utils {
  public static SUCCESS_MSG(): string {
    let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.`;

    return msg;
  }
}
