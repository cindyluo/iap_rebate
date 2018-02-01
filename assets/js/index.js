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

  console.log(uid)
  $('.uid').text(`uid: ${uid}`);

  $('.js-submit').on('click', ()=> {
    $('.number-error').hide();
    $('.name-error').hide();
    $('.email-error').hide();

    const phone = $('#phone').val();
    const formatNumber = libphonenumber.format(phone, 'TW', 'International');
    const isValid = libphonenumber.isValidNumber(phone, 'TW');
    if (!isValid) {
      $('.number-error').show();
    }

    const name = $('#name').val();
    if(!$.trim(name).length) {
      $('.name-error').show();
    }

    const email = $('#email').val();
    const mail_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!$.trim(name).length || !mail_regex.test(email)) {
      $('.email-error').show();
    }

    if($('.number-error').is(':hidden') && $('.name-error').is(':hidden') && $('.email-error').is(':hidden')) {
      let database = firebase.database().ref('iap_list');
      let key = database.push({
        userID: uid,
        userName: name,
        userPhone: formatNumber,
        userEmail: email,
        uploadTime: Date.now()
      }).key;

      console.log('upload');

      setTimeout(() => {
        alert('新年快樂');
        location.reload();
      }, 1000);
    }
  })
})
