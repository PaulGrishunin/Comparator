#from six.moves.urllib.parse import urljoin
import scrapy
from scrapy.utils.python import to_native_str
#import time
from scrapy import Selector
from scrapy.utils.project import get_project_settings

class OtomotorSpider(scrapy.Spider):
    name = 'otomotospider'
    allowed_domains = ['www.otomoto.pl', 'otomoto.pl']
    start_urls = ['https://www.otomoto.pl/osobowe/?search%5Border%5D=created_at_first%3Adesc&search%5Bbrand_program_id%5D%5B0%5D=&search%5Bcountry%5D=&page='+'%s' % page for page in range(1,21)]
    #print('start_urls=', start_urls)
    
    settings = {
        'USER_AGENT' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0',
        'DOWNLOAD_DELAY': '1',
        }
    
    def parse(self, response):
        #print('RESPOOOOONSEEEEEEE=', response.text)
        marka = response.css("article.adListingItem > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1) > a:nth-child(1)::attr(title)").extract()

        year = response.css("article.adListingItem > div:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > span:nth-child(1)::text").extract()
        
        fuel= response.css("article.adListingItem > div:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(4) > span:nth-child(1)::text").extract()
        
        price = response.css("article.adListingItem > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > span:nth-child(3) > span:nth-child(1)::text").extract()
        
        photo_link = response.css("article.adListingItem > div:nth-child(1) > a:nth-child(1) > img:nth-child(1)::attr(data-src)").extract()
        
        ad_link = response.css("article.adListingItem > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1) > a:nth-child(1)::attr(href)").extract()
        count = 0

        for item in zip(marka, year, fuel, price, ad_link):
            scraped_data = {
                'marka': item[0][:item[0].find(' ')].replace('Škoda', 'Skoda').replace('Citroën','Citroen').replace('Land','Land-Rover').replace('Alfa','Alfa-Romeo'),  
                'model': item[0].split(' ')[1],
                'year': item[1],
                'fuel': item[2].replace('Benzyna+LPG', 'Gasoline').replace('Benzyna', 'Gasoline').replace('Hybryda', 'Electric/Gasoline').replace('Elektryczny', 'Electric'), 
                'price': item[3].replace(' ', ''),
                'currency': 'PLN',
                'ad_link': item[4],
                
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


