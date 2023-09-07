import { shallowMount, createLocalVue, nextTick } from "@vue/test-utils";
import pagination from "../components/pagination/Pagination.vue"
import post from "../components/posts/Post.vue"
import { describe, it, expect, vi, } from "vitest";
import Vuex from 'vuex'
import VueRouter from 'vue-router';



const localVue = createLocalVue()   
localVue.use(Vuex)
localVue.use(VueRouter);


describe("pagination.vue", () => {
    let state
    let actions
    let store 
    let getters

    beforeEach(() => {
        state = {
            currentPage: 2,
            posts: {
                total: 9,
                data: [
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
            ]}
        }
        actions = {
            getPosts: vi.fn().mockResolvedValue(),
            setCurrentPage: vi.fn(),
            getAuthors: vi.fn().mockResolvedValue()
        },
        getters  = {
            currentPage: (state) => {
                return state.currentPage
            },
            getAuthorNameById: () => 'John',
            posts: (state) => state.posts
               
            
        },
        store = new Vuex.Store({
            state,
            actions,
            getters,
        })

    })

    it("renders the correct number of post components",  () => {
        const wrapper = shallowMount(pagination, {store, localVue})
        const postComponents = wrapper.findAllComponents(post)
        expect(postComponents.length).toBe(store.getters.posts.data.length);
    })
    it("clicking on routerlink navigates to the correct url", async () => {
        const wrapper = shallowMount(pagination, {store, localVue})
        const routerLinks = wrapper.findAll('[data-test="router-link"]');
        expect(routerLinks.at(0).element.attributes['0'].value).toStrictEqual('/post/1')
        expect(routerLinks.at(1).element.attributes['0'].value).toStrictEqual('/post/2')
        expect(routerLinks.at(2).element.attributes['0'].value).toStrictEqual('/post/3')
    })
    it("nextPage correcly increments", async () => {
        const wrapper = shallowMount(pagination, {store, localVue})
        const nextPage = wrapper.find("#nextPage")
        nextPage.trigger("click")
        expect(actions.setCurrentPage).toHaveBeenCalledWith(expect.any(Object), 3);
        expect(actions.setCurrentPage).toHaveBeenCalledTimes(1);
        
    })
    it("prevPage corretly decrements", () => {
        const wrapper = shallowMount(pagination, {store, localVue})
        const prevPage = wrapper.find("#prevPage")
        prevPage.trigger('click')
        expect(actions.setCurrentPage).toHaveBeenCalledWith(expect.any(Object), 1);
        expect(actions.setCurrentPage).toHaveBeenCalledTimes(1);
    })
})