import axios from "axios"

let authorsAPI = store => {
    store.getAuthors = async function() {
        try {
            const response = await axios.get("http://localhost:3000/authors")
            return response.data
        }
        catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }
    
    store.getAuthor = async function(id) {
        try {
            const response = await axios.get("http://localhost:3000/authors/" + id)
            return response.data
        }
        catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }
}

export default authorsAPI