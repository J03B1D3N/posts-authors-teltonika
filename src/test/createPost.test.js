
import { shallowMount, createLocalVue } from "@vue/test-utils";
import createPost from "../components/forms/createPost.vue"
import { describe, it, expect, vi } from "vitest";
import Vuex from 'vuex'

const localVue = createLocalVue()   
localVue.use(Vuex)

describe("createPost.vue", () => {
    let actions
    let store 
    let getters

    beforeEach(() => {
        
        actions = {
            createNewPost: vi.fn().mockResolvedValue(),
            modalToggle: vi.fn()
        },
        getters  = {
            authors: () => [{id: 1, name: 'Max'}],
            getAuthorIdByName: (state, getters) => authorName => {
                const author = getters.authors.find(author => author.name === authorName)
                return author ? author.id : null
            }
        },
        store = new Vuex.Store({
            actions,
            getters
        })

    })

    
    it("v-model correctly updates data", async () => {

        const wrapper = shallowMount(createPost, {store, localVue});
        const title = wrapper.find("#title")
        await title.setValue("BEST POST EVER")
        expect(wrapper.vm.$data.title).toBe("BEST POST EVER")

        const body = wrapper.find("#body")
        await body.setValue("Karalius Mindaugas buvo geras karalius")
        expect(wrapper.vm.$data.body).toBe("Karalius Mindaugas buvo geras karalius")

        const author = wrapper.find("#author")
        author.setValue("Max")
        expect(wrapper.vm.$data.author).toBe("Max")

    });

    it("correctly calls data", async () => {
        const wrapper = shallowMount(createPost, {store, localVue});
        const title = wrapper.find("#title")
        await title.setValue("BEST POST EVER")

        const body = wrapper.find("#body")
        await body.setValue("Karalius Mindaugas buvo geras karalius")

        const author = wrapper.find("#author")
        author.setValue("Max")

        const submit = wrapper.find('.submit')
        await submit.trigger('click')

        expect(actions.createNewPost.mock.calls[0][1]).toEqual({
            id: expect.any(String),
        authorId: 1,
        title: "BEST POST EVER",
        body: "Karalius Mindaugas buvo geras karalius",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        })


    })
    
    it("when cancelled correctly closes the component", async () => {

        const wrapper = shallowMount(createPost, {store, localVue});
        const button = wrapper.find('.cancel')
        button.trigger('click')
        expect(actions.modalToggle).toBeCalledTimes(1)

    });


});