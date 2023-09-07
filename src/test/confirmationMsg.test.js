import { shallowMount, createLocalVue, nextTick } from "@vue/test-utils";
import confirmationMsg from "../components/notifications/confirmationMsg.vue"
import { describe, it, expect, vi } from "vitest";
import Vuex from 'vuex'

const localVue = createLocalVue()   
localVue.use(Vuex)

describe("confirmationMsg.vue", () => {
    let actions
    let store 
    let getters

    beforeEach(() => {

        actions = {
            deletePost: vi.fn().mockResolvedValue(),
            setConfirmationMsgStatus: vi.fn(),
            setConfirmationMsg: vi.fn(),
        },
        getters  = {
            authors: () => [{id: 1, name: 'Max'}],
            getConfirmationMsg: function() {
                return {
                    msg: "Do you really want to delete this post?",
                    post: {
                        id: 1, 
                        title: "JOE BIDEN", 
                        body: "Lietuvos krepšininkai yra aukšti kaip medžiai", 
                        authorId: 1, 
                        created_at: "2021-02-19", 
                        updated_at: "2022-02-25"
                    }
                }
           },
           getAuthorNameById: (state, getters) => authorId => {
            const author = getters.authors.find(author => author.id === authorId)
            return author ? author.name : null
        },
               
        },
        store = new Vuex.Store({
            actions,
            getters,
        })

    })
    it("reads the getter data correctly", async () => {
        const wrapper = shallowMount(confirmationMsg, {store, localVue})
        const msg = wrapper.find("h1")
        expect(msg.text()).toBe("Do you really want to delete this post?")
        const title = wrapper.find(".title")
        expect(title.text()).toBe(store.getters.getConfirmationMsg.post.title)
        const author = wrapper.find(".author")
        expect(author.text()).toBe(store.getters.getAuthorNameById(store.getters.getConfirmationMsg.post.authorId))
    })

    it("calls deletePost() correctly", async () => {
        const wrapper = shallowMount(confirmationMsg, {store, localVue})

        wrapper.vm.$router = { push: vi.fn() };

        const button = wrapper.find(".yes")

        button.trigger("click")
        expect(actions.deletePost.mock.calls[0][1]).toEqual({
            id: 1, 
            title: "JOE BIDEN", 
            body: "Lietuvos krepšininkai yra aukšti kaip medžiai", 
            authorId: 1, 
            created_at: "2021-02-19", 
            updated_at: "2022-02-25"
        })
    }),


    it("on cancel resets confirmationMsg and toggles modal", () => {

        const wrapper = shallowMount(confirmationMsg, {store, localVue})
        const button = wrapper.find(".cancel")
        button.trigger("click")
        expect(actions.setConfirmationMsgStatus).toHaveBeenCalledWith(expect.any(Object), false);
        expect(actions.setConfirmationMsg).toHaveBeenCalledWith(expect.any(Object), {});
    })

})