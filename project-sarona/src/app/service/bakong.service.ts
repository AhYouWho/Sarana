import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const BakongKHQR: any;
@Injectable({
  providedIn: 'root',
})
export class BakongService {
  private khqrInstance: any;
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {
    if (typeof BakongKHQR === 'undefined') {
      console.error('BakongKHQR library is not loaded.');
      return;
    }
    this.khqrInstance = new BakongKHQR.BakongKHQR();
  }

  generateIndividual(params: {
    receiverId: string;
    receiverName: string;
    receiverCity: string;
    currency: string;
    amount: number;
    mobileNumber: string;
    storeLabel: string;
    terminalLabel: string;
    purposeOfTransaction: string;
    languagePreference: string;
    merchantNameAlt: string;
    merchantCityAlt: string;
    upiMerchantAccount: string;
  }): any {
    if (!this.khqrInstance) {
      console.error('KHQR instance is not initialized.');
      return null;
    }

    const data = BakongKHQR.khqrData;
    const info = BakongKHQR.IndividualInfo;

    const optionalData = {
      currency: data.currency[params.currency],
      amount: params.amount,
      mobileNumber: params.mobileNumber,
      storeLabel: params.storeLabel,
      terminalLabel: params.terminalLabel,
      purposeOfTransaction: params.purposeOfTransaction,
      languagePreference: params.languagePreference,
      merchantNameAlternateLanguage: params.merchantNameAlt,
      merchantCityAlternateLanguage: params.merchantCityAlt,
      upiMerchantAccount: params.upiMerchantAccount,
    };

    const individualInfo = new info(
      params.receiverId,
      params.receiverName,
      params.receiverCity,
      optionalData
    );

    return this.khqrInstance.generateIndividual(individualInfo);
  }

  checkTransaction(md5: string) {
    return this.http.post(`${this.api}/payment/bakong/transaction-status`, {
      md5,
    });
  }
}
