function openImage(src) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = src;
    modal.style.display = 'flex';
}

function closeImage() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

const buttons = document.querySelectorAll('button');
const contents = document.querySelectorAll('.content');

function activateContent(targetId) {
    contents.forEach(content => content.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(targetId).classList.add('active');
    document.querySelector(`button[data-target="${targetId}"]`).classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
    activateContent('content1');
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        activateContent(target);
    });
});

const items = document.querySelectorAll('.item');

items.forEach(item => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    function animate() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        item.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;

        requestAnimationFrame(animate);
    }

    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetX = ((x - centerX) / centerX) * 15;
        targetY = ((y - centerY) / centerY) * -15;
    });

    item.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    animate();
});