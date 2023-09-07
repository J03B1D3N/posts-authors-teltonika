<template>
        <div class="post">

            <h1 class="title">
            {{post.title}}
            </h1>
            <h2 class="author">
                {{ getAuthorNameById(post.authorId) }}
            </h2>
            <h3 class="lastEdited">
                {{ laterDate(post) }}
            </h3>
            <div class="edit-delete">
                            <button class="edit" @click="handleEdit(post)" @click.prevent>EDIT</button>
                            <button class="delete" @click="handleDelete(post)" @click.prevent>DELETE</button>
            </div>
        </div>
</template>

<script>
import { mapGetters, mapActions} from "vuex";


    export default {
    name: 'Post',
    props: ['post'],
    computed: {
        
    ...mapGetters(["getAuthorNameById", "authors"]),
    },
    methods: {
        ...mapActions(["modalToggle","setPostDetail", "setConfirmationMsg", "setConfirmationMsgStatus", "setCurrentComponent"]),

        laterDate: function(post) {
            const date1 = new Date(post.created_at).getTime()
            const date2 = new Date(post.updated_at).getTime()
                if (date1 < date2) {
                return post.updated_at
            } else if (date1 > date2) {
                return post.created_at
            } else {
                return post.created_at
            }
        },
        handleEdit(post) {
            this.setPostDetail(post)
            this.setCurrentComponent("Edit")
            this.modalToggle()
        },
        handleDelete(post) {
            this.setConfirmationMsg({
                msg: "Do you really want to delete this post?",
                post: post
            })
            this.setConfirmationMsgStatus(true)
        }
        
    }
    }
    
</script>

<style scoped>
h1, h2, h3 {
    margin: 0.5rem;
}
.edit:hover {
    background-color: rgb(199, 199, 199);
    cursor: pointer;
}
.delete:hover {
    cursor: pointer;
    background-color: rgb(255, 35, 35);
}
.delete {
    background-color: rgb(255, 96, 96);
}
.edit, .delete {
    font-size: 1.5rem;
    border: 2px solid black;    
}
.edit-delete {
    display: flex;
    justify-content: space-around;
    margin: 1rem;
}

</style>