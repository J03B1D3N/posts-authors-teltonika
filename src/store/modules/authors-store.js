export default {    
    state: {
        authors: [],
        author: null
    },
    getters: {
        authors: state => state.authors,

        getAuthorById: (state) => (id)  => {
            try {
                return state.authors.find(author => author.id === id).name
            }
            catch(error){
                return error
            }
        },

        getAuthorNameById: (state) => (id)  => {
            try {
                return state.authors.find(author => author.id === id).name
            }
            catch(error){
                return error
            }
            
        },
        getAuthorIdByName: (state) => (name)  => {
            try {
                return state.authors.find(author => author.name === name).id
            }
            catch(error){
                return error
            }g
            
        }
    },
    actions: {
        async getAuthors({commit }) {
            const authors = await this.getAuthors()
            commit('SET_AUTHORS', authors);
        },
    },
    mutations: {
        SET_AUTHORS(state, authors) {
            state.authors = authors;
        },
        SET_AUTHOR(state, author) {
            state.author = author
        }
    }
}