"use strict";

var config = {
  apiKey: "AIzaSyAoeXddtx_FT9TW1LjoTct4-N3JuEpkU3A",
  authDomain: "whoscall-web-campaign.firebaseapp.com",
  databaseURL: "https://whoscall-web-campaign.firebaseio.com",
  projectId: "whoscall-web-campaign",
  storageBucket: "whoscall-web-campaign.appspot.com",
  messagingSenderId: "393521122412"
};
firebase.initializeApp(config);
var ref = firebase.database().ref('/iap_list/');
var dataContainer = document.querySelector('.data-container');
var count = 1;
var isLogin = false;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.querySelector('.signin').style.display = "none";
    document.querySelector('.signout').style.display = "block";
  } else {
    document.querySelector('.signin').style.display = "block";
    document.querySelector('.signout').style.display = "none";
  }
});

document.querySelector('.signin').addEventListener('click', function (e) {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var token = result.credential.accessToken;
    var user = result.user;
    location.reload();
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage);
  });
});

document.querySelector('.signout').addEventListener('click', function (e) {
  firebase.auth().signOut().then(function () {
    location.reload();
  }, function (error) {
    console.log(error.code);
  });
});

ref.once("value", function (snapshot) {
  var datas = snapshot.val();
  console.log('!!!!!');
  console.log(datas);
  console.log('!!!!!');
  for (var key in datas) {
    var urls = '';
    for (var k in datas[key].images) {
      urls += datas[key].images[k] + "<br>";
    }
    var data = "<tr>\n\t  <td class=\"fixed\">" + count++ + "</td>\n  \t  <td>" + datas[key].userID + "</td>\n      <td>" + datas[key].userName + "</td>\n      <td>" + datas[key].userPhone + "</td>\n      <td>" + datas[key].userEmail + "</td>\n      <td>" + datas[key].uploadTime + "</td></tr>";
    dataContainer.innerHTML += data;
  }
}, function (error) {
  alert('您沒有權限，請登入或聯絡ava.cheng@gogolook.com');
  console.log("Error: " + error.code);
});