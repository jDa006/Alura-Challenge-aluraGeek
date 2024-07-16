import { servicesProducts } from "../services/product-services.js";

const cardSection = document.getElementById('card-section');
const form = document.getElementById('form');
const name = document.querySelector("#name");
const precio = document.querySelector("#precio");
const imagen = document.querySelector("#imagen");
const botonEnviar = document.querySelector("#botonEnviar");
let cardDelete;

function createCard(id, nombre, precio, imagen, productsContainer) {
  const card = document.createElement('li');
  card.classList.add('card');

  card.innerHTML = `
  <img
    class="card__image"
    src="${imagen.src}"
    alt="${imagen.alt}"
  />
  <h3 class="card__title">${nombre}</h3>
  <div class="card__row">
    <p class="card__precio">${precio}</p>
    <button
      class="card__delete"
      data-id="${id}"
    >
      <img
        class="card__vector"
        src="./img/Vector.png"
        alt="vector"
      />
    </button>
  </div>
   `;

   productsContainer.appendChild(card);
   return card;
}

const render = async () => {
  try {
    const listProducts = await servicesProducts.productList();

    let productsContainer;
    listProducts.forEach((product, index) => {
      if (index === 0 || index % 3 === 0) {
        productsContainer = document.createElement('ul');
        productsContainer.classList.add('ul__cards');
        cardSection.appendChild(productsContainer);
      }

      productsContainer.appendChild(
          createCard(product.id, product.nombre, product.precio, product.imagen, productsContainer)
      );
    });

    cardDelete = productsContainer.querySelectorAll(".card__delete");
    cardDelete.forEach((el) => el.addEventListener('click', eliminarProducto));

  } catch (error) {
    console.log("error");
  }
};

async function enviarFormulario(e) {
  e.preventDefault();

  if (form.checkValidity()) {
    return await servicesProducts.createProduct(name.value, precio.value, imagen.value);
  }

  return false;
}


function validarInput(e) {
  const element = e.target;
  const container = element.parentElement;

  if (!element.validity.valid) {
    container.classList.add('form__controls-container--error');
  } else {
    container.classList.remove('form__controls-container--error');
  }

  if (form.checkValidity()) {
    botonEnviar.removeAttribute('disabled');
  } else {
    botonEnviar.setAttribute('disabled', true);
  }
}

function eliminarProducto(e) {
  const element = e.currentTarget;
  const dataId = element.dataset.id;
  servicesProducts.deleteProduct(dataId);

}

name.addEventListener('focusout', validarInput);
precio.addEventListener('focusout', validarInput);
imagen.addEventListener('focusout', validarInput);

form.addEventListener('submit', enviarFormulario);

render();
