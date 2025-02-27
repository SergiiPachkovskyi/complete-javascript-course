import { API_URL, RES_PER_PPAGE, KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX} from './helpers.js';

export const state = {
    recipe: {},
    serach: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PPAGE,
    },
    bookmarks: [],
};

const createRecipeObject = function(data) {
    const {recipe} = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key: recipe.key}),
    }
}

export const loadRecipe = async function(id) {
    try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

        state.recipe = createRecipeObject(data)

        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;    
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.serach.query = query;

        const data = await AJAX(`${API_URL}/?search=${query}&key=${KEY}`);
        console.log(data);

        state.serach.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key: rec.key}),
            }
        });
        state.serach.page = 1;
    } catch (err) {
        console.log(err);
        throw err; 
    }
}

export const getSerchResultPage = function(page = state.serach.page) {
    state.serach.page = page;

    const start = (page -1) * 10;(page -1) * 10; // 0
    const end =  page * 10; // 9

    return state.serach.results.slice(start, end);
}

export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
        // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4 
    });

    state.recipe.servings = newServings;
}

const persistBookmarks = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();
}

export const deleteBookmark = function(id) {
    // Delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    // Mark current recipe as NOT bookmark
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
}

const init = function() {
    const storage = localStorage.getItem('bookmarks');

    if (storage) state.bookmarks = JSON.parse(storage);
}

init();

const clearBookmarks = function() {
    localStorage.clear('bookmarks');  
}
// clearBookmarks();

export const uploadRecipe = async function(newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
            const ingArr = ing[1].split(',').map(el => el.trim());
            if (ingArr.length !== 3) throw new Error('Wrong ingredient format! Please use the correct format');

            const [quantity, unit, description] = ing[1].replaceAll(' ', '').split(',');
            return {quantity: quantity ? +quantity : null, unit, description}
        });
        
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }

        console.log(recipe);

        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }
}