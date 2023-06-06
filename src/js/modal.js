import { API_URL } from "./config.js"
import { getJson } from "./helpers.js"

export const state = {
   recipe:{},
   search:{
    query:'',
    results:[],
    page: 1,
    resultPerPage : 10,
   }
 }
 export const loadRecipe = async function (id) {
    try{
      const data = await getJson(`${API_URL}/${id}`);

   

    // console.log(data);
        const {recipe} = data.data
        state.recipe={
        id:recipe.id,
        title:recipe.title,
        image:recipe.image_url,
        servings:recipe.servings ,
        publisher:recipe.publisher,
        sourceUrl:recipe.source_url,
        ingredients:recipe.ingredients,
        cookingTime:recipe.cooking_time,
        }
        // console.log(recipe);
    }catch (err){
        alert(err)
    }
 }


 export const loadSearchResult = async function(query){
  try{
    state.search.query = query
    const data = await getJson(`${API_URL}?search=${query}`);
    // console.log(data);
    state.search.results=data.data.recipes.map(rec=>{
      return{
        id:rec.id,
        title:rec.title,
        image:rec.image_url,
        publisher:rec.publisher,
      }
    })



  }catch(err){
    console.log(err);
    throw err
  }
 }


export const getSerachResultePage = function (page = state.search.page) {
  state.search.page = page
  const start = (page-1)* state.search.resultPerPage
  const end = page* state.search.resultPerPage
  return state.search.results.slice(start,end)
}


export const updateServing = function (newServing) {
   state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings
   });
   state.recipe.servings= newServing
}