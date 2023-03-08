public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public Date endDate{get; set;}
  @AuraEnabled
  public Date startDate{get;set;}
  @AuraEnabled
  public String name{get;set;}
  @AuraEnabled
  public Decimal totalQuotedAmount{get;set;}

  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.name = quote.Name;
    this.startDate = quote.startDate__c;
    this.endDate = quote.EndDate__c;
    this.totalQuotedAmount = quote.TotalQuotedAmount__c;
  }

  public override SObject refreshSo() {
    return null;
  }
}
