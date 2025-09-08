function toggleCart() {
    const cartSection = document.querySelector(".cart-section"); 
    cartSection.classList.toggle("hidden");
}

const removeActive = () => {
    const ctgBtns = document.querySelectorAll(".category-btn");
    ctgBtns.forEach(btn => btn.classList.remove("active"))

}

const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((plants) => {
            removeActive();
            const allPlantsBtn = document.getElementById("active-category-allPlants");
            allPlantsBtn.classList.add("active");
            displayAllPlants(plants.plants)
        });
}

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => {

            displayCategories(json.categories)
        });
};





const loadPlantByCategory = (name) => {
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickCategory = document.getElementById(`active-category-${name}`);
            clickCategory.classList.add("active");
            displayPlantsByCategory(data.plants, name);
        });
}




const displayAllPlants = (plants) => {
    const allPlantsContainer = document.getElementById("cards-container");
    allPlantsContainer.innerHTML = "";

    plants.forEach(plant => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white p-4 rounded-xl mt-4 md:mt-0 md:w-[350px] h-full flex flex-col justify-between">
                        <img class="h-[185px] w-[350px] rounded-xl mx-auto object-cover" src="${plant.image}" alt="">
                        <h1 class="font-semibold mt-3">${plant.name}</h1>
                        <p class="text-[#1F2937] text-sm">${plant.description}</p>
                        <div class="flex justify-between my-2">
                            <div class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 rounded-full">
                                <h1>${plant.category}</h1>
                            </div>
                            <h1 class="font-semibold">${plant.price}</h1>
                        </div>
                        <button  class="add-to-cart w-[100%] bg-[#15803D] text-white py-3 rounded-full mt-3 hover:scale-105 hover:bg-green-900 
                        active:bg-green-900 active:scale-105 transition duration-200">Add to Cart</button>
                    </div>
        `
        allPlantsContainer.append(card);

        const addToCartBtn = card.querySelector("button");
        addToCartBtn.addEventListener("click", () => {
            addToCart(plant);
        });

    })

}


const displayPlantsByCategory = (plants, categoryName) => {
    const allPlantsContainer = document.getElementById("cards-container");
    allPlantsContainer.innerHTML = "";

    for (let plant of plants) {

        if (plant.category === categoryName) {
            const div = document.createElement("div");
            div.classList.add("plant-card");

            div.innerHTML = `
                <div class="bg-white p-4 rounded-xl mt-4 md:mt-0 md:w-[350px]
                flex flex-col justify-between">
                        <img class="h-[185px] w-[350px] rounded-xl mx-auto object-cover" src="${plant.image}" alt="">
                        <h1 class="font-semibold mt-3">${plant.name}</h1>
                        <p class="text-[#1F2937] text-sm">${plant.description}</p>
                        <div class="flex justify-between my-2">
                            <div class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 rounded-full">
                                <h1>${plant.category}</h1>
                            </div>
                            <h1 class="font-semibold">${plant.price}</h1>
                        </div>
                        <button 
                        id="add-to-cart" 
                        class="w-[100%] bg-[#15803D] text-white py-3 rounded-full mt-3 hover:scale-105 hover:bg-green-900
                        active:bg-green-900 active:scale-105 transition duration-200
                        ">Add to Cart</button>
                    </div>
            `;

            allPlantsContainer.appendChild(div);

            const addToCartBtn = div.querySelector("button");
            addToCartBtn.addEventListener("click", () => {
                addToCart(plant);
            });

        }
    }

}


const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    for (let tree of categories) {
        const li = document.createElement("li");
        li.innerHTML = `
    <h1 id="active-category-${tree.category_name}" onclick="loadPlantByCategory('${tree.category_name}')" class="hover:bg-[#15803D]  p-2 hover:text-white rounded-md font-medium outline-1 outline-gray-200 m-1 md:outline-0 category-btn">${tree.category_name}</h1>
    `

        categoriesContainer.append(li);
    }
};


const cartItems = [];


const addToCart = (plant) => {
    const existingItem = cartItems.find(item => item.id === plant.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: plant.id,
            name: plant.name,
            price: parseFloat(String(plant.price).replace("৳", "")),
            quantity: 1,
        });
    }

    renderCart();
};


const renderCart = () => {
    const cartContainer = document.getElementById("cart");
    const cartList = cartContainer.querySelector(".cart-items");
    cartList.innerHTML = "";

    let total = 0;

    cartItems.forEach(item => {
    
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="flex justify-between items-center bg-green-50 p-2 rounded-lg w-full mt-2">
                <div>
                    <h1 class="text-sm font-semibold">${item.name}</h1>
                    <p class="text-gray-500 mt-2">৳${item.price} × ${item.quantity}</p>
                </div>
                <span class="text-gray-500 cursor-pointer" onclick="removeFromCart('${item.name}')">✖</span>
            </div>
        `;
        cartList.append(div);
    });

    const totalContainer = cartContainer.querySelector(".cart-total");
    totalContainer.innerHTML = `
        <hr class="border-t-1 border-gray-200 my-2">
        <div class="flex justify-between font-semibold">
            <h1>Total:</h1>
            <h2>৳${total}</h2>
        </div>
    `;
};

const removeFromCart = (name) => {
    const index = cartItems.findIndex(item => item.name === name);
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    renderCart();
};



loadAllPlants();
loadCategories();

