<template>
  <div>
    <template v-if="this.user">
      <img :src="this.user.photoURL" style="widborder-radius: 50%; width:50px;" />
      <button @click="signout">logout</button>
    </template>
    <template v-else>
      <button @click="signin">login</button>
    </template>
    <blockquote contenteditable="true">
      <p>Edit this content to add your own quote</p>
    </blockquote>
    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ text }}</p>
    <hr />
    <textarea v-model="text" placeholder="add multiple lines"></textarea>
    <button @click="pushdb">push</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import firebase from "firebase/app";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  text = "";

  get user() {
    return this.$store.state.user.detail;
  }

  public async signin() {
    this.$store.dispatch("user/signin");
  }

  public async signout() {
    console.log("logout");
    this.$store.dispatch("user/signout");
  }

  async pushdb() {
    const u = await this.$auth.currentUser;
    console.log(u);
    // console.log(this.$store);
    // const userRef = await this.$firestore.collection("cards").add({
    //   title: "OK",
    //   content: "okok"
    // });
    const id = "LtQKvwDnFOqEt3BMPy0F";
    const docRef = this.$firestore.collection("cards").doc(id);
    const doc = await docRef.get();
    const d = doc.data();
    console.log(d);
    // this.item = {
    //   id: doc.id,
    //   title: d.title,
    //   content: d.content
    // };

    //     const userDoc = await userRef.get();
    //     console.log(userDoc.data());
    //
    // const docId = "LtQKvwDnFOqEt3BMPy0F";
    // const docRef = this.$firestore.collection("cards").doc(docId);
    // const items = await docRef.get();
    // console.table(items);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
