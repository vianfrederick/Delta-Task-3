const express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

var id_1;
var id_2;
var related_1 =[];
var path =1 ;
var got = true;
var datas =[];
var count = 0;
var datasBig = [];

// https.get('https://api.spotify.com/v1/artists?ids=0oSGxfWSnnOXhD2fKuz2Gy%2C3dBVyJ7JuOMt4GE9607Qin', (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);
//
//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
//
// }).on('error', (e) => {
//   console.error(e);
// });






// var client_id = '62f821e8ba4f49b09f935dee3bd8e5d4';
// var client_secret = 'a543fe05c7a643a7b07e9ffb593d0458';
// app.get("/",function(req,res){
//   const token = async () =>{
//     const result = await fetch("https://accounts.spotify.com/api/token",{
//       method : "POST",
//       headers : {
//         'content-type' : 'application/x-www-form-urlencoded',
//         'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
//       },
//       body : 'grant_type-client_credentials'
//     });
//
//     const data = await result.json();
//     console.log(data.categories.items);
//   }
// });
//


  var spotifyApi = new SpotifyWebApi({
     client_id : '62f821e8ba4f49b09f935dee3bd8e5d4', // Your client id
     client_secret : 'a543fe05c7a643a7b07e9ffb593d0458', // Your secret
     redirect_uri : 'http://localhost:8888/callback/'
});

spotifyApi.setAccessToken('BQCTPSGtNDx1Wm99iyCjOZ-OGmhqgF4KxxkP_N34aKRDuHWK0Wdji6FV_ETaO38xEHUFQaIhBbjPUQQ-lRQ6KWler4XjFITatvFt3Z8idSEDA51DfyXH4H3Ip8E3CoUK_ZzgwsgGJO3bQp9cwtm3dR-4FuAMJWak8arMkkB66WyiZQL7KA');
spotifyApi.setRefreshToken('AQBke_iNs6XMaSUsQqZls393j9uyUv-fEPi1_xilVNgYHUtu9XtckGQhUraC9qRC3bLpQciY9Xo275QemRTewQDvIrQ97cVzcwha22a7CCh0FOeJmjr_0Krp76Npr2RtniE');
var scopes = scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private'],
  redirectUri = 'http://localhost:8888/callback/',
  clientId = '62f821e8ba4f49b09f935dee3bd8e5d4',
  state = 'some-state-of-my-choice';


var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);


console.log(authorizeURL);







  app.get("/",function(req,res){

  res.sendFile(__dirname +"/index.html");
    });

app.post("/path",function(req,res){

  function check(related){
    console.log("entered function");
    spotifyApi.getArtistRelatedArtists(related)
      .then(function(data) {
        console.log("Second successful");
        var related1 =[];
         related1 = data.body.artists;
          related1.forEach(function(dat){
            datas.push(dat.id);
          });
          console.log(datas);
          }
        , function(err) {
        console.log(err);
      } ) ;
      return datas;
  }

  var artist_1 = req.body.artist_1;
  var artist_2 = req.body.artist_2;

  spotifyApi.searchArtists(artist_1)
    .then(function(data) {
       id_1 = data.body.artists.items[0].id;
       console.log(typeof(id_1));
    }, function(err) {
      console.error(err);
    });

    spotifyApi.searchArtists(artist_2)
      .then(function(data) {
         id_2 = data.body.artists.items[0].id;
      }, function(err) {
        console.error(err);
      });

    spotifyApi.getArtistRelatedArtists(id_1)
      .then(function(data) {
console.log(data.body.artists);
        console.log("successful");
         related_1 = data.body.artists;


         for(var i=0;i<related_1.length;i++){
           if(related_1[i].id == id_2){
             console.log("found");
             path = 1;
             res.render("send",{path : path});
             count = 1;
             related_1 = [];
             break;
           }
         }
         while(count!=1){

         if(count!=1){
           for(var i =0;i<related_1.length;i++){

             var datas2 = check(related_1[i].id);
             datas = [];
             for(var j = 0; j < 20; j++){
               if(datas2[j] == id_2){
                 console.log("found");
                 path = path + 1;
                 res.render("send",{path : path});
                 count = 1;
                 related_1 = [];
                 break;
               }
               else{
                 datasBig.push(datas2[j]);
               }
             }
             if(count == 1){
               break;
             }
           }
           related_1 = datasBig;
           datasBig = [];
         path = path + 1;
         }
         }

      }, function(err) {
        console.log(err);
      });
      console.log(path);





});


app.listen("8888",function(){
  console.log("Server started at port 3000");
});
