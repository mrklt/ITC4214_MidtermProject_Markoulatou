document.querySelector('#contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;

    alert(`Thank you for contacting us, ${name}!\n\nDetails:\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);

    document.querySelector('#contactForm').reset();
  });
  