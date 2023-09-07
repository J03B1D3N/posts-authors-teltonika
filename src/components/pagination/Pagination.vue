<template>
            <div class="pagination">
                <div class="display">
                    <div class="wrapper" v-for="post in posts.data" :key="post.id">
                        <router-link :to="`/post/${post.id}`" data-test="router-link" >
                            <Post :post="post"/>
                        </router-link>
                    </div>
                </div>
                        <div class="paginationControl">
                    <button @click="prevPage" :disabled="currentPage === 1" id="prevPage">
                        <svg fill="#000000" width="20px" heighh="20px" viewBox="0 0 32 32" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M6.507,17.508l20.963,-0.008c0.828,-0 1.5,-0.673 1.5,-1.501c-0.001,-0.827 -0.673,-1.499 -1.501,-1.499l-20.975,0.008c0.088,-0.119 0.188,-0.231 0.298,-0.334c0,0 9.705,-9.079 9.705,-9.079c0.605,-0.565 0.636,-1.515 0.071,-2.12c-0.566,-0.604 -1.516,-0.636 -2.12,-0.07c-0,-0 -5.9,5.519 -9.705,9.078c-1.118,1.045 -1.749,2.509 -1.743,4.038c0.006,1.53 0.649,2.989 1.774,4.025c3.848,3.543 9.829,9.05 9.829,9.05c0.609,0.56 1.559,0.521 2.119,-0.088c0.561,-0.609 0.522,-1.558 -0.087,-2.119c-0,-0 -5.98,-5.507 -9.828,-9.05c-0.111,-0.102 -0.211,-0.213 -0.3,-0.331Z"/><g id="Icon"/></svg>
                    </button>              


                    <div>Page {{ currentPage }} of {{ totalPosts }}</div>
                    <button @click="nextPage" :disabled="currentPage === totalPosts" id="nextPage">
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M25.468,14.508l-20.967,-0.008c-0.828,-0 -1.501,0.672 -1.501,1.499c-0,0.828 0.672,1.501 1.499,1.501l21.125,0.009c-0.107,0.159 -0.234,0.306 -0.377,0.439c-3.787,3.502 -9.68,8.951 -9.68,8.951c-0.608,0.562 -0.645,1.511 -0.083,2.119c0.562,0.608 1.512,0.645 2.12,0.083c-0,0 5.892,-5.448 9.68,-8.95c1.112,-1.029 1.751,-2.47 1.766,-3.985c0.014,-1.515 -0.596,-2.968 -1.688,-4.018l-9.591,-9.221c-0.596,-0.574 -1.547,-0.556 -2.121,0.041c-0.573,0.597 -0.555,1.547 0.042,2.121l9.591,9.221c0.065,0.063 0.127,0.129 0.185,0.198Z"/><g id="Icon"/></svg>
                    </button>
                </div>
            </div>
            
  
</template>

<script>
import Post from '../posts/Post.vue'
import { mapGetters, mapActions} from "vuex";
import NoPostsVue from '../posts/noPosts.vue';
export default {
    components: {
        Post,
        NoPostsVue
    },
     data() {
         return {
            POSTS_PER_PAGE: POSTS_PER_PAGE
        }
     }, 
     computed: {
         ...mapGetters(["posts", "currentPage"]),
         totalPosts() {
            return Math.ceil(this.posts.total / this.POSTS_PER_PAGE)
         }
    },
    methods: {
        ...mapActions(['setCurrentPage', "getPosts", "getAuthors"]),
        prevPage() {
            if(this.currentPage > 1) {
                this.setCurrentPage(this.currentPage - 1)
            }
            this.getPosts()
        },
        nextPage() {
            if(this.currentPage < this.posts.total) {
                this.setCurrentPage(this.currentPage + 1)
            }
        this.getPosts()

        },
    },
    created() {
        this.getPosts()
        this.getAuthors()
    },
    
 }
 

</script>

<style scoped>
.display {
    display: grid;
    width: 100%;
    gap: 1rem;
    grid-template-rows: repeat(3, 1fr);
    grid-column: 1fr;
    justify-items: center;
    height: 100%;
}
.pagination {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
button {
    display: flex;
    align-content: center;
    justify-content: center;
}


a:hover {
    cursor: pointer;
    background-color: rgb(236, 236, 236);
}
a:active {
    background-color: rgb(211, 211, 211);
}
.wrapper {
    border: 2px solid black;
    width: 50%;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
}

a {
    text-decoration: none;
    color: black;
    padding: 1rem;
}
.paginationControl{
    width: 50%;
    display: flex;
    justify-content:center;
    align-items: center;
    gap: 1rem;
}
.paginationControl div {
    width: 100px;
}

</style>