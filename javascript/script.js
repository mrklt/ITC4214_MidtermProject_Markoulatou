$(document).ready(function() {
    const toggleButton = $('.toggle');

    toggleButton.on('click', function() {
        $('body').toggleClass('dark');
    });
});
