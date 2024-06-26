<template>
    <v-row>
        <v-col cols="12">
            <v-card flat align-content="center">
                <v-container>
                    <v-row>
                        <v-col cols="12" align-content="center">
                            <div class="user_info">
                                <img class="user_icon" :src="updateUserImage()" alt="UserIcon">
                                <h2 class="user_name">{{ userStore.user.items.name }}</h2>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <router-link to="/follow/following" class="router-link link">
                                    <v-list-subheader>{{ following }} Following</v-list-subheader>
                                </router-link>
                                <router-link to="/follow/followers" class="router-link link">
                                    <v-list-subheader class="link">{{ followers }} Followers</v-list-subheader>
                                </router-link>
                            </div>
                        </v-col>
                        <v-col cols="12" align-content="center">
                            <div class="user_info">
                                {{ userStore.user.items.description }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="4">
                            <v-btn flat block variant="outlined" color="primary" to="/profile/editProfile">Edit</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>        
        </v-col>   
        <v-col cols="12" sm="4" v-for="item in gameItems">
            <v-card class="game_card" flat>
                <router-link :to="item.to">
                    <img class="game_image" :alt="item.gameTitle" :src="item.gameImagePath">                  
                </router-link>
            </v-card>
        </v-col>          
    </v-row>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user/user';
import { FetchGame } from '@/domain/usecase/fetchGame';
import { FetchFollow } from '@/domain/usecase/fetchFollow';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            following: 0,
            followers: 0,
            gameItems: [],
            userStore: useUserStore(),
        };
    },
    mounted() {
        this.getGameList();
    },
    methods: {
        updateUserImage() {
            const config = useRuntimeConfig();
            const userKey = this.userStore.user.items.user_key
            var userImage = `${config.public.GcImageUrl}/image/get?image_path=static/images/user/noimage_icon.png`
            if (userKey != "") {
                userImage = `${config.public.GcImageUrl}/image/get?image_path=static/images/user/${userKey}.png`
            }

            // フォロー数
            this.getFollowCount();

            return userImage
        },
        async getGameList() {
            const userKey = this.userStore.user.items.user_key
            const fetchGame = new FetchGame(ApiClient);
            const listGameUser = await fetchGame.listGameUser(userKey);

            if (listGameUser.items.list != null) {
                const config = useRuntimeConfig();
                for (const game of listGameUser.items.list) {
                    const data = {
                        gameKey:       game.game_key,
                        gameTitle:     game.game_title,
                        gameImagePath: `${config.public.GcImageUrl}/image/get?image_path=static/images${game.game_image_path}`,
                        to:            `/game/${game.game_key}/score`
                    };
                    
                    this.gameItems.push(data);
                }                
            }
        },
        async getFollowCount() {
            const userKey = this.userStore.user.items.user_key
            if (userKey != "") {
                const fetchFollow = new FetchFollow(ApiClient);
                const countFollowingAndFollowers: CountFollowingAndFollowers = await fetchFollow.countFollowingAndFollowers(userKey);

                this.following = countFollowingAndFollowers.items.following_count;
                this.followers = countFollowingAndFollowers.items.followers_count;                
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}

.user_info {
    display: flex;
    align-items: center;
}

.user_icon {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    position: relative;
    object-fit: cover;
}

.user_name {
    font-weight: bold;
    margin: 10px;
}

.carousel-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 0px 0px 0px;
}

.game_card {
    height: 100%;
}

.game_title {
    color: rgb(163, 163, 163);
}
.game_image {
    width: 100%;
    height: 100%;
}
</style>
