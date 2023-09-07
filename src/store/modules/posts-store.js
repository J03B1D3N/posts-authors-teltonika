
export default {
    state: {
        posts: [],
        postDetail: {},
        currentPage: 1,
        search: "",
        filteredPosts: []
    },
    getters: {
        posts: state => state.posts,
        postDetail: state => state.postDetail,
        currentPage: state => state.currentPage,
        search: state => state.search,
        filteredPosts: state => state.filteredPosts
    },
    actions: {
        async deletePost({dispatch}, post) {
            try{
                const response = await this.deletePost(post)
                if (response.status === 200 || response.status === 201 || response.status === 204) {
                    dispatch("closeConfirmationPopUp")
                    dispatch("setNotificationMsg", {text: "Post Deleted Successfully!", success: true})
                }  
            } catch(error) {
                    dispatch("closeConfirmationPopUp")
                    dispatch("setNotificationMsg", {text:"Something went wrong, check the console for error details!", success: false})
                    throw new Error(error)
            } finally {
                dispatch("getPosts")
            }
        },
        async getPosts({commit, dispatch, state}) {   
            try{
                const response = await this.getPosts(state.currentPage, state.search)
                commit('SET_POSTS', response);
            }
            catch(error) {
                await dispatch("setNotificationStatus")
                await dispatch("setNotificationMsg", "Something went wrong fetching the data, check the console for error details!")
                throw new Error(error)
            }
        },
        async getPost({commit}, id) {
            const post = await this.getPost(id)
            commit('SET_POST_DETAIL', post)
        },
        async updatePosts({dispatch}, posts) {
            try {
                const response = await this.setPosts(posts)

                if (response.status === 200 || response.status === 201 || response.status === 204) {
                    dispatch("setNotificationMsg", {text: "Post Updated Successfully!", success: true})
                }  
            } catch(error) {
                    dispatch("setNotificationMsg", {text:"Something went wrong, check the console for error details!", success: false})
                    throw new Error(error)
            } finally {
                dispatch("modalToggle")
            }
            
        },
        async createNewPost({dispatch}, posts) {
            try {
                const response = await this.createNewPost(posts)

                if (response.status === 200 || response.status === 201 || response.status === 204) {
                    dispatch("setNotificationMsg", {text: "Post Created Successfully!", success: true})
                    dispatch("getPosts")
                } else {
                    throw new Error("Unsuccessfull")
                }   
            } catch(error) {
                dispatch("setNotificationMsg", {text:"Something went wrong, check the console for error details!", success: false})
            } finally {
                dispatch("modalToggle")
            }
            
        },
        setPosts({commit}, posts) {
            commit("SET_POSTS", posts)
        },
        setPostDetail({commit}, post) {
            commit("SET_POST_DETAIL", post)
        },
        setCurrentPage({commit}, page) {
            commit("SET_CURRENT_PAGE", page)
        },
        setSearch({commit, dispatch}, search){
            commit("SET_SEARCH", search)
            dispatch("getPosts")
        },
        setFilteredPosts({commit}, filteredPosts){
            commit("SET_FILTERED_POSTS", filteredPosts)
        }
    },
    mutations: {
        SET_POST_DETAIL(state, data) {
            state.postDetail = data
        },
        SET_POSTS(state, data) {
            state.posts = data;
        },
        SET_CURRENT_PAGE(state, data) {
            state.currentPage = data
        },
        SET_SEARCH(state, data) {
            state.search = data
        },
        SET_FILTERED_POSTS(state, data) {
            state.filteredPosts = data
        }
    }
}

