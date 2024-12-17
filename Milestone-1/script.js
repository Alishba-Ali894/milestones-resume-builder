document.addEventListener('DOMContentLoaded', function () {
    var toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var targetId = button.dataset.target;
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                if (targetElement.style.display === 'none') {
                    targetElement.style.display = 'block';
                    button.textContent = 'Hide';
                }
                else {
                    targetElement.style.display = 'none';
                    button.textContent = 'Show';
                }
            }
        });
    });
});
