"use strict";

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
  var reg = new RegExp("(^|&)uid=([^&]*)(&|$)");
  var urlParam = window.location.search.substr(1).match(reg);
  var uid = '';

  if (urlParam != null) {
    uid = unescape(urlParam[2]);
  }

  $('.js-submit').on('click', function () {
    $('.number-error').hide();
    $('.name-error').hide();
    $('.email-error').hide();

    var phone = $('#phone').val();
    var phoneRegex = /((?=(09))[0-9]{10})$/;
    var isValid = libphonenumber.isValidNumber(phone, 'TW');
    if (!isValid || !phoneRegex.test(phone)) {
      $('.number-error').show();
    }

    var name = $('#name').val();
    if (!$.trim(name).length) {
      $('.name-error').show();
    }

    var email = $('#email').val();
    var mailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!$.trim(name).length || !mailRegex.test(email)) {
      $('.email-error').show();
    }

    if ($('.number-error').is(':hidden') && $('.name-error').is(':hidden') && $('.email-error').is(':hidden')) {
      var database = firebase.database().ref('iap_list');
      var key = database.push({
        userID: uid,
        userName: name,
        userPhone: phone,
        userEmail: email,
        uploadTime: Date.now()
      }).key;

      setTimeout(function () {
        if (navigator.onLine) {
          // true|false
          alert('新年快樂');
        } else {
          alert('無網路');
        }
        $('.form__input').val('');
      }, 1000);
    }
  });
});