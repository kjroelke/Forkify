import * as modal from './modal.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resulteView from './views/resulteView.js';
import paginationView from './views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////




if (modal.hot) {
  modal.hot.accept()
}




const controlRecipes = async function () {
  try{
    const id = window.location.hash.slice(1)
    if(!id) return
    recipeView.spinner()

// 1) loading recipe
await modal.loadRecipe(id)
  // const {recipe}=modal.state

// console.log(recipe);
recipeView.render(modal.state.recipe)


  } catch (err) {
    recipeView.renderError()
  }
}

const controlSearchResult = async function () {
  try{
    resulteView.spinner()
    const query =searchView.getQuery()
    if (!query) return
    await modal.loadSearchResult(query)
    console.log(modal.state.search.results);
    // resulteView.render(modal.state.search.results)
    resulteView.render(modal.getSerachResultePage())
    paginationView.render(modal.state.search)
  }catch(err){
    console.log(err);
  }
}
const paginationControler = function (goTo) {
  resulteView.render(modal.getSerachResultePage(goTo))
  paginationView.render(modal.state.search)
}

const controlServing = function () {
  modal.updateServing()
  
  recipeView.render(modal.state.recipe)
}

const init = function(){
  recipeView.addHendlerRender(controlRecipes)
  recipeView.addHendlerUpdateServing(controlServing)
  searchView.addHandlerSearch(controlSearchResult)
  paginationView.addHandlerClick(paginationControler)
}
init()


