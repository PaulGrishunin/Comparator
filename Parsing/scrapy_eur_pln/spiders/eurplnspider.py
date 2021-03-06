
import scrapy
from scrapy.utils.python import to_native_str
from scrapy import Selector

class EurplnSpider(scrapy.Spider):
    name = 'eurplnspider'
    allowed_domains = ['bankier.pl, www.bankier.pl']
    start_urls = ['https://www.bankier.pl/waluty/kursy-walut/nbp/EUR']
    
    def parse(self, response):
        #print(response.text)
        kurs = response.xpath('//div[@class = "profilLast"]/text()').extract()
        #print('kurs',kurs[0].split(' ')[0].replace(',', '.'))
        exchange_rate_EUR_PLN = { "kurs": float(kurs[0].split(' ')[0].replace(',', '.')) }
       
        yield exchange_rate_EUR_PLN
            
            
            
