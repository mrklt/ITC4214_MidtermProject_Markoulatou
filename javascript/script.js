document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector('.toggle');

    // Toggle dark mode when the button is clicked
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle("dark");
    });
});
