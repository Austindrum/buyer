<template>
    <div>
        <router-link to="/dashbord">DashBord</router-link><br/>
        <router-link to="/">Home</router-link>
        <form class="form-signin" @submit.prevent="signin">
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.email" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password" required>
            <div class="checkbox mb-3">
                <label>
                <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
        </form>
    </div>
</template>

<script>
import db from '../../firebaseApp'
import firebase from 'firebase'
import { mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {
            user:{
                email: "",
                password: ""
            },
        }
    },
    methods: {
      signin(){
        firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(user=>{
          this.$router.push('/dashbord');
        })
        .catch(err=>{
          this.user.email = "";
          this.user.password = "";
          alert(err.message);
        })
      }
    },
}
</script>

<style lang="scss">
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>