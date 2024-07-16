const productList = () => {
  return fetch('http://localhost:3001/products')
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const createProduct = (nombre, precio, imagen) => {
  return fetch('http://localhost:3001/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre,
      precio,
      imagen: { src: imagen, alt: 'imagen' },
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const deleteProduct = (id) => {
  return fetch(`http://localhost:3001/products/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};



export const servicesProducts = {
  productList,
  createProduct,
  deleteProduct,
};
