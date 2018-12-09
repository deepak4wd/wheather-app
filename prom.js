console.log("inside wheather app");
const request = require("request");
const yargs = require("yargs");

var lat ="tp ";
var lang ="yz ";

const argv = yargs.options(
    {
        a: {
    demand: true,
    alis: 'address',
    describe: "whats is there to be described",
    string: true
        }
})
.help()
.argv;

console.log(argv.a);

var geocode = (address) => {
return new Promise ((resolve , reject) => {

    var encodedstr = encodeURIComponent(address);
    request({ 
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=0blAJGlPk3v5GG8hwBLGkpltN2GFe2m3&location=${encodedstr}`,
        json: true
     } ,
        (error, response, body) => {
            if (error) { 
                reject("not able to connect mapquest");
            }  else { 
               resolve(body);
            };             
        });
})
};

geocode(argv.a).then((body) => {
    console.log(body.results[0].locations[0].latLng);
            lat = body.results[0].locations[0].latLng.lat;
            lang = body.results[0].locations[0].latLng.lng;
            console.log(`latitue is ${lat}`);
            console.log(`longitutde is ${lang}`);
            getwheather ();
}, (message) => {
    console.log(message);
});

function getwheather ()  {
    request ({
        url: `https://api.darksky.net/forecast/951b9d536535cadf51db0837b3b09c45/${lat},${lang}`,
        json: true
    },
    (error, respose, body) => {
                if (error) { 
            console.log("not able to connect to dry sky api");
        }  else { 
            console.log(body.daily.summary);
        };
    }   
    
    );
}




    



