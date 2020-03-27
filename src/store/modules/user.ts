import {
  VuexModule, Mutation, Action, Module, getModule, MutationAction,
} from 'vuex-module-decorators';
import firebase from 'firebase/app';
import 'firebase/firestore';

const authFirebase = async () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  const google = new firebase.auth.GoogleAuthProvider();
  return await firebase
    .auth()
    .signInWithPopup(google)
    .then((result: any) => {
      // token = result.credential.accessToken;
      // user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
};


@Module({namespaced: true})
export default class User extends VuexModule {
  public detail: firebase.User | null = null;
  public token = "";

  @Mutation
  public setUser(user: firebase.User | null) {
    this.detail = user;
  }

  @MutationAction({mutate: ['detail', 'token']})
  public async signin() {
    await authFirebase();
    const detail: firebase.User | null = await firebase.auth().currentUser;
    const token: string = await firebase.auth().currentUser!.getIdToken(true);
    return {detail, token};
  }

  @MutationAction({mutate: ['detail', 'token']})
  public async signout() {
    await firebase.auth().signOut();
    return {detail: null, token: ""}
  }
}
