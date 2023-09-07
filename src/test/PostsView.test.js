import { shallowMount, createLocalVue, nextTick } from "@vue/test-utils";
import PostsView from "../views/PostsView.vue"
import noPosts from "../components/posts/noPosts.vue"
import searchBar from "../components/search/searchBar.vue"
import pagination from "../components/pagination/Pagination.vue"
import { describe, it, expect, vi, } from "vitest";
import Vuex from 'vuex'



const localVue = createLocalVue()   
localVue.use(Vuex)


describe("PostsView.vue", () => {
    let state
    let actions
    let store 
    let getters

    beforeEach(() => {
        state = {
            modalStatus: false,
            posts: [
                {id: 1, 
                    title: "JOE BIDEN", 
                    body: "Lietuvos krepšininkai yra aukšti kaip medžiai", 
                    authorId: 1, 
                    created_at: "2021-02-19", 
                    updated_at: "2022-02-25"
                },
                {id: 2, 
                    title: "Dalia Grybauskaitė", 
                    body: "Juodas karate diržas", 
                    authorId: 2, 
                    created_at: "2021-02-19", 
                    updated_at: "2022-02-25"
                },
                {id: 3, 
                    title: "Gitanas Nausėda", 
                    body: "Pats sau fainas", 
                    authorId: 3, 
                    created_at: "2021-02-19", 
                    updated_at: "2022-02-25"
                }
            ]
        }
        actions = {
            modalToggle: vi.fn(),
            setCurrentComponent: vi.fn()
    
        },
        getters  = {
            posts: (state) => state.posts,
            modalStatus: (state) => state.modalStatus
        },
        store = new Vuex.Store({
            state,
            actions,
            getters,
        })

    })

    it("create post buttons works as intended", () => {
        const wrapper = shallowMount(PostsView, {store, localVue})
        const createBtn = wrapper.find(".create")
        createBtn.trigger('click')
        expect(actions.modalToggle).toBeCalledTimes(1)
        expect(actions.setCurrentComponent).toBeCalledWith(expect.any(Object), "Create")
    })
    it("searchBar renders correctly", () => {
        const wrapper = shallowMount(PostsView, {store, localVue})
        const searchBarComponent = wrapper.findComponent(searchBar)
        expect(searchBarComponent.exists()).toBe(true);
    })
    it("noPosts.vue does not render when posts > 0", () => {
        const wrapper = shallowMount(PostsView, {store, localVue})
        const noPostsComponent = wrapper.findComponent(noPosts)
        expect(noPostsComponent.exists()).toBe(false)
    })
    it("noPosts.vue does renders when posts =< 0", async () => {
        const wrapper = shallowMount(PostsView, {store, localVue})
        store.state.posts = []
        await localVue.nextTick()
        const noPostsComponent = wrapper.findComponent(noPosts)
        expect(noPostsComponent.exists()).toBe(true)
    })
    it("Pagination.vue renders correctly", () => {
        const wrapper = shallowMount(PostsView, {store, localVue})
        const paginationComponent = wrapper.findComponent(pagination)
        expect(paginationComponent.exists()).toBe(true)
    })

})