
        
        
        // Toggle dark mode
        const darkModeToggle = document.getElementById("dark-mode-toggle");
        const body = document.body;

        darkModeToggle.addEventListener("click", function() {
            // Toggle between dark and light modes
            body.classList.toggle("dark-mode");
            body.classList.toggle("light-mode");

            // Update button text
            if (body.classList.contains("dark-mode")) {
                darkModeToggle.textContent = "Light Mode";
            } else {
                darkModeToggle.textContent = "Dark Mode";
            }
        });
        let lists = [];
        let totalCost = 0;
        let recommendationsEnabled = true;

        const predefinedItems = [
            { name: "Milk", category: "Dairy", cost: 5 },
            { name: "Cheese", category: "Dairy", cost: 10 },
            { name: "Carrot", category: "Vegetables", cost: 3 },
            { name: "Potato", category: "Vegetables", cost: 2 },
            { name: "Chips", category: "Snacks", cost: 7 },
            { name: "Cookies", category: "Snacks", cost: 6 }
        ];

        // Complementary items
        const complementaryItems = {
            "Milk": ["Cereal", "Cookies"],
            "Cheese": ["Crackers", "Wine"],
            "Carrot": ["Potato", "Onion"],
            "Potato": ["Carrot", "Chips"],
            "Chips": ["Salsa", "Guacamole"],
            "Cookies": ["Milk", "Coffee"]
        };

        document.getElementById("createListButton").addEventListener("click", function () {
            const listName = document.getElementById("listName").value;
            if (listName) {
                lists.push({ name: listName, items: [] });
                updateListSelector();
                document.getElementById("listName").value = "";
                updateListContainer();
            } else {
                alert("Please enter a valid list name.");
            }
        });

        function updateListSelector() {
            const listSelector = document.getElementById("listSelector");
            listSelector.innerHTML = '<option value="">Select a List</option>';
            lists.forEach((list, index) => {
                const option = document.createElement("option");
                option.value = index;
                option.textContent = list.name;
                listSelector.appendChild(option);
            });
        }

        document.getElementById("searchItemInput").addEventListener("input", function () {
            const query = this.value.toLowerCase();
            const suggestions = predefinedItems.filter(item => item.name.toLowerCase().includes(query));
            const suggestionsContainer = document.getElementById("suggestions");
            suggestionsContainer.innerHTML = "";

            suggestions.forEach(item => {
                const suggestion = document.createElement("div");
                suggestion.textContent = `${item.name} (${item.category}) - $${item.cost}`;
                suggestion.style.cursor = "pointer";
                suggestion.onclick = () => {
                    document.getElementById("searchItemInput").value = item.name;
                    document.getElementById("itemCategory").textContent = `Category: ${item.category}`;
                    suggestionsContainer.innerHTML = "";

                    // Show recommendations
                    if (recommendationsEnabled) {
                        showRecommendations(item);
                    }
                };
                suggestionsContainer.appendChild(suggestion);
            });
        });

        document.getElementById("addItemButton").addEventListener("click", function () {
            const selectedListIndex = document.getElementById("listSelector").value;
            const itemName = document.getElementById("searchItemInput").value;
            const budget = parseFloat(document.getElementById("budgetInput").value);

            if (!selectedListIndex || !itemName) {
                alert("Please select a list and an item.");
                return;
            }

            const item = predefinedItems.find(i => i.name === itemName);
            if (!item) {
                alert("Item not found.");
                return;
            }

            // Add item to the selected list
            lists[selectedListIndex].items.push(item);
            totalCost += item.cost;

            // Calculate remaining budget
            let remainingBudget = budget - totalCost;

            if (remainingBudget < 0) {
                alert("Budget exceeded!");
                remainingBudget = 0;
            }

            // Update total and remaining budget
            document.getElementById("totalCost").textContent = totalCost;
            document.getElementById("remainingBudget").textContent = remainingBudget;

            // Update the list container to reflect changes
            updateListContainer();

            // Update the color of remaining budget
            if (remainingBudget === 0 && budget < totalCost) {
                document.getElementById("remainingBudget").style.color = "red";
            } else {
                document.getElementById("remainingBudget").style.color = "green";
            }

            // Clear the search bar and suggestions
            document.getElementById("searchItemInput").value = "";  // Clear search input
            document.getElementById("suggestions").innerHTML = "";  // Clear suggestions
        });

        function updateListContainer() {
            const listContainer = document.getElementById("listContainer");
            listContainer.innerHTML = "";
            lists.forEach((list, index) => {
                const listItem = document.createElement("li");
                
                // Create the list name and item count display
                const listNameWithCount = document.createElement("span");
                listNameWithCount.textContent = `${list.name} (${list.items.length} items)`;
                listItem.appendChild(listNameWithCount);

                const swipeButton = document.createElement("button");
                swipeButton.textContent = "Show Items";
                swipeButton.classList.add("swipe-button");
                listItem.appendChild(swipeButton);

                const itemsContainer = document.createElement("div");
                itemsContainer.style.display = "none";
                itemsContainer.classList.add("item-list");

                list.items.forEach(item => {
                    const itemDiv = document.createElement("div");
                    itemDiv.textContent = `${item.name} - $${item.cost}`;
                    itemsContainer.appendChild(itemDiv);
                });

                listItem.appendChild(itemsContainer);

                swipeButton.addEventListener("click", function () {
                    if (itemsContainer.style.display === "none") {
                        itemsContainer.style.display = "block";
                        swipeButton.textContent = "Hide Items";
                    } else {
                        itemsContainer.style.display = "none";
                        swipeButton.textContent = "Show Items";
                    }
                });

                listContainer.appendChild(listItem);
            });
        }

        
        // Show personalized recommendations
        function showRecommendations(item) {
            if (complementaryItems[item.name]) {
                const recommendations = complementaryItems[item.name];
                const recommendationsContainer = document.getElementById("recommendations-section");
                const recommendationList = document.getElementById("recommendation-list");

                recommendationList.innerHTML = "";  // Clear previous recommendations
                recommendations.forEach((recommendation) => {
                    const li = document.createElement("li");
                    li.textContent = recommendation;
                    recommendationList.appendChild(li);
                });

                recommendationsContainer.style.display = "block";  // Show recommendations
            }
        }

        // Toggle recommendation on/off with swipe button
        document.getElementById("recommendations-toggle").addEventListener("change", (e) => {
            recommendationsEnabled = e.target.checked;
            const recommendationsContainer = document.getElementById("recommendations-section");
            if (!recommendationsEnabled) {
                recommendationsContainer.style.display = "none"; // Hide recommendations if off
            }
        });
    function updateListContainer() {
        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        lists.forEach((list, index) => {
            const listItem = document.createElement("li");

            // Create the list name and item count display
            const listNameWithCount = document.createElement("span");
            listNameWithCount.textContent = `${list.name} (${list.items.length} items)`;
            listItem.appendChild(listNameWithCount);

            const swipeButton = document.createElement("button");
            swipeButton.textContent = "Show Items";
            swipeButton.classList.add("swipe-button");
            listItem.appendChild(swipeButton);

            // Add the Share button next to the Show Items button
            const shareButton = document.createElement("button");
            shareButton.textContent = "Share";
            shareButton.classList.add("share-button");
            listItem.appendChild(shareButton);

            const itemsContainer = document.createElement("div");
            itemsContainer.style.display = "none";
            itemsContainer.classList.add("item-list");

            list.items.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.textContent = `${item.name} - $${item.cost}`;
                itemsContainer.appendChild(itemDiv);
            });

            listItem.appendChild(itemsContainer);

            swipeButton.addEventListener("click", function () {
                if (itemsContainer.style.display === "none") {
                    itemsContainer.style.display = "block";
                    swipeButton.textContent = "Hide Items";
                } else {
                    itemsContainer.style.display = "none";
                    swipeButton.textContent = "Show Items";
                }
            });

            // Share button functionality
            shareButton.addEventListener("click", function () {
                const encodedList = encodeURIComponent(JSON.stringify(list.items));
                const url = window.location.href.split('?')[0] + "?list=" + encodedList;
                alert("Share this link: " + url);
            });

            listContainer.appendChild(listItem);
        });
    }
    const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
            .bindPopup('Shopping Location')
            .openPopup();

            const registerButton = document.getElementById("register");
        const modal = document.getElementById("registrationModal");
        const closeModal = document.getElementById("closeModal");
        const form = document.getElementById("registrationForm");

        // Open modal
        registerButton.addEventListener("click", () => {
            modal.style.display = "flex";
        });

        // Close modal
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Form submission
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent page reload
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log("Form Data Submitted:", data);

            alert("Registration successful!");
            modal.style.display = "none";
            form.reset(); // Reset the form fields
        });

        // Close modal on outside click
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
