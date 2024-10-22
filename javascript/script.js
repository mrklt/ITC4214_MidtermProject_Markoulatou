document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector('.toggle');

    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle("dark");
    });
});
