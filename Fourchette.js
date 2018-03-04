var json = require('./restaurants.json');
const request = require('request');
const cheerio = require('cheerio');



function JsonPromo(name,postal){
    var urlRestaurant = "https://m.lafourchette.com/api/restaurant-prediction?name="+name;
    request(urlRestaurant, function(error,response,html){
        if(response != 'undefined'){
        if(response.statusCode == 200){
            
            var json= JSON.parse(html)
            if(json[0]){
                json.forEach(elementRest => {
                    if (elementRest.address.postal_code==postal){
                    var urlPromo = "https://m.lafourchette.com/api/restaurant/"+ elementRest.id+"/sale-type";
                    request(urlPromo, function(error,response,html){
                        
                        var json = JSON.parse(html);
                        json.forEach(elementMenu => {
                        if (elementMenu.is_special_offer) {
                            console.log(elementMenu.title + "      "+ elementRest.name)
                        }
                    
                    });
                
                    });
                    }
                
                    
                });
            
            
            }
        }
        
        }
    
        
       
            
        
    })

}

for (var i=0; i<615;i++){
    if(json[i]!= undefined){
    JsonPromo(json[i].nom,json[i].postal)
    }
}