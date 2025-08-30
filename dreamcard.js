document.addEventListener('DOMContentLoaded', () => {
    const dreamData = JSON.parse(localStorage.getItem('dreamData'));
    if (!dreamData) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('cardDreamTitle').textContent = dreamData.title;
    document.getElementById('cardDreamDescription').textContent = dreamData.description;
    document.getElementById('dreamDate').textContent = dreamData.date;

    const elementsContainer = document.querySelector('.dream-elements');
    dreamData.elements.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.className = 'dream-element';
        elementDiv.textContent = element.charAt(0).toUpperCase() + element.slice(1);
        elementsContainer.appendChild(elementDiv);
    });
});
