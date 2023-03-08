/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import {  api, wire,track } from "lwc";
import LightningModal from 'lightning/modal';
import getQuote from '@salesforce/apex/quoteController.getQuote';
import saveAmount from "@salesforce/apex/quoteController.saveAmount";
import {refreshApex} from '@salesforce/apex';


export default class AdjustQuotePrice extends LightningModal {
  @api recordId;
  @track adjustedAmount = 0;
  quoteData={};
  record;


  @wire(getQuote,{recordId : '$recordId'})
  getQuote(result){
    this.record = result;
    if(result.data){
      this.quoteData = result.data;
      this.adjustedAmount = result.data.totalQuotedAmount;
    }
    else{
      console.log(result.error);
    }
  }

    handleCancel() {
      this.close('okay');
    }

    handleSave(event){
      var updateQuote = {};
      var totalQuotedAmount = this.template.querySelector('[data-field="amount"]').value;
      updateQuote = {...this.quoteData, totalQuotedAmount}; 
      saveAmount({quoteData: updateQuote})
        .then( result =>{
          refreshApex(this.record);
          this.close('okay');
        }
      );

    }
}
