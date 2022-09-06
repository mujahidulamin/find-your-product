const loadAllProducts = async () => {
    const url = `https://fakestoreapi.com/products`
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const setAllMenu = async () => {
    // console.log(loadAllProducts());
    //loadAllProducts()
    // .then(res => console.log(data))
    const products = await loadAllProducts();
    const allMenu = document.getElementById('all-menu');
    const uniqueArray = [];
    for (const product of products) {
        // console.log(product.category);
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);
            const li = document.createElement('li');
            li.innerHTML = `
                    <a>${product.category}</a>
                 `
            allMenu.appendChild(li);

        }
    }
}
setAllMenu();


loadAllProducts();

const searchField = document.getElementById('search-field'); searchField.addEventListener('keypress', async (event) => {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden')
    if (event.key === 'Enter') {
        // console.log(searchField.value);
        searchValue = searchField.value;
        const allProducts = await loadAllProducts();

        spinner.classList.add('hidden')
        // console.log(allProducts);
        const foundProduct = allProducts.filter(product => product.category.includes(searchValue));
        
        const notFound = document.getElementById('not-found');
        notFound.innerHTML = '';
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ``;
        if (foundProduct.length === 0) {
            notFound.innerHTML = `<h2 class = "text-2xl text-orange-500 text-center">No Product Found</h2>`
            return;
        }
        foundProduct.forEach(product => {
            console.log(product);
            const { category, image, title, description } = product

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img class = "h-60 w-full" src="${image}" alt="Shoes"/></figure>
            <div class="card-body">
              <h2 class="card-title">${category}</h2>
              <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
              <div class="card-actions justify-end">
              <label onclick = "showModal('${description}', '${image}')" for="my-modal-3" class="btn btn-primary modal-button">open modal</label>
              </div>
            </div>
          </div>`
            productContainer.appendChild(div);
        });
    }
})

const showModal = (description, image) => {
    const modalBody = document.getElementById('modal-body');
    console.log(description, image);
    modalBody.innerHTML = `
    <p class="">${description}</p>
    <img src = "${image}">
    
    `
}