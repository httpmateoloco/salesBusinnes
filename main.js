document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const searchInput = document.getElementById('searchInput');
  const productGrid = document.getElementById('productGrid');
  const cartButton = document.getElementById('cartButton');
  const cart = document.getElementById('cart');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutButton = document.getElementById('checkoutButton');
  const openQuestionnaireButton = document.getElementById('openQuestionnaire');
  const closeQuestionnaireButton = document.getElementById('closeQuestionnaire');
  const questionnaireModal = document.getElementById('questionnaireModal');
  const questionnaireForm = document.getElementById('questionnaireForm');

  gsap.registerPlugin(ScrollTrigger);

  // Tema
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
      themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      `;
    } else {
      themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
    }
  });

  // Búsqueda de productos
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const productCards = productGrid.querySelectorAll('.product-card');

    productCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p:nth-of-type(2)').textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = ''; // Mostrar la tarjeta
      } else {
        card.style.display = 'none'; // Ocultar la tarjeta
      }
    });
  });

  // Carrito de compras
  let cartProducts = [];

  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cartProducts.forEach(product => {
      const li = document.createElement('li');
      li.textContent = `${product.name} - $${product.price}`;
      cartItems.appendChild(li);
      total += product.price;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  productGrid.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const card = e.target.closest('.product-card');
      const productName = card.querySelector('h3').textContent;
      cartProducts.push({ name: productName, price: 99.99 }); // Precio de ejemplo
      updateCart();
    }
  });

  cartButton.addEventListener('click', () => {
    cart.classList.toggle('open');
  });

  checkoutButton.addEventListener('click', () => {
    alert('Gracias por tu compra!');
    cartProducts = [];
    updateCart();
    cart.classList.remove('open');
  });

  // Cuestionario
  openQuestionnaireButton.addEventListener('click', () => {
    questionnaireModal.classList.remove('hidden');
  });

  closeQuestionnaireButton.addEventListener('click', () => {
    questionnaireModal.classList.add('hidden');
  });

  questionnaireForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Gracias por enviar el cuestionario!');
    questionnaireModal.classList.add('hidden');
  });

  // Mapa
  mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-74.5, 40], // Coordenadas de Nueva York como ejemplo
    zoom: 9
  });

  // Agregar un marcador en el mapa
  new mapboxgl.Marker()
    .setLngLat([-74.5, 40])
    .addTo(map);

  // Animaciones
  gsap.to('#welcome', {opacity: 1, y: 0, duration: 1, ease: 'power3.out'});

  gsap.to('#products', {
    opacity: 1, 
    duration: 1, 
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#products',
      start: 'top 80%',
    }
  });

  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, 
      y: 50, 
      duration: 0.8, 
      delay: i * 0.2,
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
      }
    });
  });

  gsap.to('#news', {
    opacity: 1, 
    duration: 1, 
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#news',
      start: 'top 80%',
    }
  });

  gsap.to('#about', {
    opacity: 1, 
    duration: 1, 
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
    }
  });

  gsap.to('#contact', {
    opacity: 1, 
    duration: 1, 
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%',
    }
  });
});