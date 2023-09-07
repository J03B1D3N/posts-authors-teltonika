import { shallowMount, createLocalVue, nextTick } from "@vue/test-utils";
import editPost from "../components/forms/editPost.vue"
import { describe, it, expect, vi } from "vitest";
import Vuex from 'vuex'

const localVue = createLocalVue()   
localVue.use(Vuex)

describe("editPost.vue", () => {
    let mockRouter
    let actions
    let store 
    let getters

    beforeEach(() => {

        actions = {
            updatePosts: vi.fn().mockResolvedValue(),
            modalToggle: vi.fn()
        },
        getters  = {
            authors: () => [{id: 1, name: 'Max'}],
            getAuthorIdByName: (state, getters) => authorName => {
                const author = getters.authors.find(author => author.name === authorName)
                return author ? author.id : null
            },
            getAuthorNameById: (state, getters) => authorId => {
                const author = getters.authors.find(author => author.id === authorId)
                return author ? author.name : null
            },
            postDetail: () => {return {id: 1, title: "JOE BIDEN", body: "Lietuvos krepšininkai yra aukšti kaip medžiai", authorId: 1, created_at: "2021-02-19", updated_at: "2022-02-25"}}
               
            
        },
        store = new Vuex.Store({
            actions,
            getters,
        })

    })


    it("v-model correctly updates data on component creaton", async () => {
        let mockRouter = {
            push: vi.fn()
        }
        const wrapper = shallowMount(editPost, {store, localVue});
        expect(wrapper.vm.$data.title).toBe("JOE BIDEN")
        expect(wrapper.vm.$data.body).toBe("Lietuvos krepšininkai yra aukšti kaip medžiai")
        const title = wrapper.find("#title")
        const body = wrapper.find("#body")
        title.setValue("Kamala haris")
        expect(title.element.value).toBe("Kamala haris")
        body.setValue("Sventinis bankuchenas")
        expect(body.element.value).toBe("Sventinis bankuchenas")
    });

    it("triggers the updatePost() with correct info", () => {
        const wrapper = shallowMount(editPost, {store, localVue});
        const button = wrapper.find(".save")
        const title = wrapper.find("#title")
        title.setValue("Mantas Cekuolis")
        const body = wrapper.find("#body")
        body.setValue("Opium pieva buvo nice")

        const updated_at = function () {
        const date = new Date()
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
        }

        wrapper.vm.$router = { push: vi.fn() };

        button.trigger('click')
        expect(actions.updatePosts.mock.calls[0][1]).toEqual({
            id: 1, 
            title: "Mantas Cekuolis", 
            body: "Opium pieva buvo nice", 
            authorId: 1, 
            created_at: "2021-02-19", 
            updated_at: updated_at()
        })
    })

})