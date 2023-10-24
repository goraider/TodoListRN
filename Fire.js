import * as firebase from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBB78d8h_npkSKsApMvJTdcF5_L-x4h55s",
    authDomain: "attodoapp.firebaseapp.com",
    projectId: "attodoapp",
    storageBucket: "attodoapp.appspot.com",
    messagingSenderId: "67245267423",
    appId: "1:67245267423:web:c4b65d8401ef507dec4c6a"
};


class Fire {
    constructor(callback){
        this.init(callback)
    }

    init( callback ){
        if( !firebase.getApps.length ){
            firebase.initializeApp(firebaseConfig);
        }
        //apps.length

        const auth = getAuth();

        
        onAuthStateChanged(auth, (user) => {
            if( user ){
                callback(null, user);
                
            } else {
                signInAnonymously(auth)
                    .then(() => {
                        
                    })
                    .catch(error => {
                        callback(error);
                    });
            }
        });
    }

    async getLists(callback) {

        const app = firebase.initializeApp(firebaseConfig);
        const db = getFirestore(app);

        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
        ///2F1A4U2UQQRVZlRYdJuWYRukn9UtG3/lists

    }

    get userId() {

        return getAuth().currentUser.uid;
    }

}


export default Fire;