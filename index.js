function toggleCart() {
    const cart = document.getElementById("cart");
    cart.classList.toggle("hidden");
}

const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((plants) => displayAllPlants(plants.plants));
}

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayCategories(json.categories));
};


const removeActive = () => {
    const ctgBtns = document.querySelectorAll(".category-btn");
    ctgBtns.forEach(btn => btn.classList.remove("active"))
    
}


const loadPlantByCategory = (name) => {
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickCategory = document.getElementById(`active-category-${name}`);
            clickCategory.classList.add("active");
            displayPlantsByCategory(data.plants, name)
        });
}

const displayAllPlants = (plants) => {
    const allPlantsContainer = document.getElementById("cards-container");
    allPlantsContainer.innerHTML = "";

    plants.forEach(plant => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white p-4 rounded-xl mt-4 md:mt-0 w-[350px]">
                        <img class="h-[185px] w-[350px] rounded-xl mx-auto" src="${plant.image}" alt="">
                        <h1 class="font-semibold mt-3">${plant.name}</h1>
                        <p class="text-[#1F2937] text-sm">${plant.description}</p>
                        <div class="flex justify-between my-2">
                            <div class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 rounded-full">
                                <h1>${plant.category}</h1>
                            </div>
                            <h1 class="font-semibold">${plant.price}</h1>
                        </div>
                        <button class="w-[100%] bg-[#15803D] text-white py-3 rounded-full mt-3">Add to Cart</button>
                    </div>
        `
        allPlantsContainer.append(card);

    })

}


const displayPlantsByCategory = (plants, categoryName) => {
    const allPlantsContainer = document.getElementById("cards-container");
    allPlantsContainer.innerHTML = "";
    
    for (let plant of plants){
        
        if (plant.category === categoryName) {  // এখানে condition check
            const div = document.createElement("div");
            div.classList.add("plant-card");

            div.innerHTML = `
                <div class="bg-white p-4 rounded-xl mt-4 md:mt-0 w-[350px]">
                        <img class="h-[185px] w-[350px] rounded-xl mx-auto" src="${plant.image}" alt="">
                        <h1 class="font-semibold mt-3">${plant.name}</h1>
                        <p class="text-[#1F2937] text-sm">${plant.description}</p>
                        <div class="flex justify-between my-2">
                            <div class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 rounded-full">
                                <h1>${plant.category}</h1>
                            </div>
                            <h1 class="font-semibold">${plant.price}</h1>
                        </div>
                        <button class="w-[100%] bg-[#15803D] text-white py-3 rounded-full mt-3">Add to Cart</button>
                    </div>
            `;

            allPlantsContainer.appendChild(div);

        
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


loadAllPlants();
loadCategories();

