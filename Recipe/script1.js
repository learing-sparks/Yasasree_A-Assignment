let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
function displayRecipes() {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = ''; 
    recipes.forEach((recipe, index) => {
        const li = document.createElement('li');
        li.classList.add('recipeItem');
        li.innerHTML = `
            <div class="recipeContent">
                <h3>${recipe.title}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            </div>
            <div class="recipeActions">
                <button onclick="editRecipe(${index})">Edit</button>
                <button onclick="deleteRecipe(${index})">Delete</button>
            </div>
        `;
        
        recipeList.appendChild(li);
    });
}

function saveRecipe(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    if (title && ingredients && instructions) {
        const recipe = {
            title,
            ingredients,
            instructions
        };

        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        document.getElementById('recipeForm').reset();
        displayRecipes();
    }
}

function editRecipe(index) {
    const recipe = recipes[index];
    document.getElementById('title').value = recipe.title;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('instructions').value = recipe.instructions;

    deleteRecipe(index);
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}
document.getElementById('recipeForm').addEventListener('submit', saveRecipe);
window.onload = displayRecipes;
