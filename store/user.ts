import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: {
                userKey:  ref("unknown"),
                username: ref("unknown"),
                email:    ref("unknown"),
            },
        }
    },
    persist: true,
    getters: {
        double: (state) => {
            return state.user
        },
    },
    actions: {
        increment(user) {
            this.user = {
                userKey:  user.user_key,
                username: user.username,
                email:    user.email,
            }
        },
    },
})
