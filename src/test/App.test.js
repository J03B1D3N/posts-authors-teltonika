import { shallowMount, createLocalVue, nextTick } from "@vue/test-utils";
import App from "../App.vue"
import modalVue from "../components/Modal.vue"
import notificationVue from "../components/notifications/notification.vue"
import confirmationMsgVue from "../components/notifications/confirmationMsg.vue"
import { describe, it, expect, vi, } from "vitest";
import Vuex from 'vuex'
import VueRouter from 'vue-router';




const localVue = createLocalVue()   
localVue.use(Vuex)
localVue.use(VueRouter)


describe("PostsView.vue", () => {
    let state
    let actions
    let store 
    let getters

    beforeEach(() => {
        state = {
            modalStatus: false,
            confirmationMsgStatus: false,
            notificationStatus: false
        }
        actions = {
            getPosts: vi.fn().mockResolvedValue(),
            getAuthors: vi.fn().mockRejectedValue()
        },
        getters  = {
            modalStatus: (state) => state.modalStatus,
            getConfirmationMsgStatus: (state) => state.confirmationMsgStatus,
            notificationStatus: (state) => state.notificationStatus
        },
        store = new Vuex.Store({
            state,
            actions,
            getters,
        })

    })
    it("Doesn't render the modal when modalStatus is false", async () => {
        const wrapper = shallowMount(App, {store, localVue})
        const modalComponent = wrapper.findComponent(modalVue)
        const styles = modalComponent.element.style
        expect(styles.display).toBe("none")
    })
    it("Modal renders correcly when modalStatus is true", async () => {
        const wrapper = shallowMount(App, {store, localVue})
        store.state.modalStatus = true
        const modalComponent = wrapper.findComponent(modalVue)
        await localVue.nextTick()
        expect(modalComponent.isVisible()).toBe(true)
    })
    it("router-view renders correctly", () => {
        const wrapper = shallowMount(App, {store, localVue})
        const router = wrapper.find(".router")
        expect(router.exists()).toBe(true)
        expect(router.isVisible()).toBe(true)
    })
    it("notification doesn't show up when notification status is false", () => {
        const wrapper = shallowMount(App, {store, localVue})
        const notificationComp = wrapper.find(".notification")
        expect(notificationComp.exists()).toBe(true)
        expect(notificationComp.isVisible()).toBe(false)
    })
    it("notification shows up when notification status is true", async () => {
        const wrapper = shallowMount(App, {store, localVue})
        store.state.notificationStatus = true
        await localVue.nextTick()
        const notificationComp = wrapper.find(".notification")
        expect(notificationComp.exists()).toBe(true)
        expect(notificationComp.isVisible()).toBe(true)
    })
    it("confirmationMsg doesn't show up when confirmation status is false", () => {
        const wrapper = shallowMount(App, {store, localVue})
        const confirmationMsgComp = wrapper.find(".confirmation")
        expect(confirmationMsgComp.exists()).toBe(true)
        expect(confirmationMsgComp.isVisible()).toBe(false)
    })
    it("confirmation shows up when confirmation status is true", async () => {
        store.state.confirmationMsgStatus = true
        const wrapper = shallowMount(App, {store, localVue})
        await localVue.nextTick()
        const confirmationMsgComp = wrapper.find(".confirmation")
        expect(confirmationMsgComp.exists()).toBe(true)
        expect(confirmationMsgComp.isVisible()).toBe(true)
    })
})