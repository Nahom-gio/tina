document.addEventListener('DOMContentLoaded', () => {
    // Set Valentine's Day date
    const valentinesDay = new Date('2025-02-14T20:00:00');

    function updateTimer() {
        const now = new Date();
        const diff = valentinesDay - now;

        if (diff <= 0) {
            document.getElementById('timer').innerHTML = "Happy Valentine's Day! ❤️";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('timer').innerHTML = 
            `${days} days : ${hours} hours : ${minutes} minutes : ${seconds} seconds`;
    }

    // Update timer every second
    updateTimer();
    setInterval(updateTimer, 1000);

    // Create falling hearts animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = ['❤️', '💖', '💕', '💝'][Math.floor(Math.random() * 4)];
        heart.className = 'falling-heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = Math.random() * 15 + 10 + 'px';
        
        document.querySelector('.falling-hearts').appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Create hearts periodically
    setInterval(createHeart, 300);

    // Add hover effects to memory boxes
    const memoryBoxes = document.querySelectorAll('.memory-box');
    memoryBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'translateY(-10px) scale(1.02)';
            box.style.transition = 'all 0.3s ease';
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add photo upload functionality
    const addPhotoButtons = document.querySelectorAll('.add-photo');
    addPhotoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.style.width = '100%';
                        img.style.height = 'auto';
                        img.style.borderRadius = '10px';
                        img.style.marginTop = '1rem';
                        
                        const container = button.closest('.memory-content');
                        container.appendChild(img);
                        button.style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
    });

    // Add CSS styles for falling hearts
    const style = document.createElement('style');
    style.textContent = `
        .falling-heart {
            position: fixed;
            user-select: none;
            pointer-events: none;
            animation: fall linear forwards;
        }

        @keyframes fall {
            0% {
                transform: translateY(-10vh) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Add scroll reveal animation
    window.addEventListener('scroll', () => {
        const elements = document.querySelectorAll('.animate__animated');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.8;
            
            if (isVisible) {
                element.style.visibility = 'visible';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
});
