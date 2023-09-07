import Vue from 'vue'
import VueRouter from 'vue-router'
import PostsView from "../views/PostsView.vue"
import PostDetail from "../views/PostDetail.vue"
import NotFoundView from "../views/NotFound.vue"

Vue.use(VueRouter)




const routes = [
  { path: '/post/:id',name: "postDetail", component: PostDetail },
  { path: '/', name:"home", component: PostsView},
  { path: '*', name: "notFound", component: NotFoundView}
]


export const router = new VueRouter({
  routes
})


