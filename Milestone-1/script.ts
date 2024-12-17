document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = (button as HTMLElement).dataset.target;
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                if (targetElement.style.display === 'none') {
                    targetElement.style.display = 'block';
                    (button as HTMLElement).textContent = 'Hide';
                } else {
                    targetElement.style.display = 'none';
                    (button as HTMLElement).textContent = 'Show';
                }
            }
        });
    });
});