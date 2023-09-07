import axios from "axios"

let postsAPI = store => {

    store.getPosts = async function(page, query) {
        
        page = page ?? 1
        try {
            const response = await axios.get(`http://localhost:3000/posts?_page=${page}&_limit=${POSTS_PER_PAGE}&q=${query}`)
            let data = { data: response.data, total: parseInt(response.headers['x-total-count'])}
            return data 
        }
        catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }
    
    store.getPost = async function(id) {
        try {
            const response = await axios.get("http://localhost:3000/posts/" + id)
            return response.data
        }
        catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }
    store.setPosts = async function(post) {
        try {
            const response = await axios.put(`http://localhost:3000/posts/${post.id}`, post)
            return response
        }
        catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }
    store.createNewPost = async function(post) {
        try {
            const response = await axios.post(`http://localhost:3000/posts`, post)
            return response
        }
        catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }
    store.deletePost = async function(post) {
        try {
            const response = await axios.delete(`http://localhost:3000/posts/${post.id}`, post)
            return response
        }
        catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }   
}
export default postsAPI