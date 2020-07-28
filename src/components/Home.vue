<template>
    <div>
        HomePage<br/>
        <a href="#" @click="signout">登出</a><br/>
        <router-link to="/dashbord">DashBord</router-link><br/>
        <router-link to="/login">Login</router-link>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        signout(){
            firebase.auth().signOut()
            .then((res)=>{
                this.$router.push("/login");
            })
        }
    },
}
</script>

<style lang="">
    
</style>