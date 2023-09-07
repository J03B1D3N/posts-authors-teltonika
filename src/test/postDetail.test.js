import { shallowMount, createLocalVue, nextTick } from "@vue/test-utils";
import postDetail from "../views/PostDetail.vue"
import { describe, it, expect, vi, } from "vitest";
import Vuex from 'vuex'



const localVue = createLocalVue()   
localVue.use(Vuex)


describe("PostDetail.vue", () => {
    let state
    let actions
    let store 
    let getters

    beforeEach(() => {
        state = {
            modalStatus: false,
        }
        actions = {
            getPost: vi.fn().mockResolvedValue(),
            setCurrentComponent: vi.fn(),
            modalToggle: vi.fn(),
            setConfirmationMsg: vi.fn(),
            setConfirmationMsgStatus: vi.fn()
        },
        getters  = {
            authors: () => [{id: 3, name: 'Max'}],
            getAuthorNameById: (state, getters) => authorId => {
                const author = getters.authors.find(author => author.id === authorId)
                return author ? author.name : null
            },
            postDetail: () => {return {id: 3, 
                title: "Gitanas Nausėda", 
                body: "Pats sau fainas", 
                authorId: 3, 
                created_at: "2021-02-19", 
                updated_at: "2022-02-25"
            }},
            modalStatus: (state) => state.modalStatus
        },
        store = new Vuex.Store({
            state,
            actions,
            getters,
        })

    })

    it("renders the postDetail state correctly", async () => {
        const wrapper = shallowMount(postDetail, {store, localVue, mocks: {
            $route: {
              params: { id: 3 }
            }
          }})

        const title = wrapper.find('.title')
        expect(title.text()).toBe(store.getters.postDetail.title)
        const author = wrapper.find('.author')
        expect(author.text()).toBe(store.getters.getAuthorNameById(store.getters.postDetail.authorId))
        const content = wrapper.find('.content')
        expect(content.text()).toBe(store.getters.postDetail.body)
        const lastUpdatedAt = wrapper.find('.lastUpdatedAt')
        expect(lastUpdatedAt.text()).toBe("last updated at 2022-02-25")
    })
    it("edit button works correctly", () => {
        const wrapper = shallowMount(postDetail, {store, localVue, mocks: {
            $route: {
              params: { id: 3 }
            }
          }})
          const editBtn = wrapper.find(".edit")
          editBtn.trigger('click')
          expect(actions.modalToggle).toBeCalledTimes(1)
          expect(actions.setCurrentComponent).toBeCalledWith(expect.any(Object), "Edit")
    })

    it("delete button works correctly", () => {

        const wrapper = shallowMount(postDetail, {store, localVue, mocks: {
            $route: {
              params: { id: 3 }
            }
          }})
        const deleteBtn = wrapper.find(".delete")
        deleteBtn.trigger('click')
        expect(actions.setConfirmationMsg).toBeCalledWith(expect.any(Object), {
            msg: "Do you really want to delete this post?",
            post: getters.postDetail()
        })
        expect(actions.setConfirmationMsgStatus).toBeCalledWith(expect.any(Object), true)
    })
})