<template>
    <v-app class="main">
        <v-navigation-drawer v-model="drawer" class="px-6 py-4 scrollbar navbar">
            <div app style="display: flex; align-items: center;">
                <img class="image_circle user_icon" :src="updateUserImage()" @click="draw(drawer)">
                <v-app-bar-title class="font-weight-bold sidevar_name">{{ userStore.user.items.name }}</v-app-bar-title>
            </div>
            <div style="display: flex; align-items: center;">
                <router-link to="/follow/following" class="router-link">
                    <v-list-subheader>{{ following }} Following</v-list-subheader>
                </router-link>
                <router-link to="/follow/followers" class="router-link">
                    <v-list-subheader>{{ followers }} Followers</v-list-subheader>
                </router-link>
            </div>
            <v-list>
                <v-list-item
                    key="profile"
                    value="profile"
                    color="primary"
                    rounded="xl"
                    to="/profile/main"
                    @click.stop="drawChannel(false)"
                >
                    <template v-slot:prepend>
                        <v-icon icon="mdi-account"></v-icon>
                    </template>
                    <v-list-item-title>{{ "Profile" }}</v-list-item-title>
                </v-list-item>
                <v-list-group
                    color="primary"
                    value="Search"
                >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            title="Search"
                            rounded="xl"
                            prepend-icon="mdi-magnify"
                            @click.stop="drawChannel(false)"
                        ></v-list-item>
                    </template>
                    <v-list-item
                        key="user_search"
                        title="User"
                        prepend-icon="mdi-account"
                        value="SearchUser"
                        color="primary"
                        rounded="xl"
                        to="/search/searchUser"
                        @click.stop="drawChannel(false)"
                    ></v-list-item>
                    <v-list-item
                        key="room_search"
                        title="Room"
                        prepend-icon="mdi-comment-text-outline"
                        value="SearchRoom"
                        color="primary"
                        rounded="xl"
                        to="/search/searchRoom"
                        @click.stop="drawChannel(false)"
                    ></v-list-item>
                </v-list-group>
                <v-list-group
                    color="primary"
                    value="Chart"
                >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                        v-bind="props"
                        title="Chart"
                        rounded="xl"
                        prepend-icon="mdi-chart-bar-stacked"
                        @click.stop="drawChannel(false)"
                        ></v-list-item>
                    </template>
                    <v-list-item
                        v-for="(game, i) in gameListHandler()"
                        :key="i"
                        :title="game.title"
                        :prepend-icon="game.icon"
                        :value="game.title"
                        color="primary"
                        rounded="xl"
                        :to="game.to"
                        @click.stop="drawChannel(false)"
                    ></v-list-item>
                </v-list-group>
                <v-list-group
                    color="primary"
                    value="Room"
                >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                        v-bind="props"
                        title="Room"
                        rounded="xl"
                        prepend-icon="mdi-comment-text-outline"
                        @click.stop="drawChannel(false)"
                        ></v-list-item>
                    </template>
                    <v-list-item
                        v-for="(room, i) in roomListHandler()"
                        :key="i"
                        :title="room.title"
                        :prepend-icon="room.icon"
                        :value="room.title"
                        color="primary"
                        rounded="xl"
                        :to="room.to"
                        @click.stop="getChannelList(room.roomKey)"
                    ></v-list-item>
                    <v-list-item
                        title="Join"
                        prepend-icon="mdi-account-check"
                        value="Join"
                        color="primary"
                        rounded="xl"
                        to="/room/join"
                        @click.stop="drawChannel(false)"
                    ></v-list-item>
                    <v-list-item
                        title="New"
                        prepend-icon="mdi-plus-box"
                        value="New"
                        color="primary"
                        rounded="xl"
                        to="/room/create"
                        @click.stop="drawChannel(false)"
                    ></v-list-item>
                </v-list-group>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :value="item"
                    color="primary"
                    rounded="xl"
                    :to="item.to"
                    @click.stop="drawChannel(false)"
                >
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
                <v-list-item
                    v-if="checkUser()"
                    to="/login"
                    class="py-3"
                    color="primary"
                    rounded="xl"
                >
                    <template v-slot:prepend>
                        <v-icon>mdi-login</v-icon>
                    </template>
                    <v-list-item-title>Login</v-list-item-title>
                </v-list-item>
                <v-list-item
                    v-else
                    @click="logoutHandler()"
                    class="py-3"
                    color="primary"
                    rounded="xl"
                >
                    <template v-slot:prepend>
                        <v-icon>mdi-login</v-icon>
                    </template>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- channel -->
        <v-navigation-drawer v-model="channelDrawer" class="px-6 py-4 scrollbar navbar" :location="channelNavPosition()">
            <v-list>
                <v-list-group
                    color="primary"
                    value="Text"
                >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                        v-bind="props"
                        title="Text"
                        rounded="xl"
                        prepend-icon="mdi-message-reply-text"
                        ></v-list-item>
                    </template>
                    <v-list-item
                        v-for="(channel, i) in textChannelListHandler()"
                        :key="i"
                        :title="channel.title"
                        :prepend-icon="channel.icon"
                        :value="channel.title"
                        color="primary"
                        rounded="xl"
                        :to="channel.to"
                    ></v-list-item>
                </v-list-group>
                <!--
                <v-list-group
                    color="primary"
                    value="Voice"
                >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                        v-bind="props"
                        title="Voice"
                        rounded="xl"
                        prepend-icon="mdi-microphone-settings"
                        ></v-list-item>
                    </template>
                    <v-list-item
                        v-for="(channel, i) in voiceChannelListHandler()"
                        :key="i"
                        :title="channel.title"
                        :prepend-icon="channel.icon"
                        :value="channel.title"
                        color="primary"
                        rounded="xl"
                        :to="channel.to"
                    ></v-list-item>
                </v-list-group>
                -->

                <v-list-item
                    title="New"
                    prepend-icon="mdi-plus-box"
                    value="New"
                    color="primary"
                    rounded="xl"
                    :to="'/channel/' + activeRoomKey + '/create'"
                ></v-list-item>
                <v-list-item
                    title="User List"
                    prepend-icon="mdi-account"
                    value="UserList"
                    color="primary"
                    rounded="xl"
                    :to="'/room/' + activeRoomKey + '/userList'"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app flat>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <div class="center_icon">
                <v-btn icon class="center_icon_size">
                    <v-icon>mdi-vuejs</v-icon>
                </v-btn>
            </div>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-app-bar-nav-icon v-if="!$device.isDesktop" @click.stop="channelDrawer = !channelDrawer" />
        </v-app-bar>
        <v-main>
            <slot /> 
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { ref } from 'vue';
import ApiClient from '@/infra/api/apiClient';

import { FetchUser } from '@/domain/usecase/fetchUser';
import { FetchChannel } from '@/domain/usecase/fetchChannel';
import { FetchFollow } from '@/domain/usecase/fetchFollow';

import { useUserStore } from '@/store/user/user';
import { useListRoomStore } from '@/store/room/listRoom';

import { ListChannel } from "@/domain/entity/channel/listChannel"
import { User } from '@/domain/entity/user/user';
import { CountFollowingAndFollowers } from '@/domain/entity/follow/countFollowingAndFollowers';

import { useListChannelStore } from '@/store/channel/listChannel';
import { useListOpenChatStore } from '@/store/openChat/listOpenChat';
import { useListRoomChatStore } from '@/store/roomChat/listRoomChat';
import { useListChannelChatStore } from '@/store/channelChat/listChannelChat';
import { useListGameScoreStore } from '@/store/game/listGameScore';
import { useListGameUserStore } from '@/store/game/listGameUser';

export default {
    data() {
        return {
            userStore: useUserStore(),
            listRoomStore: useListRoomStore(),
            listChannelStore: useListChannelStore(),
            listOpenChatStore: useListOpenChatStore(),
            listRoomChatStore: useListRoomChatStore(),
            listChannelChatStore: useListChannelChatStore(),
            listGameScoreStore: useListGameScoreStore(),
            listGameUserStore: useListGameUserStore(),
            following: 0,
            followers: 0,
            drawer: true,
            channelDrawer: false,
            activeRoomKey: "",
            activePath: "",
            items: [
                { title: 'Timeline', icon: 'mdi-forum-outline', to: '/' },
                { title: 'Message', icon: 'mdi-email-outline', to: '' },
            ],
        };
    },
    mounted() {
        if (this.activePath == "room") {
            this.channelDrawer = true
        }
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
        // チャンネルメニュー表示
        channelNavPosition() {
            if (this.$device.isDesktop) {
                return "left"
            } else {
                return "right"
            }
        },
        // フォロー数とフォロワー数を取得する
        async getFollowCount() {
            const userKey = this.userStore.user.items.user_key
            if (userKey != "") {
                const fetchFollow = new FetchFollow(ApiClient);
                const countFollowingAndFollowers: CountFollowingAndFollowers = await fetchFollow.countFollowingAndFollowers(userKey);

                this.following = countFollowingAndFollowers.items.following_count;
                this.followers = countFollowingAndFollowers.items.followers_count;                
            }
        },
        // チャンネル一覧を取得する
        async getChannelList(roomKey: string) {
            this.activeRoomKey = roomKey
            this.drawChannel(true)

            const userKey = this.userStore.user.items.user_key
            const fetchChannel = new FetchChannel(ApiClient);
            const listChannel: ListChannel = await fetchChannel.listChannel(userKey, roomKey);

            try {
                this.listChannelStore.update(listChannel);
            } catch (error) {}
        },
        // textチャンネル一覧を表示
        textChannelListHandler() {
            const channel = this.listChannelStore.listChannel.items.list
            const channelList = [];

            for (let i = 0; i < channel.length; i++) {
                if (channel[i].type == "text") {
                    channelList.push({
                        channelKey: channel[i].channel_key,
                        title: channel[i].name,
                        icon: 'mdi-account-group',
                        to: '/channel/' + channel[i].channel_key + '/main#scroll',
                    });                    
                }
            }

            return channelList;
        },
        // voiceチャンネル一覧を表示
        voiceChannelListHandler() {
            const channel = this.listChannelStore.listChannel.items.list
            const channelList = [];

            for (let i = 0; i < channel.length; i++) {
                if (channel[i].type == "voice") {
                    channelList.push({
                        channelKey: channel[i].channel_key,
                        title: channel[i].name,
                        icon: 'mdi-account-group',
                        to: '/channel/' + channel[i].channel_key + '/main#scroll', // scroll: 画面下部にスクロールさせる 
                    });                    
                }
            }

            return channelList;
        },
        draw() {
            this.channelDrawer = false
            this.drawer = !this.drawer
        },
        drawChannel(d: boolean) {
            // PCの時
            if (this.$device.isDesktop) {
                if (d) {
                    this.channelDrawer = true
                } else {
                    this.channelDrawer = false
                }
            }
        },
        // ログインチェック
        checkUser() {
            let status: boolean = false
            if (this.userStore.user.items.name == "") {
                status = true
            }
            
            return status
        },
        // ルーム一覧を表示
        roomListHandler() {
            const list = this.listRoomStore.listRoom.items.list
            const listRoom = [];

            for (let i = 0; i < list.length; i++) {
                listRoom.push({
                    roomKey: list[i].room_key,
                    title: list[i].name,
                    icon: 'mdi-account-group',
                    to: '/room/' + list[i].room_key + '/main#scroll', // scroll: 画面下部にスクロールさせる 
                });
            }

            return listRoom;
        },
        // 連携ゲーム一覧を表示
        gameListHandler() {
            const list = this.listGameUserStore.listGameUser.items.list
            const listGame = [];

            for (let i = 0; i < list.length; i++) {
                listGame.push({
                    gameKey: list[i].game_key,
                    title: list[i].game_title,
                    icon: 'mdi-gamepad',
                    to: '/game/' + list[i].game_key + '/score', // scroll: 画面下部にスクロールさせる 
                });
            }

            return listGame;
        },
        // ログアウト
        logoutHandler() {
            this.channelDrawer = false

            const userKey: string = this.userStore.user.items.user_key;

            const fetchUser = new FetchUser(ApiClient);
            const user = ref<User | null>(null);
            user.value = fetchUser.logoutUser(userKey);

            // storeを初期化
            this.userStore.delete();
            this.listRoomStore.delete();
            this.listChannelStore.delete();
            this.listOpenChatStore.delete();
            this.listRoomChatStore.delete();        
            this.listChannelChatStore.delete();
            this.listGameScoreStore.delete();

            useRouter().push('/login');
        }
    }
};
</script>

<style lang="scss" scoped>
.main {
    background: #eeebeb;
}

.center_icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.center_icon_size {
  font-size: 25px;
}

img.user_icon {
    width: 55px;
    height: 55px;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    left: 5px;
}

v-list-item.login {
    background: #ffffff;
}

.sidevar_name {
    position: relative;
    left: 10px;
}

.scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar ::-webkit-scrollbar {
    display: none;
}

.navbar {
    box-shadow: none !important;
}
.router-link {
  text-decoration: none;
}
</style>
