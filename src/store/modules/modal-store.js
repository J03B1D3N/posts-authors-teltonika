export default {
    state: {
        modalStatus: false,

        notificationMsg: {},
        notificationStatus: false,

        currentComponent: "",

        confirmationMsgStatus: false,
        confirmationMsg: "",
    },
    getters: {
        modalStatus: state => state.modalStatus,
        
        notificationMsg: state => state.notificationMsg,
        notificationStatus: state => state.notificationStatus,

        currentComponent: state => state.currentComponent,

        getConfirmationMsgStatus: state => state.confirmationMsgStatus,
        getConfirmationMsg: state => state.confirmationMsg,
    },
    actions: {
        
        modalToggle({commit }) {
            commit('SET_MODAL_STATUS');
        },
        
        async setNotificationStatus({commit}) {
            commit('SET_NOTIFICATION_STATUS', true);
            setTimeout(() => {
                commit("SET_NOTIFICATION_STATUS", false)
            }, 2000)
        },
        setNotificationMsg({commit, dispatch}, msg) {
            let obj = {
                text: "",
                color: ""
            }
            obj.text = msg.text
            if(msg.success === true) {
                obj.color = "rgb(90, 216, 90)"
            } else {
                obj.color = "rgb(255, 117, 117)"
            }
            commit("SET_NOTIFICATION_MSG", obj)
            dispatch("setNotificationStatus")
        },
        setConfirmationMsgStatus({commit}, status) {
            commit("SET_CONFIRMATION_MSG_STATUS", status)
        },
        setConfirmationMsg({commit}, msg) {
            commit("SET_CONFIRMATION_MSG", msg)
        },
        setCurrentComponent({commit}, component) {
            commit("SET_CURRENT_COMPONENT", component) 
        },
        closeConfirmationPopUp({dispatch}) {
             dispatch("setConfirmationMsgStatus", false)
             dispatch("setConfirmationMsg", {})
        },
    },
    mutations: {
        SET_MODAL_STATUS(state) {
            state.modalStatus =  !state.modalStatus;
        },
        SET_NOTIFICATION_STATUS(state, status) {
            state.notificationStatus = status
        },
        SET_NOTIFICATION_MSG(state, msg) {
            state.notificationMsg = msg
        },
        SET_NOTIFICATION_COLOR(state, color) {
            state.notificationColor = color
        },
        SET_EDIT_STATUS(state, status) {
            state.edit = status
        },
        SET_CREATE_STATUS(state, status) {
            state.create = status
        },
        SET_CONFIRMATION_MSG_STATUS(state, status) {
            state.confirmationMsgStatus = status
        },
        SET_CONFIRMATION_MSG(state, msg) {
            state.confirmationMsg = msg
        },
        SET_CURRENT_COMPONENT(state, component) {
            state.currentComponent = component
        }
    }
}