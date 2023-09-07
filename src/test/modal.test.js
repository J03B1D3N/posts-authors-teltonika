import { shallowMount, createLocalVue, nextTick } from "@vue/test-utils";
import modal from "../components/Modal.vue"
import editPost from "../components/forms/editPost.vue"
import createPost from "../components/forms/createPost.vue"
import { describe, it, expect, vi, } from "vitest";
import Vuex from 'vuex'
import VueRouter from 'vue-router';



const localVue = createLocalVue()   
localVue.use(Vuex)
localVue.use(VueRouter);


describe("modal.vue", () => {
    let state
    let actions
    let getters
    let store 

    beforeEach(() => {
        state = {
            currentComponent: "Edit"
        }
        actions = {
            modalToggle: vi.fn()
        },
        getters  = {
            currentComponent: (state) => state.currentComponent
        },
        store = new Vuex.Store({
            state,
            actions,
            getters,
        })

    })

    it("renders editPost component when currentComponent state is Edit", () => {
        const wrapper = shallowMount(modal, {store, localVue})
        const editComponent = wrapper.findComponent(editPost)
        expect(editComponent.exists()).toBe(true);
    })
    it("renders createPost component when currentComponent state is Create", async () => {
        const wrapper = shallowMount(modal, {store, localVue})
        store.state.currentComponent = "Create"
        await localVue.nextTick()
        const createComponent = wrapper.findComponent(createPost)
        expect(createComponent.exists()).toBe(true);
    })

    it("modal calls modalToggle() on click", () => {
        const wrapper = shallowMount(modal, {store, localVue})
        const modalInt = wrapper.find(".modal")
        modalInt.trigger('click')
        expect(actions.modalToggle).toBeCalledTimes(1)
    })
    
    it("modalToggle is not called when clicked anywhere on the rendered component", () => {
        const wrapper = shallowMount(modal, {store, localVue})
        const currentComponent = wrapper.find('.currentComponent')
        currentComponent.trigger('click')
        expect(actions.modalToggle).toBeCalledTimes(0)
    })
})