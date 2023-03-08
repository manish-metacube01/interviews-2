/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getQuote from '@salesforce/apex/quoteController.getQuote';
import saveQuote from '@salesforce/apex/quoteController.saveQuote';

export default class EditQuote extends LightningElement {
  @api recordId;
  quoteData = {
    name: "Quote Name",
    endDate: 1547250828000,
    startDate: 1547250828000
  };
  error;

  @wire(getQuote, {recordId:'$recordId'})
  getQuoteData({data, error}){
    if (data){
      console.log(data);
      this.quoteData = data;
    } else if(error) {
      this.error = error;
    }
  }

  handleSave(event){
    var startDate = this.template.querySelector("lightning-input[data-id='StartDate']").value;
    var endDate = this.template.querySelector("lightning-input[data-id='EndDate']").value;
    var updateQuote;
    updateQuote = {...this.quoteData, startDate, endDate};
    saveQuote({quoteData: updateQuote, recordId: '$recordId'})
    .then(() => {
      const event = new ShowToastEvent({
        title: 'Success',
        message:
            'Record Updated',
    });
    this.dispatchEvent(event);
    });
  }

  renderedCallback() {}
}
