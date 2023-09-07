import { shallowMount, createLocalVue, nextTick } from "@vue/test-utils";
import searchBar from "../components/search/searchBar.vue"
import { describe, it, expect, vi, } from "vitest";
import Vuex from 'vuex'
import VueRouter from 'vue-router';



const localVue = createLocalVue()   
localVue.use(Vuex)
localVue.use(VueRouter);


describe("searchBar.vue", () => {
    let state
    let actions
    let store 
    let getters

    beforeEach(() => {
        state = {
            search: "abuga"
        }
        actions = {
            setSearch: vi.fn()
        },
        getters  = {
            search: (state) => state.search
               
            
        },
        store = new Vuex.Store({
            state,
            actions,
            getters,
        })

    })
    it("correctly updates search state on input", () => {
        const wrapper = shallowMount(searchBar, {localVue, store})
        const search  = wrapper.find('#search')
        expect(search.element.value).toBe(store.state.search)
        search.setValue("booba")
        expect(search.element.value).toBe("booba")
        search.trigger('input')
        expect(actions.setSearch).toBeCalledWith(expect.any(Object), "booba")
    })
})