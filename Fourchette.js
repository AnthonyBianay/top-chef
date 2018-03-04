var json = require('./restaurants.json');
const request = require('request');
const cheerio = require('cheerio');



function JsonPromo(name,postal){
    //The first request use the la fourchette api to get the id of the restaurant
    var urlRestaurant = "https://m.lafourchette.com/api/restaurant-prediction?name="+name;
    request(urlRestaurant, function(error,response,html){
        if(response != 'undefined'){
        if(response.statusCode == 200){//this status code means, there are no problem
            
            var json= JSON.parse(html)// The api return a json file, that is why we have to parse it 
            if(json[0]){
                json.forEach(elementRest => {
                    //Thanks to the name of the restaurant and the postal code I can get the the promotion of the strred restaurant using a seconde request
                    if (elementRest.address.postal_code==postal){
                    var urlPromo = "https://m.lafourchette.com/api/restaurant/"+ elementRest.id+"/sale-type";
                    request(urlPromo, function(error,response,html){
                        
                        var json = JSON.parse(html);
                        json.forEach(elementMenu => {
                        if (elementMenu.is_special_offer) {//If the restaurant have promotion, it should be displayed on the console
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

for (var i=0; i<615;i++){//this loop permit to initialize the funtion 
    if(json[i]!= undefined){
    JsonPromo(json[i].nom,json[i].postal)
    }
}