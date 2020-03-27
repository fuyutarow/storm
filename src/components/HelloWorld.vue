<template>
  <div>
    <template v-if="this.user">
      <img :src="this.user.photoURL" style="widborder-radius: 50%; width:50px;" />
      <button @click="signout">logout</button>
      <hr />
      <div
        v-for="card in cards"
        :key="card.id"
        @click="focus(card)"
      >{{card.id}}:{{ card.data.content }}</div>
      <hr />
      <blockquote contenteditable="true">
        <p>Edit this content to add your own quote</p>
      </blockquote>
      <button @click="getList">getList</button>
      <span>Multiline message is:</span>
      <template v-if="currentCard">
        <span v-for="(part, key) in this.card2parts( this.currentCard )" :key="key">
          <span v-if="part.kind === 'plain'">{{ part.text }}</span>
          <span v-else>
            {{ part.url }}
            <iframe
              id="player"
              type="text/html"
              width="640"
              height="360"
              :src="part.url"
              frameborder="0"
            />
          </span>
          <!-- src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com" -->
        </span>
        <p style="white-space: pre-line;">{{ currentCard.data.content }}</p>
        <textarea v-model="currentCard.data.content" placeholder="add multiple lines"></textarea>
        <button @click="updateCard">update</button>
      </template>
    </template>
    <template v-else>
      <button @click="signin">login</button>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import firebase from "firebase/app";

type Card = {
  id: string;
  data: {
    title: string;
    content: string;
  };
};

type Plain = {
  kind: "plain";
  text: string;
};

type Youtube = {
  kind: "youtube";
  url: string;
};
type Part = Plain | Youtube;

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  currentCard: Card | null = null;
  cards: Array<Card> = [];

  card2parts(card: Card): Array<Part> {
    const arr: Array<Part> = card.data.content
      .split("https://www.youtube.com/watch?v=PcuY147VpnM")
      .flat()
      .map(text => {
        const plain: Plain = { kind: "plain", text: text };
        return plain;
      });
    const yturl = new URL("https://www.youtube.com/watch?v=PcuY147VpnM");
    const vid = yturl.searchParams.get("v");
    const youtube: Youtube = {
      kind: "youtube",
      url: `https://www.youtube.com/embed/${vid}`
    };
    arr.push(youtube);

    return arr;
  }

  get user() {
    return this.$store.state.user.detail;
  }

  focus(card: Card) {
    this.currentCard = card;
  }

  public async signin() {
    this.$store.dispatch("user/signin");
  }

  public async signout() {
    console.log("logout");
    this.$store.dispatch("user/signout");
  }

  async getList() {
    const collection = await this.$firestore.collection("cards").get();
    this.cards = collection.docs.map(
      doc =>
        ({
          id: doc.id,
          data: doc.data()
        } as Card)
    );
  }

  async updateCard() {
    const docRef = this.$firestore
      .collection("cards")
      .doc(this.currentCard?.id);
    await docRef.update({
      content: this.currentCard?.data.content
    });
  }

  //  async pushdb() {
  //    const u = await this.$auth.currentUser;
  //    console.log(u);
  //    // console.log(this.$store);
  //    const cardRef = await this.$firestore.collection("cards").add({
  //      title: "",
  //      content: this.cu
  //    });
  //    const card = await cardRef.get();
  //    console.log(card.data());
  //  }
}
</script>

