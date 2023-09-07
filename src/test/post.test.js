import { shallowMount, createLocalVue } from "@vue/test-utils";
import post from "../components/posts/Post.vue"
import { describe, it, expect, vi } from "vitest";
import Vuex from 'vuex'

const localVue = createLocalVue()   
localVue.use(Vuex)

describe("post.vue", () => {
    let actions
    let store 
    let getters

    beforeEach(() => {

        actions = {
            setConfirmationMsg: vi.fn(),
            setConfirmationMsgStatus: vi.fn(),
            setCurrentComponent: vi.fn(),
            setPostDetail: vi.fn(),     
            modalToggle: vi.fn()
        },
        getters  = {
            authors: () => [{id: 1, name: 'Max'}, {id: 2, name: 'John'}, {id: 3, name: 'Neo'}],
            getAuthorNameById: (state, getters) => authorId => {
                const author = getters.authors.find(author => author.id === authorId)
                return author ? author.name : null
            },
            posts: () => {return [
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
               
            
        },
        store = new Vuex.Store({
            actions,
            getters,
        })

    })

    it("renders the post correctly", () => {
        const wrapper = shallowMount(post, {store, localVue, propsData: {
            post: store.getters.posts[0]
        }})
        const postInfo = store.getters.posts[0]
        const title = wrapper.find('.title')
        expect(title.text()).toBe(postInfo.title)
        const author = wrapper.find('.author')
        expect(author.text()).toBe(store.getters.getAuthorNameById(postInfo.authorId))
        const lastEdit = wrapper.find('.lastEdited')
        expect(lastEdit.text()).toBe(postInfo.updated_at)

    })
    it("edit button sets postDetail, currentComponent and togglesModal correctly", () => {
        const wrapper = shallowMount(post, {store, localVue, propsData: {
            post: store.getters.posts[1]
        }})
        const editBtn = wrapper.find(".edit")
        editBtn.trigger('click')
        expect(actions.modalToggle).toBeCalledTimes(1)
        expect(actions.setCurrentComponent).toBeCalledWith(expect.any(Object), 'Edit')
        expect(actions.setPostDetail).toBeCalledWith(expect.any(Object), {id: 2, 
            title: "Dalia Grybauskaitė", 
            body: "Juodas karate diržas", 
            authorId: 2, 
            created_at: "2021-02-19", 
            updated_at: "2022-02-25"
        })
    })
    it("delete button correctly sets confirmation msg and status", () => {
        const postInfo = store.getters.posts[2]
        const wrapper = shallowMount(post, {store, localVue, propsData: {
            post: postInfo
        }})
        const deleteBtn = wrapper.find(".delete")
        deleteBtn.trigger('click')
        expect(actions.setConfirmationMsg).toBeCalledWith(expect.any(Object), {
            msg: "Do you really want to delete this post?",
            post: postInfo
        })
        expect(actions.setConfirmationMsgStatus).toBeCalledWith(expect.any(Object), true)
    })
})