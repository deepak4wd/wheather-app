console.log("inside wheather app");
const axios = require("axios");
const yargs = require("yargs");

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

var encodedstr = encodeURIComponent(argv.a);

var geocode = `http://www.mapquestapi.com/geocoding/v1/address?key=0blAJGlPk3v5GG8hwBLGkpltN2GFe2m3&location=${encodedstr}`;

axios.get(geocode).then((response)=> {
    console.log("inside then");
    console.log(response);

}).catch ((error)=>{
    console.log("inside catch");
    console.log(error);
});