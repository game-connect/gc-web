<template>
    <v-container>
       <v-row align-content="center">
           <v-col cols="12" align-content="center">
               <MyProfile />
           </v-col>
       </v-row>
    </v-container>
</template>

<script lang="ts">
import MyProfile from "@/components/Profile/MyProfile.vue";

export default {
    components: {
        MyProfile,
    },
};
</script>
