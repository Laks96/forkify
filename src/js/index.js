import Search from './models/Search'
import * as domElements from './base'
import * as SearchView from './views/searchView'
import { renderLoader, clearLoader } from '../shared/loader'


const state = {}


const controlSearch = async () => {

    //get query from the view
    const query = SearchView.getInput()
    if (query) {
        // new search object added to the central state
        state.search = new Search(query)

        //prepare UI for the result
        SearchView.clearInput()
        SearchView.clearResult()
        renderLoader(domElements.results)
        await state.search.searchResult(query)
        console.log(state.search.result)

        //render result on the UI
        clearLoader(domElements.results)
        SearchView.render(state.search.result)


    }
}

domElements.searchForm.addEventListener('submit', event => {
    event.preventDefault()
    controlSearch()

})

domElements.resultPages.addEventListener('click', event => {
    const btn = event.target.closest('button')
    if (btn) {
        let pageNum = parseInt(btn.dataset.pagenum)
        console.log(btn.dataset)
        SearchView.clearResult()
        SearchView.render(state.search.result, pageNum)
    }
})

