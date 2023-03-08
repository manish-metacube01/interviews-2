public with sharing class quoteController {
    public quoteController() {
        
    }

    @AuraEnabled(cacheable=true)
    public static QuoteDto getQuote(String recordId) {
        Quote__c q = [Select id,name, StartDate__c, EndDate__c FROM Quote__c Where id=:recordId LIMIT 1];
        QuoteDto quote = new QuoteDto(q);
        System.debug(quote);
        return quote;    
    }

    @AuraEnabled
public static void saveQuote(QuoteDto quoteData, String recordId) {
   try {
        Quote__c q = new Quote__c();
        q.id = quoteData.id;
        q.StartDate__c = quoteData.startDate;
        q.EndDate__c = quoteData.endDate;
        System.debug('new quote'+ q);
        update q;
   } catch (Exception e) {
        System.debug('Exception Occured'+ e);
   }
    
}
}