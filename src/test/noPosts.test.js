import {shallowMount, createLocalVue, nextTick } from "@vue/test-utils";
import noPosts from "../components/posts/noPosts.vue"
import { describe, it, expect, vi, } from "vitest";



describe("noPosts.vue", () => {
    it("shows the correct message which it receives as props", async () => {
        const wrapper = shallowMount(noPosts, {propsData: {
            message: "There are no posts to show at this very moment.",
        }})
        const noShow = wrapper.find(".noPosts")
        expect(noShow.text()).toBe("There are no posts to show at this very moment.")
    })
    
})