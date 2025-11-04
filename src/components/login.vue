<template>
  <div class="contentForm">
    <form>
      <h2>Login Page</h2>
      <Input :label="'Number'"
             :type="'text'"
             v-model="phone_number"
      />
      <Input :label="'password'"
             :type="'text'"
             v-model="password"
      />
      <Button type="submit" @click="submitLogin">Login</Button>
    </form>
  </div>
</template>

<script setup>
import Input from "../ui-component/Input.vue";
import Button from "../ui-component/Button.vue";
</script>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return{
      phone_number: "",
      password: "",
    }
  },
  methods:{
    submitLogin(e){
      e.preventDefault()
      axios.post("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin",
          {phone_number: this.phone_number, password: this.password},
      )
          .then((res) => {
            let data = res.data
            console.log(data?.data)
            this.$router.push("/hello")
          })

    }
  }
}
</script>
<style scoped>
.contentForm{
  width: 500px;
  height: 550px;
  margin: 50px auto;
  padding: 20px;
  form{
    border-radius: 8px;
    height: 400px;
    width: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 5px 10px;
    background-color: white;
  }
}
</style>