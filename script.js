import { RestaurantsManager } from './Manager.js';

let catMeat, catFish, catDessert, menuTasting, menuExecutive, menuKids, allGluten, allDairy,
    allEggs, allNuts, restNuestro, restEntre, restAgua, dishLasagna, dishSteak, dishTurkey, dishCurry, dishSushi, dishTuna, dishSardine, dishCod, dishCake, dishBrownie, dishJelly, dishMousse, initialStatus;

let divCentral = document.getElementById("central");

window.addEventListener("load", () => {

    createInitialObjects();
    showCategories();
    showRandomDishes();

    initialStatus = document.getElementById("central").cloneNode(true);

    document.getElementById("homePageLink").addEventListener("click", () => {
        showHomePage();
    });

    document.getElementById("dropdownCategories").addEventListener("click", () => {
        showDropdownCategories();
    });

    document.getElementById("navAllergens").addEventListener("click", () => {
        showAllergens();
    });

    document.getElementById("navMenus").addEventListener("click", () => {
        showMenus();
    });

    document.getElementById("dropdownRestaurantes").addEventListener("click", () => {
        showDropdownRestaurants();
    });

    document.getElementById("navCreateDish").addEventListener("click", () => {
        showFormCreateDish();
    });

    document.getElementById("navDeleteDish").addEventListener("click", () => {
        showFormDeleteDish();
    });

    document.getElementById("navAssignMenu").addEventListener("click", () => {
        showFormAssignMenu();
    });

    document.getElementById("navCreateCategory").addEventListener("click", () => {
        showFormCreateCategory();
    });

    document.getElementById("navDeleteCategory").addEventListener("click", () => {
        showFormDeleteCategory();
    });

    document.getElementById("navCreateRestaurant").addEventListener("click", () => {
        showFormCreateRestaurant();
    });

    document.getElementById("navModifyCategory").addEventListener("click", () => {
        showModifyCategory();
    });

})

function createInitialObjects() {
    try {
        const dishLasagna = RestaurantsManager.getInstance().createDish("Lasaña de carne");
        const dishSteak = RestaurantsManager.getInstance().createDish("Filete de ternera");
        const dishTurkey = RestaurantsManager.getInstance().createDish("Pavo katsu");
        const dishCurry = RestaurantsManager.getInstance().createDish("Pollo al curry");
        const dishSushi = RestaurantsManager.getInstance().createDish("Sushi de salmón");
        const dishTuna = RestaurantsManager.getInstance().createDish("Atún a la plancha");
        const dishSardine = RestaurantsManager.getInstance().createDish("Sardinas picantes");
        const dishCod = RestaurantsManager.getInstance().createDish("Bacalao con verduras");
        const dishCake = RestaurantsManager.getInstance().createDish("Tarta de queso");
        const dishBrownie = RestaurantsManager.getInstance().createDish("Brownie de chocolate");
        const dishJelly = RestaurantsManager.getInstance().createDish("Gelatina de fresa");
        const dishMousse = RestaurantsManager.getInstance().createDish("Mousse de caramelo");

        dishLasagna.ingredients = "Ternera";
        dishSteak.ingredients = "Ternera";
        dishTurkey.ingredients = "Pavo";
        dishCurry.ingredients = "Pollo";
        dishSushi.ingredients = "Salmón";
        dishTuna.ingredients = "Atún";
        dishSardine.ingredients = "Sardinas";
        dishCod.ingredients = "Bacalao";
        dishBrownie.ingredients = "Chocolate";
        dishCake.ingredients = "Queso";
        dishJelly.ingredients = "Fresas";
        dishMousse.ingredients = "Caramelo";

        RestaurantsManager.getInstance().addDish(dishLasagna, dishSteak, dishTurkey, dishCurry, dishSushi, dishTuna, dishSardine, dishCod, dishCake, dishBrownie, dishJelly, dishMousse);

        catMeat = RestaurantsManager.getInstance().createCategory("Carne");
        catFish = RestaurantsManager.getInstance().createCategory("Pescado");
        catDessert = RestaurantsManager.getInstance().createCategory("Postre");

        RestaurantsManager.getInstance().addCategory(catMeat, catFish, catDessert);

        allGluten = RestaurantsManager.getInstance().createAllergen("Gluten");
        allDairy = RestaurantsManager.getInstance().createAllergen("Lácteos");
        allEggs = RestaurantsManager.getInstance().createAllergen("Huevos");
        allNuts = RestaurantsManager.getInstance().createAllergen("Frutos secos");

        RestaurantsManager.getInstance().addAllergen(allGluten, allDairy, allEggs, allNuts);

        menuTasting = RestaurantsManager.getInstance().createMenu("Menú Degustación");
        menuExecutive = RestaurantsManager.getInstance().createMenu("Menú Ejecutivo");
        menuKids = RestaurantsManager.getInstance().createMenu("Menú Infantil");

        RestaurantsManager.getInstance().addMenu(menuTasting, menuExecutive, menuKids);

        restNuestro = RestaurantsManager.getInstance().createRestaurant("Nuestro Bar");
        restEntre = RestaurantsManager.getInstance().createRestaurant("Entreamigos");
        restAgua = RestaurantsManager.getInstance().createRestaurant("Agua Viva");

        RestaurantsManager.getInstance().addRestaurant(restNuestro, restEntre, restAgua);

        RestaurantsManager.getInstance().assignCategoryToDish(catMeat, dishLasagna, dishSteak, dishTurkey, dishCurry);
        RestaurantsManager.getInstance().assignCategoryToDish(catFish, dishSushi, dishTuna, dishSardine, dishCod);
        RestaurantsManager.getInstance().assignCategoryToDish(catDessert, dishCake, dishBrownie, dishJelly, dishMousse);

        RestaurantsManager.getInstance().assignDishToMenu(menuTasting, dishTurkey, dishCurry, dishSushi);
        RestaurantsManager.getInstance().assignDishToMenu(menuExecutive, dishCod, dishSteak, dishMousse);
        RestaurantsManager.getInstance().assignDishToMenu(menuKids, dishLasagna, dishTuna, dishBrownie);

        RestaurantsManager.getInstance().assignAllergenToDish(allGluten, dishLasagna, dishCake, dishBrownie, dishMousse);
        RestaurantsManager.getInstance().assignAllergenToDish(allDairy, dishCake, dishBrownie, dishMousse);
        RestaurantsManager.getInstance().assignAllergenToDish(allEggs, dishCake, dishBrownie, dishMousse);
        RestaurantsManager.getInstance().assignAllergenToDish(allNuts, dishBrownie);

    } catch (error) {
        console.log(error);
    }
}

function showRandomDishes() {
    const iteratorDishes = RestaurantsManager.getInstance().getterDishes();
    const arrayDishes = Array.from(iteratorDishes);

    const shuffledDishes = arrayDishes.sort(() => Math.random() - 0.5);
    const randomDishes = shuffledDishes.slice(0, 3);

    let div = createSection("randomDishes");
    randomDishes.forEach((dish) => {
        let article = createDishCard(dish);
        div.appendChild(article);
    });
}

function showHomePage() {
    clearPage();
    showCategories();
    showRandomDishes();
}

function showDropdownCategories() {
    let dropdownCategories = document.getElementById("ulCategories");
    dropdownCategories.innerHTML = '';

    const iteratorCategories = RestaurantsManager.getInstance().getterCategories();
    for (let category of iteratorCategories) {
        const item = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.classList.add("dropdown-item");
        anchor.setAttribute('id', category.name);
        anchor.textContent = category.name;

        item.appendChild(anchor);
        item.addEventListener('click', () => { showDishesInCategory(category) });

        dropdownCategories.appendChild(item);
    }

}

function showDropdownRestaurants() {
    let dropdownRestaurants = document.getElementById("ulRestaurants");
    dropdownRestaurants.innerHTML = '';

    const iteratorRestaurants = RestaurantsManager.getInstance().getterRestaurants();
    for (let restaurant of iteratorRestaurants) {
        const item = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.classList.add("dropdown-item");
        anchor.setAttribute('id', restaurant.name);
        anchor.textContent = restaurant.name;

        item.appendChild(anchor);
        item.addEventListener('click', () => { showRestaurant(restaurant) });

        dropdownRestaurants.appendChild(item);
    }

}

function showCategories() {
    clearPage();
    let div = createSection("categories");
    const iteratorCategories = RestaurantsManager.getInstance().getterCategories();
    for (let category of iteratorCategories) {
        let article = createElementCard(category);
        div.appendChild(article);
        article.addEventListener("click", () => { showDishesInCategory(category) });
    }

}

function showAllergens() {
    clearPage();
    let div = createSection("allergens");
    const iteratorAllergens = RestaurantsManager.getInstance().getterAllergens();
    for (let allergen of iteratorAllergens) {
        let article = createElementCard(allergen);
        div.appendChild(article);
        article.addEventListener("click", () => { showDishesWithAllergen(allergen) });
    }
}

function showMenus() {
    clearPage();
    let div = createSection("menus");
    const iteratorMenus = RestaurantsManager.getInstance().getterMenus();
    for (let menu of iteratorMenus) {
        let article = createElementCard(menu);
        div.appendChild(article);
        article.addEventListener("click", () => { showDishesInMenu(menu) });
    }
}

function showRestaurant(rest) {
    clearPage();
    let div = createSection("restaurants");
    const iteratorRestaurants = RestaurantsManager.getInstance().getterRestaurants();
    for (let restaurant of iteratorRestaurants) {
        if (restaurant.name === rest.name) {
            let article = createDishCard(restaurant);
            div.appendChild(article);
        }

    }
}

function showDishesInCategory(categ) {
    clearPage();

    let iteratorDishesInCategory;

    let selectedCategory;
    const iteratorCategories = RestaurantsManager.getInstance().getterCategories();
    for (let category of iteratorCategories) {
        if (category.name === categ.name) {
            selectedCategory = category;
            break;
        }
    }

    try {
        iteratorDishesInCategory = RestaurantsManager.getInstance().getDishesInCategory(selectedCategory, function (objA, objB) {
            return objA.name.toLowerCase().localeCompare(objB.name.toLowerCase());
        });

        let div = createSection("dishesInCategory");
        for (let iterator of iteratorDishesInCategory) {
            let article = createDishCard(iterator);
            div.appendChild(article);
        }
    } catch (error) {
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "No se encontraron platos para esta categoría";
        errorMessage.classList.add("text-danger");
        errorMessage.classList.add("text-center");
        divCentral.appendChild(errorMessage);
    }

}

function showDishesWithAllergen(allergen) {
    clearPage();

    let iteratorDishesWithAllergen;

    let selectedAllergen;
    const iteratorAllergens = RestaurantsManager.getInstance().getterAllergens();
    for (let a of iteratorAllergens) {
        if (a.name === allergen.name) {
            selectedAllergen = a;
            break;
        }
    }

    try {
        iteratorDishesWithAllergen = RestaurantsManager.getInstance().getDishesWithAllergen(selectedAllergen, function (objA, objB) {
            return objA.name.toLowerCase().localeCompare(objB.name.toLowerCase());
        });

        let div = createSection("dishesWithAllergen");
        for (let iterator of iteratorDishesWithAllergen) {
            let article = createDishCard(iterator);
            div.appendChild(article);
        }
    } catch (error) {
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "No se encontraron platos para este alérgeno";
        errorMessage.classList.add("text-danger");
        errorMessage.classList.add("text-center");
        divCentral.appendChild(errorMessage);
    }

}

function showDishesInMenu(menu) {
    clearPage();

    let iteratorDishesInMenu;

    let selectedMenu;
    const iteratorMenus = RestaurantsManager.getInstance().getterMenus();
    for (let m of iteratorMenus) {
        if (m.name === menu.name) {
            selectedMenu = m;
            break;
        }
    }

    try {
        iteratorDishesInMenu = RestaurantsManager.getInstance().getDishesInMenu(selectedMenu, function (objA, objB) {
            return objA.name.toLowerCase().localeCompare(objB.name.toLowerCase());
        });

        let div = createSection("dishesInMenu");
        for (let iterator of iteratorDishesInMenu) {
            let article = createDishCard(iterator);
            div.appendChild(article);
        }
    } catch (error) {
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "No se encontraron platos para este menú";
        errorMessage.classList.add("text-danger");
        errorMessage.classList.add("text-center");
        divCentral.appendChild(errorMessage);
    }

}

function createElementCard(elem) {
    const article = document.createElement('article');
    article.classList.add("col-sm-3");

    const card = document.createElement('div');
    card.classList.add("card");
    card.classList.add("text-center");
    card.style.width = "15rem";

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.textContent = elem.name;

    card.appendChild(cardBody);
    article.appendChild(card);

    return article;
}

function createDishCard(dish) {
    const article = document.createElement('article');
    article.classList.add("col-sm-3");

    const card = document.createElement('div');
    card.classList.add("card");
    card.style.width = "20rem";

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTextId = 'collapse-' + Math.random().toString(36).substr(2, 9);
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');

    cardText.classList.add('collapse');
    cardText.setAttribute('id', cardTextId);
    cardText.innerHTML = dish.toString();

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.classList.add('text-center');
    cardTitle.setAttribute('data-bs-toggle', 'collapse');
    cardTitle.setAttribute('data-bs-target', '#' + cardTextId);
    cardTitle.textContent = dish.name;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    card.appendChild(cardBody);
    article.appendChild(card);

    return article;
}

function createSection(id) {
    let section = divCentral.appendChild(document.createElement('section'));
    section.classList.add("container");
    section.classList.add("vh-50");
    section.setAttribute('id', id);

    let div = section.appendChild(document.createElement('div'));
    div.classList.add("row");
    div.classList.add("h-100");
    div.classList.add("justify-content-center");
    div.classList.add("align-items-center");

    return div;
}

function clearPage() {
    while (divCentral.firstChild) {
        divCentral.removeChild(divCentral.firstChild);
    }
}

function showFormCreateDish() {
    divCentral.innerHTML = `
    <div class="container mt-5">
        <h1>Crear plato</h1>
        <div class="row">
            <div class="col-md-4">
                <form name="formCreateDish" id="formCreateDish">
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Descripción:</label>
                        <textarea class="form-control" id="descripcion" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="ingredientes">Ingredientes:</label>
                        <textarea class="form-control" id="ingredientes" rows="5"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="imagen">Imagen URL:</label>
                        <input type="text" class="form-control" id="imagen">
                    </div>
                    <div class="form-group" id="divCateg">
                        <label for="categoria">Categorías:</label><br>
                    </div>
                    <div class="form-group">
                        <label for="alergenos">Alérgenos:</label> </br>
                        <input type="checkbox" id="cbGluten" name="alergeno" value="allGluten"> Gluten </br>
                        <input type="checkbox" id="cbDairy" name="alergeno" value="allDairy"> Lácteos </br>
                        <input type="checkbox" id="cbEggs" name="alergeno" value="allEggs"> Huevos </br> 
                        <input type="checkbox" id="cbNuts" name="alergeno" value="allNuts"> Frutos Secos </br>
                    </div>
                    <button type="submit" id="btnCreateDish" class="btn btn-primary">Crear</button>
                </form>
            </div>
        </div>
    </div>
    `;

    document.getElementById("btnCreateDish").addEventListener("click", (event) => {
        event.preventDefault();

        let isValid = true;
        let firstInvalidElement = null;

        let form = document.forms.formCreateDish;
        if (form.nombre.value === "") {
            isValid = false;
            firstInvalidElement = form.nombre;
            alert("El nombre del plato es obligatorio");

        }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
            firstInvalidElement.focus();
            return;
        }

        createDishFromForm();
    });

    const divRbCateg = document.getElementById("divCateg");

    const iteratorCategories = RestaurantsManager.getInstance().getterCategories();
    for (let category of iteratorCategories) {
        const label = document.createElement("label");
        label.textContent = `${category.name}`;
        label.setAttribute("for", `rb${category.name}`);

        const input = document.createElement("input");
        input.setAttribute("id", `rb${category.name}`);
        input.setAttribute("type", "radio");
        input.setAttribute("name", "categoria");
        input.setAttribute("value", `${category.name}`);

        divRbCateg.appendChild(input);
        divRbCateg.appendChild(label);

        divRbCateg.appendChild(document.createElement("br"));
    }

}

function createDishFromForm() {

    let name = document.getElementById("nombre").value;
    let desc = document.getElementById("descripcion")?.value;
    let ingr = document.getElementById("ingredientes")?.value;
    let img = document.getElementById("imagen")?.value;

    const dish = RestaurantsManager.getInstance().createDish(name, desc, ingr, img);
    RestaurantsManager.getInstance().addDish(dish);

    let categ = document.querySelector('input[name="categoria"]:checked')?.value;
    if (categ == ! "") {
        let selectedCategory;
        const iteratorCategories = RestaurantsManager.getInstance().getterCategories();
        for (let category of iteratorCategories) {
            if (category.name === categ) {
                selectedCategory = category;
                break;
            }
        }
        RestaurantsManager.getInstance().assignCategoryToDish(selectedCategory, dish);
    }


    let alle = [];
    const checkbox = document.querySelectorAll('input[name="alergeno"]');

    checkbox.forEach(cb => {
        if (cb.checked) {
            alle.push(cb.value);
        }
    });

    if (alle.length === 0) {
        alle.forEach(a => {
            if (a === "allGluten") {
                RestaurantsManager.getInstance().assignAllergenToDish(allGluten, dish);
            } else if (a === "allDairy") {
                RestaurantsManager.getInstance().assignAllergenToDish(allDairy, dish);
            } else if (a === "allEggs") {
                RestaurantsManager.getInstance().assignAllergenToDish(allEggs, dish);
            } else if (a === "allNuts") {
                RestaurantsManager.getInstance().assignAllergenToDish(allNuts, dish);
            }
        });
    }


    alert(`Plato ${name} creado correctamente`);
}

function showFormDeleteDish() {
    divCentral.innerHTML = `
    <div class="container mt-5">
        <h1>Eliminar plato</h1>
        <div class="row">
            <div class="col-md-4">
                <form name="formDeleteDish" id="formDeleteDish">
                    <div class="form-group">
                        <label for="selectDish">Selecciona un plato:</label>
                        <select class="form-control" id="selectDish" name="selectDish" required>
                            <option value="">Selecciona un plato...</option>
                        </select>
                    </div>
                    <button type=submit" id="btnDeleteDish" class="btn btn-danger">Eliminar</button>
                </form>
            </div>
        </div>
    </div>
    `;

    document.getElementById("btnDeleteDish").addEventListener("click", (event) => {
        event.preventDefault();

        let isValid = true;
        let firstInvalidElement = null;

        let form = document.forms.formDeleteDish;
        if (form.selectDish.value === "") {
            isValid = false;
            firstInvalidElement = form.selectDish;
            alert("Selecciona un plato del desplegable");
        }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
            firstInvalidElement.focus();
            return;
        }

        deleteDishFromForm();
    });

    const selectDish = document.getElementById("selectDish");

    selectDish.innerHTML = '<option value="">Selecciona un plato...</option>';

    const iteratorDishes = RestaurantsManager.getInstance().getterDishes();
    for (let dish of iteratorDishes) {
        const option = document.createElement("option");
        option.text = dish.name;
        option.value = dish.name;
        selectDish.appendChild(option);
    }
}

function deleteDishFromForm() {

    const iteratorDishes = RestaurantsManager.getInstance().getterDishes();
    let selectedDish = document.getElementById("selectDish").value;

    let foundDish;
    for (let dish of iteratorDishes) {
        if (dish.name === selectedDish) {
            foundDish = dish;
            break;
        }
    }

    RestaurantsManager.getInstance().removeDish(foundDish);

    alert(`Plato ${foundDish.name} eliminado correctamente`);
}

function showFormAssignMenu() {
    divCentral.innerHTML = `
    <div class="container mt-5">
        <h1>Asignar plato a menú</h1>
        <div class="row">
            <div class="col-md-4">
                <form name="formAssignMenu" id="formAssignMenu">
                    <div class="form-group">
                        <label for="selectDish">Selecciona un plato:</label>
                        <select class="form-control" name="selectDish" id="selectDish" required>
                            <option value="">Selecciona un plato...</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="selectMenu">Selecciona un menú:</label>
                        <select class="form-control" name="selectMenu" id="selectMenu" required>
                            <option value="">Selecciona un menú...</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Acción:</label><br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="action" id="assignRadio" value="asignar">
                            <label class="form-check-label" for="assignRadio">Asignar</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="action" id="unassignRadio" value="desasignar">
                            <label class="form-check-label" for="unassignRadio">Desasignar</label>
                        </div>
                    </div>
                    <button type=submit" id="btnAssingMenu" class="btn btn-primary">Confirmar</button>
                </form>
            </div>
        </div>
    </div>
    `;

    document.getElementById("btnAssingMenu").addEventListener("click", (event) => {
        event.preventDefault();

        let isValid = true;
        let firstInvalidElement = null;

        let form = document.forms.formAssignMenu;
        if (form.selectDish.value === "") {
            isValid = false;
            firstInvalidElement = form.selectDish;
            alert("Selecciona un plato del desplegable");
        }
        if (form.selectMenu.value === "") {
            isValid = false;
            firstInvalidElement = form.selectMenu;
            alert("Selecciona un menú del desplegable");
        }
        if (!document.querySelector('input[name="action"]:checked')) {
            isValid = false;
            firstInvalidElement = form.selectCategory;
            alert("Selecciona una acción de los radio botones");
        }

        let action = document.querySelector('input[name="action"]:checked').value;

        const iteratorMenu = RestaurantsManager.getInstance().getterMenus();
        for (let menu of iteratorMenu) {
            if (menu.name === form.selectMenu.value) {
                let foundDish = menu.dishes.find((d) => d.name === form.selectDish.value);
                if (action === "asignar") {
                    if (foundDish) {
                        isValid = false;
                        firstInvalidElement = form.selectDish;
                        alert(`Plato ${foundDish.name} ya pertenece a ${menu.name} `);
                        break;
                    }
                } else {
                    if (!foundDish) {
                        isValid = false;
                        firstInvalidElement = form.selectDish;
                        alert(`Plato ${form.selectDish.value} no pertenece a ${menu.name} `);
                    }
                }

            }
        }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
            firstInvalidElement.focus();
            return;
        }

        assignDishFromForm();
    });

    const selectDish = document.getElementById("selectDish");

    selectDish.innerHTML = '<option value="">Selecciona un plato...</option>';

    const iteratorDishes = RestaurantsManager.getInstance().getterDishes();
    for (let dish of iteratorDishes) {
        const option = document.createElement("option");
        option.text = dish.name;
        option.value = dish.name;
        selectDish.appendChild(option);
    }

    const selectMenu = document.getElementById("selectMenu");

    selectMenu.innerHTML = '<option value="">Selecciona un menú...</option>';

    const iteratorMenus = RestaurantsManager.getInstance().getterMenus();
    for (let menu of iteratorMenus) {
        const option = document.createElement("option");
        option.text = menu.name;
        option.value = menu.name;
        selectMenu.appendChild(option);
    }
}

function assignDishFromForm() {

    let action = document.querySelector('input[name="action"]:checked').value;

    const iteratorDishes = RestaurantsManager.getInstance().getterDishes();
    let selectedDish = document.getElementById("selectDish").value;

    let foundDish;
    for (let dish of iteratorDishes) {
        if (dish.name === selectedDish) {
            foundDish = dish;
            break;
        }
    }

    const iteratorMenus = RestaurantsManager.getInstance().getterMenus();
    let selectedMenu = document.getElementById("selectMenu").value;

    let foundMenu;
    for (let menu of iteratorMenus) {
        if (menu.name === selectedMenu) {
            foundMenu = menu;
            break;
        }
    }

    if (action === "asignar") {
        RestaurantsManager.getInstance().assignDishToMenu(foundMenu, foundDish);
    } else if (action === "desasignar") {
        RestaurantsManager.getInstance().deassignDishToMenu(foundMenu, foundDish);
    }

    let accion = action === "asignar" ? "asignado a" : "desasignado de";
    alert(`Plato ${foundDish.name} ${accion} ${foundMenu.name} correctamente`);
}

function showFormCreateCategory() {
    divCentral.innerHTML = `
    <div class="container mt-5">
        <h1>Crear categoría</h1>
        <div class="row">
            <div class="col-md-4">
                <form name="formCreateCategory" id="formCreateCategory">
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Descripción:</label>
                        <textarea class="form-control" id="descripcion" rows="3"></textarea>
                    </div>
                    <button type=submit" id="btnCreateCategory" class="btn btn-primary">Crear</button>
                </form>
            </div>
        </div>
    </div>
    `;

    document.getElementById("btnCreateCategory").addEventListener("click", (event) => {
        event.preventDefault();

        let isValid = true;
        let firstInvalidElement = null;

        let form = document.forms.formCreateCategory;
        if (form.nombre.value === "") {
            isValid = false;
            firstInvalidElement = form.nombre;
            alert("El nombre de la categoría es obligatorio");
        }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
            firstInvalidElement.focus();
            return;
        }

        createCategoryFromForm();
    });
}

function createCategoryFromForm() {
    let name = document.getElementById("nombre").value;
    let desc = document.getElementById("descripcion")?.value;

    const categ = RestaurantsManager.getInstance().createCategory(name, desc);
    RestaurantsManager.getInstance().addCategory(categ);

    alert(`Categoría ${name} creada correctamente`);
}

function showFormDeleteCategory() {
    divCentral.innerHTML = `
    <div class="container mt-5">
        <h1>Eliminar categoría</h1>
        <div class="row">
            <div class="col-md-4">
                <form name="formDeleteCategory" id="formDeleteCategory">
                    <div class="form-group">
                        <label for="selectCategory">Selecciona una categoría:</label>
                        <select class="form-control" id="selectCategory" name="selectCategory" required>
                            <option value="">Selecciona una categoría...</option>
                        </select>
                    </div>
                    <button type=submit" id="btnDeleteCategory" class="btn btn-danger">Eliminar</button>
                </form>
            </div>
        </div>
    </div>
    `;

    document.getElementById("btnDeleteCategory").addEventListener("click", (event) => {
        event.preventDefault();

        let isValid = true;
        let firstInvalidElement = null;

        let form = document.forms.formDeleteCategory;
        if (form.selectCategory.value === "") {
            isValid = false;
            firstInvalidElement = form.selectCategory;
            alert("Selecciona una categoría del desplegable");
        }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
            firstInvalidElement.focus();
            return;
        }

        deleteCategoryFromForm();
    });

    const selectCategory = document.getElementById("selectCategory");

    selectCategory.innerHTML = '<option value="">Selecciona una categoría...</option>';

    const iteratorCategories = RestaurantsManager.getInstance().getterCategories();
    for (let category of iteratorCategories) {
        const option = document.createElement("option");
        option.text = category.name;
        option.value = category.name;
        selectCategory.appendChild(option);
    }
}

function deleteCategoryFromForm() {
    const iteratorCategories = RestaurantsManager.getInstance().getterCategories();
    let selectedCategory = document.getElementById("selectCategory").value;

    let foundCategory;
    for (let category of iteratorCategories) {
        if (category.name === selectedCategory) {
            foundCategory = category;
            break;
        }
    }

    RestaurantsManager.getInstance().removeCategory(foundCategory);

    alert(`Categoría ${foundCategory.name} eliminada correctamente`);
}

function showFormCreateRestaurant() {
    divCentral.innerHTML = `
    <div class="container mt-5">
        <h1>Crear restaurante</h1>
        <div class="row">
            <div class="col-md-4">
                <form name="formCreateRestaurant" id="formCreateRestaurant">
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Descripción:</label>
                        <textarea class="form-control" id="descripcion" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="nombre">Ubicación:</label>
                        <input type="text" class="form-control" id="ubicacion" name="ubicacion" required>
                    </div>
                    <button type=submit" id="btnCreateRestaurant" class="btn btn-primary">Crear</button>
                </form>
            </div>
        </div>
    </div>
    `;

    document.getElementById("btnCreateRestaurant").addEventListener("click", (event) => {
        event.preventDefault();

        let isValid = true;
        let firstInvalidElement = null;

        let form = document.forms.formCreateRestaurant;
        if (form.nombre.value === "") {
            isValid = false;
            firstInvalidElement = form.nombre;
            alert("El nombre del restaurante es obligatorio");
        }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
            firstInvalidElement.focus();
            return;
        }

        createRestaurantFromForm();
    });
}

function createRestaurantFromForm() {
    let name = document.getElementById("nombre").value;
    let desc = document.getElementById("descripcion")?.value;
    let loc = document.getElementById("ubicacion")?.value;

    const rest = RestaurantsManager.getInstance().createRestaurant(name, desc, loc);
    RestaurantsManager.getInstance().addRestaurant(rest);

    alert(`Restaurante ${name} creado correctamente`);
}

function showModifyCategory() {
    divCentral.innerHTML = `
    <div class="container mt-5">
        <h1>Modificar categoría de un plato</h1>
        <div class="row">
            <div class="col-md-4">
                <form name="formModifyCategory" id="formModifyCategory">
                    <div class="form-group">
                        <label for="selectDish">Selecciona un plato:</label>
                        <select class="form-control" id="selectDish" name="selectDish" required>
                            <option value="">Selecciona un plato...</option>
                        </select>
                    </div>
                    <div class="form-group" id="divCateg">
                        <label for="categoria">Categorías:</label><br>
                    </div>
                    <button type=submit" id="btnModifyCategory" class="btn btn-primary">Modificar</button>
                </form>
            </div>
        </div>
    </div>
    `;

    document.getElementById("btnModifyCategory").addEventListener("click", (event) => {
        event.preventDefault();

        let isValid = true;
        let firstInvalidElement = null;

        let form = document.forms.formModifyCategory;
        if (form.selectDish.value === "") {
            isValid = false;
            firstInvalidElement = form.selectDish;
            alert("Selecciona un plato del desplegable");
        }
        if (!document.querySelector('input[name="categoria"]:checked')) {
            isValid = false;
            firstInvalidElement = form.selectCategory;
            alert("Selecciona una categoría de los radio botones");
        }

        let selectedCategory = document.querySelector('input[name="categoria"]:checked').value;
        const iteratorCategories = RestaurantsManager.getInstance().getterCategories();
        for (let categ of iteratorCategories) {
            if (categ.name === selectedCategory) {
                let foundDish = categ.dishes.find((d) => d.name === form.selectDish.value);
                if (foundDish) {
                    isValid = false;
                    firstInvalidElement = form.selectDish;
                    alert(`Plato ${foundDish.name} ya pertenece a la categoría ${categ.name} `);
                    break;
                }
            }
        } 
        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
            firstInvalidElement.focus();
            return;
        }

        modifyCategoryFromForm();
    });

    const selectDish = document.getElementById("selectDish");

    selectDish.innerHTML = '<option value="">Selecciona un plato...</option>';

    const iteratorDishes = RestaurantsManager.getInstance().getterDishes();
    for (let dish of iteratorDishes) {
        const option = document.createElement("option");
        option.text = dish.name;
        option.value = dish.name;
        selectDish.appendChild(option);
    }

    const divRbCateg = document.getElementById("divCateg");

    const iteratorCategories = RestaurantsManager.getInstance().getterCategories();
    for (let category of iteratorCategories) {
        const label = document.createElement("label");
        label.textContent = `${category.name}`;
        label.setAttribute("for", `rb${category.name}`);

        const input = document.createElement("input");
        input.setAttribute("id", `rb${category.name}`);
        input.setAttribute("type", "radio");
        input.setAttribute("name", "categoria");
        input.setAttribute("value", `${category.name}`);

        divRbCateg.appendChild(input);
        divRbCateg.appendChild(label);

        divRbCateg.appendChild(document.createElement("br"));
    }

}

function modifyCategoryFromForm() {

    let selectedCategory = document.querySelector('input[name="categoria"]:checked').value;
    const iteratorCategories = RestaurantsManager.getInstance().getterCategories();
    let foundCategory;
    for (let category of iteratorCategories) {
        if (category.name === selectedCategory) {
            foundCategory = category;
            break;
        }
    }

    let selectedDish = document.getElementById("selectDish").value;
    const iteratorDishes = RestaurantsManager.getInstance().getterDishes();
    let foundDish;
    for (let dish of iteratorDishes) {
        if (dish.name === selectedDish) {
            foundDish = dish;
            break;
        }
    }

    const iteratorFormerCategories = RestaurantsManager.getInstance().getterCategories();
    let formerCategory;
    for (let category of iteratorFormerCategories) {
        for (let dish of category.dishes) {
            if (dish.name === foundDish.name) {
                formerCategory = category;
            }

        }
    }

    RestaurantsManager.getInstance().assignCategoryToDish(foundCategory, foundDish);
    RestaurantsManager.getInstance().deassignCategoryToDish(formerCategory, foundDish);

    alert(`Plato ${foundDish.name} desasignado de ${formerCategory.name} y asignado a ${foundCategory.name} correctamente`);

}