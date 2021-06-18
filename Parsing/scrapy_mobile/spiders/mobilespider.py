from six.moves.urllib.parse import urljoin
import scrapy
from scrapy.utils.python import to_native_str
import time
from scrapy import Selector

class MobilespiderSpider(scrapy.Spider):
    name = 'mobilespider'
    allowed_domains = ['autoscout24.com']
    start_urls = ['https://www.autoscout24.com/lst/audi?sort=age&desc=1&ustate=N%2CU&size=20&page='+'%s&atype=C&' % page for page in range(1,5)]\
                 + ['https://www.autoscout24.com/lst/toyota?sort=age&desc=1&ustate=N%2CU&size=20&page='+'%s&atype=C&' % p for p in range(1,5)]\
                 + ['https://www.autoscout24.com/lst/nissan?sort=age&desc=1&ustate=N%2CU&size=20&page='+'%s&atype=C&' % p for p in range(1,5)]\
                 + ['https://www.autoscout24.com/lst/skoda?sort=age&desc=1&ustate=N%2CU&size=20&page='+'%s&atype=C&' % p for p in range(1,5)]\
                 + ['https://www.autoscout24.com/lst/ford?sort=age&desc=1&ustate=N%2CU&size=20&page='+'%s&atype=C&' % p for p in range(1,5)] \
                 + ['https://www.autoscout24.com/lst/opel?sort=age&desc=1&ustate=N%2CU&size=20&page=' + '%s&atype=C&' % p for p in range(1,5)]\
                 + ['https://www.autoscout24.com/lst/renault?sort=age&desc=1&ustate=N%2CU&size=20&page='+'%s&atype=C&' % p for p in range(1,5)]\
                 + ['https://www.autoscout24.com/lst/volkswagen?sort=age&desc=1&ustate=N%2CU&size=20&page='+'%s&atype=C&' % p for p in range(1,5)]\
                 + ['https://www.autoscout24.com/lst/volvo?sort=age&desc=1&ustate=N%2CU&size=20&page=' + '%s&atype=C&' % p for p in range(1,5)]\
                 + ['https://www.autoscout24.com/lst/opel?sort=age&desc=1&ustate=N%2CU&size=20&page=' + '%s&atype=C&' % p for p in range(1, 5)]
    #print(start_urls)     
    
    def parse(self, response):
        #print(response.text)
        marka = response.css("div.cl-list-element > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1)::text").extract()

        year = response.css("div.cl-list-element-gap > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(2)::text").extract()
        
        fuel = response.css("div.cl-list-element > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(7)::text").extract()
        
        country = response.xpath('//div[@class = "cldf-summary-seller-contact-address"]/span[1]/text()').extract()
        
        place = response.xpath('//div[@class = "cldf-summary-seller-contact-address"]/span[2]/text()').extract()  
 
        price = response.css("div.cl-list-element > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)::text").re('([0-9,0-9{3}]+)')
        
        photo_link = response.css("div.cl-list-element > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > as24-listing-summary-image:nth-child(1) > picture:nth-child(1) > source:nth-child(1)::attr(data-srcset)").extract()
        
        ad_link = response.css("div.cl-list-element > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)::attr(href)").extract()
        count = 0

        for item in zip(marka, year, fuel, country, place, price, photo_link, ad_link):
            scraped_data = {
                'marka': item[0][:item[0].find(' ')],  
                'model': item[0].split()[1],
                'year': item[1][4:].replace('\n','').replace('(First Registration)','2021'),
                'fuel': item[2].replace('\n',''),
                'country': item[3],
                'place': item[4].replace(',',' ').replace(';',' '),
                'price': item[5].replace(',',''),
                'currency': 'EUR',
                'photo_link': item[6],
                'ad_link': 'https://www.autoscout24.com' + item[7],
                
            }
            yield scraped_data
            
        #time.sleep(2) #If you take out this line you won't get anything because the content of that page take some time to get loaded.

        #NEXT_PAGE_SELECTOR = '.next-page > a::attr(href)'         
        #print('NEXT_PAGE_SELECTOR=',NEXT_PAGE_SELECTOR)   /html/body/div[1]/div[9]/div[4]/div[2]/div[4]/div[2]/div[4]/ul/li[15]/a
        #print(response.text)
        #next_page = response.css(".next-page a::attr(href)").extract_first()
        #print('NEXT_PAGE=', next_page)
        #if next_page:
            #yield scrapy.Request(
                #response.urljoin(next_page),
                #callback=self.parse
            #) 

#driver.quit()


