<template>

<div class="postsView">
    <button @click="handleClick" class="create">Create Post</button>
    <search-bar-vue/>
    <NoPostsVue v-if="posts.length === 0" :message="`No Posts To Show`"/>
    <PaginationVue/>
</div>

  
</template>

<script>
import SearchBarVue from '../components/search/searchBar.vue';
import NoPostsVue from '../components/posts/noPosts.vue'
import PaginationVue from '../components/pagination/Pagination.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  
    components: {
        PaginationVue,
        SearchBarVue,
        NoPostsVue
    },
    computed: {
        ...mapGetters(["posts"])
    },
    methods: {
        ...mapActions(['modalToggle', 'setCurrentComponent']),

        handleClick() {
            this.modalToggle();
            this.setCurrentComponent("Create")
        },
    }

}
</script>


<style scoped>
.create:hover {
    background-color: rgb(199, 199, 199);
    cursor: pointer;
}
.create {
    font-size: 1rem;
    border: 2px solid black;    
}
.postsView {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    height: 800px;
    position: relative;
}


button {
    margin: 1rem;
}
</style>