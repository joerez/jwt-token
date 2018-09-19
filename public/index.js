$( document ).ready(function() {

  $("#our-form").submit(function(e) {
    e.preventDefault();

    // Get some values from elements on the page:
    let $form = $( this ),
      email = $form.find( "input[name='email']" ).val(),
      first = $form.find( "input[name='firstname']" ).val(),
      last = $form.find( "input[name='lastname']" ).val(),
      password = $form.find( "input[name='password']" ).val(),


      url = $form.attr( "action" );


    // Send the data using post
    let posting = $.post( '/sign-up', { email: email, first: first, last: last, password: password } );

    Cookies.set('token', posting);
    // IF YOU'D LIKE TO REDIRECT NOW, ADD THIS:
    window.location.href = "/sign-up";

  });

});
