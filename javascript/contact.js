$('#contactForm').on('submit', function(event) {
  event.preventDefault(); 

  const name = $('#name').val();
  const email = $('#email').val();
  const subject = $('#subject').val();
  const message = $('#message').val();

  alert(`Thank you for contacting us, ${name}!\n\nDetails:\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);

  $('#contactForm')[0].reset();
});
