// file: script.js
// Initialize Firebase
var firebaseConfig  = {
//  apiKey: "AIzaSyCfolxrOcBrgxVXKiBmdRbwakCNsw-kHbQ",
//  authDomain: "tempone-7869c.firebaseapp.com",
//  databaseURL: "https://tempone-7869c.firebaseio.com",

//  projectId: "tempone-7869c",
 // storageBucket: "tempone-7869c.appspot.com",
//  messagingSenderId: "557485542616"
  
  apiKey: "AIzaSyACTDBsP6CFgIP3KZF86w_0U_-zqeGttF8",
//    authDomain: "trim-mile-312315.firebaseapp.com",
    databaseURL: "https://trim-mile-312315-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trim-mile-312315",
//    storageBucket: "trim-mile-312315.appspot.com",
    messagingSenderId: "1095292619531",
    appId: "1:1095292619531:web:f4becbdbc228ce1189b00e",
    measurementId: "G-PGJ999T9ZS"
};
firebase.initializeApp(firebaseConfig );

//create firebase database reference
var dbRef = firebase.database();
var contactsRef = dbRef.ref('suhu');

//load older conatcts as well as any newly added one...
contactsRef.on("child_added", function(snap) {
  console.log("added", snap.key, snap.val());
  $('#contacts').append(contactHtmlFromObject(snap.val(),snap.key));
  console.log("added", val());
  
});
//contactsRef.on("child_removed", alert("data dihapus"));
//contactsRef.on("child_changed", alert("data diupdate"));
//save contact
$('.addValue').on("click", function( event ) {  
    event.preventDefault();
    if( $('#name').val() != '' || $('#email').val() != '' ){
      contactsRef.push({
        name: $('#name').val().replace(/<[^>]*>/ig, ""),
        email: $('#email').val().replace(/<[^>]*>/ig, ""),
        location: {
          city: $('#city').val().replace(/<[^>]*>/ig, ""),
          state: $('#state').val().replace(/<[^>]*>/ig, ""),
          zip: $('#zip').val().replace(/<[^>]*>/ig, "")
        }
      })
      contactForm.reset();
    } else {
      alert('Please fill atlease name or email!');
    }
  });
  
//$('#hapus').addEvenListener('click',hapus);

  //Hapus contact
function hapus(a) {
    //var keydata = e.target.getAttibute("id");
//    console.log(e);
    //console.log( keydata );
    dbRef.ref('suhu/' + a).set(null);
//    alert(a);
}
//prepare conatct object's HTML
function contactHtmlFromObject(contact,keydata){
//  console.log( contact );
//alert(keydata);
  var html = '';
  html += '<li class="list-group-item contact">';
    html += '<div>';
      html += '<p id="'+keydata+'" class="lead">'+contact.name+'</p>';
      html += '<p id="'+keydata+'" class="email">'+contact.email+'</p>';
      html += '<p><small title="'+contact.location.zip+'">'+contact.location.city+', '+contact.location.state+'</small></p>';
    html += '</div>';
  html += '<h1 onclick=hapus("'+keydata+'") id=hapus class='+ keydata +' >hapus</h1></li>';
  return html;
}
