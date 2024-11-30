// Predefined categories and items with 50 items each
const categories = {
    Dairy: [
        "Milk", "Cheese", "Butter", "Yogurt", "Cream", "Ice Cream", "Cottage Cheese", "Butter Milk", "Cheese Slices", "Mozzarella", 
        "Parmesan", "Ricotta", "Feta", "Brie", "Cheddar", "Goat Cheese", "Blue Cheese", "Provolone", "Swiss Cheese", "Cream Cheese", 
        "Sour Cream", "Whipped Cream", "Evaporated Milk", "Condensed Milk", "Heavy Cream", "Skim Milk", "Almond Milk", "Soy Milk", "Oat Milk",
        "Coconut Milk", "Milk Powder", "Cottage Cheese (Paneer)", "Ghee", "Milkshake", "Flavored Yogurt", "Greek Yogurt", "Butter (Clarified)", 
        "Non-Dairy Creamer", "Dairy-Free Yogurt", "Cheese Spread", "Cheese Curds", "Ricotta Cheese", "Lactose-Free Milk", "Chocolate Milk", 
        "Flavored Milk", "Milk Pudding", "Cheese Sticks", "Dried Milk", "Vegan Cheese", "Frozen Yogurt", "Dairy Drink", "Cheese Dip"
    ],
    Vegetables: [
        "Carrot", "Potato", "Broccoli", "Cucumber", "Spinach", "Tomato", "Lettuce", "Onion", "Garlic", "Cauliflower", 
        "Green Beans", "Peas", "Bell Pepper", "Mushrooms", "Eggplant", "Zucchini", "Asparagus", "Cabbage", "Sweet Potato", "Kale", 
        "Chard", "Brussels Sprouts", "Beets", "Radish", "Squash", "Artichoke", "Leek", "Turnip", "Okra", "Chili Pepper", 
        "Sweet Corn", "Celery", "Chives", "Avocado", "Rhubarb", "Fennel", "Bok Choy", "Collard Greens", "Edamame", "Pumpkin", 
        "Arugula", "Watercress", "Endive", "Alfalfa Sprouts", "Mung Bean Sprouts", "Cress", "Coriander", "Parsley", "Dandelion Greens", 
        "Cilantro", "Taro", "Mache", "Fennel Bulb"
    ],
    Snacks: [
        "Chips", "Cookies", "Candy", "Pretzels", "Granola Bars", "Crackers", "Popcorn", "Nuts", "Trail Mix", "Rice Cakes", 
        "Chocolate Bars", "Gummy Bears", "Lollipops", "Chewing Gum", "Jelly Beans", "Fruit Snacks", "Granola", "Beef Jerky", "Cinnamon Rolls", 
        "Cheese Puffs", "Dried Fruit", "Rice Krispies Treats", "Fruit Bars", "Pudding Cups", "Cakes", "Brownies", "Mini Muffins", "Donuts", 
        "Pastries", "Croissants", "Bagels", "Scones", "Baklava", "Cinnamon Sugar Pretzels", "Danish Pastries", "Energy Bars", "Oatmeal Cookies", 
        "Chocolate-Covered Pretzels", "Doughnuts", "Cheese Sticks", "Chocolate-Covered Almonds", "Sausage Rolls", "Cheese Cubes", "Chocolates", 
        "Marshmallows", "Ice Cream Bars", "Fruit Chips", "Salty Snacks", "Sweet Potato Chips", "Rice Pudding", "Fried Onion Rings", "Fried Pickles"
    ]
};

// Elements
const searchInput = document.getElementById("item-search");
const suggestionsBox = document.getElementById("suggestions");
const addItemButton = document.getElementById("add-item-btn");
const budgetInput = document.getElementById("budget-input");
const remainingBudget = document.getElementById("remaining-budget");
const runningTotal = document.getElementById("running-total");
const tutorialOverlay = document.getElementById("tutorial-overlay");
const closeTutorialBtn = document.getElementById("close-tutorial-btn");

// Variables
let budget = 0;
let totalCost = 0;
let allItems = [
    ...categories.Dairy, 
    ...categories.Vegetables, 
    ...categories.Snacks
];

// Update budget display
function updateBudget() {
    const remaining = budget - totalCost;
    remainingBudget.textContent = remaining.toFixed(2);
    remainingBudget.className = remaining < 0 ? 'over-budget' : '';
}

// Add item to shopping list
function addItem(item, cost) {
    const category = categorizeItem(item) || "others";
    const categoryElement = document.getElementById(category) || createCategory(category);
    const list = categoryElement.querySelector("ul");

    const listItem = document.createElement("li");
    listItem.textContent = `${item} - $${cost.toFixed(2)}`;
    listItem.className = totalCost + cost > budget ? 'over-budget' : '';

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        totalCost -= cost;
        listItem.remove();
        updateBudget();
    });

    listItem.appendChild(deleteButton);
    list.appendChild(listItem);

    totalCost += cost;
    updateBudget();
}

// Categorize item
function categorizeItem(item) {
    for (const category in categories) {
        if (categories[category].includes(item)) return category.toLowerCase();
    }
    return "others";
}

// Create category element dynamically
function createCategory(category) {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    categoryDiv.id = category;

    const categoryHeading = document.createElement("h3");
    categoryHeading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryDiv.appendChild(categoryHeading);

    const categoryList = document.createElement("ul");
    categoryDiv.appendChild(categoryList);

    document.getElementById("categories").appendChild(categoryDiv);

    return categoryDiv;
}

// Display suggestions based on search input
searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    const filteredSuggestions = allItems.filter(item => item.toLowerCase().includes(query));
    
    if (filteredSuggestions.length > 0) {
        suggestionsBox.classList.remove("hidden");
        suggestionsBox.innerHTML = filteredSuggestions.map(item => `<div class="suggestion">${item}</div>`).join("");
    } else {
        suggestionsBox.classList.add("hidden");
    }

    // Add suggestion to search bar when clicked
    document.querySelectorAll(".suggestion").forEach(suggestion => {
        suggestion.addEventListener("click", () => {
            searchInput.value = suggestion.textContent;
            suggestionsBox.classList.add("hidden");
        });
    });
});

// Close tutorial overlay when "Got It!" is clicked
closeTutorialBtn.addEventListener("click", function () {
    tutorialOverlay.classList.add("hidden"); // This hides the tutorial overlay
});

// Add item to shopping list when "Add Item" is clicked
addItemButton.addEventListener("click", function () {
    const itemName = searchInput.value.trim();
    const itemCost = parseFloat(document.getElementById("item-cost").value.trim());

    if (itemName && itemCost && !isNaN(itemCost)) {
        addItem(itemName, itemCost);
        searchInput.value = '';
        document.getElementById("item-cost").value = '';
    }
});

// Update budget when user types into the budget input
budgetInput.addEventListener("input", function () {
    budget = parseFloat(budgetInput.value.trim()) || 0;
    updateBudget();
});
