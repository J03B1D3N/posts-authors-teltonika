import { shallowMount, createLocalVue, nextTick } from "@vue/test-utils";
import notification from "../components/notifications/notification.vue"
import { describe, it, expect, vi } from "vitest";
import Vuex from 'vuex'

const localVue = createLocalVue()   
localVue.use(Vuex)

describe("notification.vue", () => {
    let actions
    let store 
    let getters

    beforeEach(() => {


        getters  = {
            notificationMsg: function() {
                return {
                    text: "Everything went right!",
                    color: "rgb(90, 216, 90)"
                }
           },
          
               
        },
        store = new Vuex.Store({
            getters,
        })

    })
    it("displays the message correctly", () => {
        const wrapper = shallowMount(notification, {store, localVue})
        const msg = wrapper.find("div")
        expect(msg.text()).toBe(store.getters.notificationMsg.text)
    })
    it("displays the color correctly", () => {
        const wrapper = shallowMount(notification, {store, localVue})
        const msg = wrapper.find("div")
        const styles = msg.element.style
        expect(styles.backgroundColor).toBe("rgb(90, 216, 90)");   
     })
})