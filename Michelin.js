var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var json    = [];
var i       = 1;

function restaurants(i){ //This function display into a json all the information about the starred restaurant of the michelin

    if (i > 36){
        fs.writeFile('restaurants.json', JSON.stringify(json), function (err) {
            if (err) throw err;
            console.log('Saved into restaurants.json!');
        });
        return json;
    }
    url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+i;
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
             
            $('[attr-gtm-type = poi]').each(function(i, elem){
                var restau = {nom: "", prix: "", offre: "", genre: "", postal: ""};
                var data = $(elem);
                restau.nom = data.attr("attr-gtm-title");
                
                restau.postal = data.find()
                restau.prix = data.find('.poi_card-display-price').text();
                restau.offre = data.find('.mtpb2c-offers').text();
                restau.genre = data.find('.poi_card-display-cuisines').text();
                var link = $(elem).find("a").attr('href');
                //To catch the postal code i node, request the link of the guide michelin restaurant
                request("https://restaurant.michelin.fr/"+link, function(error, response, html){
                    $ = cheerio.load(html);
                    var postal = $('.postal-code').first().text().trim()
                    restau.postal=postal
                });
                
                json.push(restau)
            });
        }
        else{
            console.log("error")
        }

        i++;
        restaurants(i)// it is a call back function 
    });
}

restaurants(i);

module.exports =restaurants;