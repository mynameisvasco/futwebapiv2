import { LoginOptions } from "./options/LoginOptions";
import { authenticator } from "otplib";
import { SecurityOptions } from "./options/SecurityOptions";

export class Login {
  private loginView: any;

  constructor() {
    if ((window as any).getAppMain) {
      this.loginView = (window as any)
        .getAppMain()
        .getRootViewController()
        .getView()
        .getSubviews()[0];
    }
  }

  /**
   * Opens login form from web app initial page
   */
  open() {
    this.loginView._btnLogin._tapDetected();
  }

  /**
   * Performs login using provided options
   * @param options account login details
   */
  login(options: LoginOptions) {
    console.log(options);
    (document.getElementById("email") as HTMLInputElement).value =
      options.email;
    (document.getElementById("password") as HTMLInputElement).value =
      options.password;
    document.getElementById("btnLogin").click();
  }

  /**
   * Selects security method to use
   * @param option email or app 2fa method.
   */
  selectSecurity(option: "APP" | "EMAIL") {
    const inputs = Array.from(document.getElementsByTagName("input"));
    const security = inputs.find((o: HTMLInputElement) => {
      return o.value === option;
    });
    if (security) {
      security.click();
      document.getElementById("btnSendCode").click();
    }
  }

  /**
   * Performs security validation using specified options
   * @param options token2fa or code2fa
   */
  security(options: SecurityOptions) {
    if (options.code2fa) {
      (document.getElementById("oneTimeCode") as HTMLInputElement).value =
        options.code2fa;
    } else {
      (document.getElementById(
        "oneTimeCode"
      ) as HTMLInputElement).value = authenticator.generate(options.token2fa);
    }
    document.getElementById("btnSubmit").click();
  }
}
