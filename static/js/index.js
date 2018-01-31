"use strict";

// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyAXPpL1q6gTZ7AbqcL6J6dq_QOUeLnzs1o",
//   authDomain: "iap-debate-campaign.firebaseapp.com",
//   databaseURL: "https://iap-debate-campaign.firebaseio.com",
//   projectId: "iap-debate-campaign",
//   storageBucket: "iap-debate-campaign.appspot.com",
//   messagingSenderId: "10210955520"
// };
// firebase.initializeApp(config);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAoeXddtx_FT9TW1LjoTct4-N3JuEpkU3A",
  authDomain: "whoscall-web-campaign.firebaseapp.com",
  databaseURL: "https://whoscall-web-campaign.firebaseio.com",
  projectId: "whoscall-web-campaign",
  storageBucket: "whoscall-web-campaign.appspot.com",
  messagingSenderId: "393521122412"
};
firebase.initializeApp(config);

$(function () {
  $('.selected-flag').text('TW +886');

  $('.js-submit').on('click', function () {
    var intlNumber = $("#phone").intlTelInput("getNumber");
    var isValid = $("#phone").intlTelInput("isValidNumber");
    if (!isValid) {
      $('.number-error').show();
    }

    var name = $('#name').val();
    if (!$.trim(name).length) {
      $('.name-error').show();
    }

    var email = $('#email').val();
    var mail_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!$.trim(name).length || !mail_regex.test(email)) {
      $('.email-error').show();
    }

    console.log(intlNumber);
    console.log(isValid);
    console.log(name);
    console.log(email);

    var database = firebase.database().ref('iap_list');
    var key = database.push({
      userName: name,
      userPhone: intlNumber,
      userEmail: email,
      uploadTime: Date.now()
    }).key;
    console.log('upload');
  });
});