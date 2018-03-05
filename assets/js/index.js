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

$(() => {
  const reg = new RegExp("(^|&)uid=([^&]*)(&|$)");
  var urlParam = window.location.search.substr(1).match(reg);
  let uid = '';

  if (urlParam != null) {
    uid = unescape(urlParam[2]);
  }

  $('.js-submit').on('click', ()=> {
    $('.number-error').hide();
    $('.name-error').hide();
    $('.email-error').hide();

    const phone = $('#phone').val();
    const phoneRegex = /((?=(09))[0-9]{10})$/;
    const isValid = libphonenumber.isValidNumber(phone, 'TW');
    if (!isValid || !phoneRegex.test(phone)) {
      $('.number-error').show();
    }

    const name = $('#name').val();
    if(!$.trim(name).length) {
      $('.name-error').show();
    }

    const email = $('#email').val();
    const mailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!$.trim(name).length || !mailRegex.test(email)) {
      $('.email-error').show();
    }

    if($('.number-error').is(':hidden') && $('.name-error').is(':hidden') && $('.email-error').is(':hidden')) {
      let database = firebase.database().ref('iap_list');
      let key = database.push({
        userID: uid,
        userName: name,
        userPhone: phone,
        userEmail: email,
        uploadTime: Date.now()
      }).key;

      setTimeout(() => {
        if (navigator.onLine) { // true|false
          alert('新年快樂');
        } else {
          alert('無網路');
        }
        $('.form__input').val('');
      }, 1000);
    }
  })
})
