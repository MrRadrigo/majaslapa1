
// Admin credentials
const adminUser = {
  username: 'admin',
  password: 'admin123',
  isAdmin: true
};

function validateForm(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const messageDiv = document.getElementById('message');

  if (password !== confirmPassword) {
    messageDiv.style.display = 'block';
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Paroles nesakrīt!';
    return false;
  }

  // Check if admin
  if (username === adminUser.username && password === adminUser.password) {
    messageDiv.style.display = 'block';
    messageDiv.style.color = '#00ffea';
    messageDiv.textContent = 'Administratora pieslēgšanās veiksmīga!';
    return false;
  }

  // Regular user registration
  messageDiv.style.display = 'block';
  messageDiv.style.color = '#00ffea';
  messageDiv.textContent = 'Tu esi veiksmīgi piereģistrējies!';
  return false;
}

// Image zoom functionality
function setupGalleryZoom() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.close-modal');

  // Add click handlers to all gallery images
  document.querySelectorAll('.gallery-image img').forEach(img => {
    img.onclick = function() {
      modal.classList.add('active');
      modalImg.src = this.src;
    }
  });

  // Close modal when clicking the close button or outside the image
  closeBtn.onclick = function() {
    modal.classList.remove('active');
  }

  modal.onclick = function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupGalleryZoom();
  // Smooth scroll for navigation - only for section links
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Animate cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
  });
});
