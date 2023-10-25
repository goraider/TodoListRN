import * as firebase from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


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
            initializeApp(firebaseConfig);
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

        const querySnapshot = await getDocs(collection(db, "/users", "/1A4U2UQQRVZlRYdJuWYRukn9UtG3", "/lists"));
        
        lists = [];

        querySnapshot.forEach(doc => {

            lists.push({ id: doc.id, ...doc.data() });
            
        });

        if(callback){

            callback(lists);
        }
        
        
    }

    get userId() {

        return getAuth().currentUser.uid;
    }

    datach() {
        this.unsubscribe;
    }

}


export default Fire;