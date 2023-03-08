public with sharing class quoteController {
    public quoteController() {
        
    }

    @AuraEnabled(cacheable=true)
    public static QuoteDto getQuote(String recordId) {
        Quote__c q = [Select id,name, StartDate__c, EndDate__c,TotalQuotedAmount__c FROM Quote__c Where id=:recordId LIMIT 1];
        QuoteDto quote = new QuoteDto(q);
        System.debug(quote);
        return quote;    
    }

    @AuraEnabled
    public static void saveQuote(QuoteDto quoteData) {
        try {
            Quote__c q = new Quote__c();
            q.id = quoteData.id;
            q.StartDate__c = quoteData.startDate;
            q.EndDate__c = quoteData.endDate;
            update q;
        } catch (Exception e) {
            System.debug('Exception Occured'+ e);
        }
    }
    
    @AuraEnabled
    public static void saveAmount(QuoteDto quoteData) {
        try {
            Quote__c q = new Quote__c();
            q.id = quoteData.id;
            q.TotalQuotedAmount__c = quoteData.totalQuotedAmount;
            update q;
        } catch (Exception e) {
            System.debug('Exception Occured'+ e);
        }
    }
}