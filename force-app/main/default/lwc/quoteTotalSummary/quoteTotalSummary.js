/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement , api} from "lwc";
import AdjustQuotePrice from "c/adjustQuotePrice";


export default class QuoteTotalSummary extends LightningElement {
    @api recordId;

    async openModal(){
        const result = await AdjustQuotePrice.open({
            recordId : this.recordId
        });
    }
}
