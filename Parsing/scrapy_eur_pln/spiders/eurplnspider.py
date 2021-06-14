#from six.moves.urllib.parse import urljoin
import scrapy
from scrapy.utils.python import to_native_str
#import time
from scrapy import Selector

class EurplnSpider(scrapy.Spider):
    name = 'eurplnspider'
    allowed_domains = ['bankier.pl, www.bankier.pl']
    start_urls = ['https://www.bankier.pl/waluty/kursy-walut/forex/eurpln']
    
    def parse(self, response):
        #print(response.text)
        kurs = response.xpath('//div[@class = "profilLast"]/text()').extract()
        #print('kurs',kurs[0].replace(' ', ''))
        exchange_rate_EUR_PLN = kurs[0].replace(',', '.')
        print('exchange_rate_EUR_PLN', float(exchange_rate_EUR_PLN))
        yield float(exchange_rate_EUR_PLN) 
            
            
            
