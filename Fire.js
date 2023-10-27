import * as firebase from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, onSnapshot, doc } from 'firebase/firestore';


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

        if( firebase.getApps().length === 0 ){
            const app = initializeApp(firebaseConfig);
            initializeAuth(app, {
                persistence: getReactNativePersistence(ReactNativeAsyncStorage)
            });
        }else{
            firebase.getApp();
        }
        //apps.length

        const auth = getAuth();
        
        onAuthStateChanged(auth, (user) => {
            if( user ){
                callback && callback(null, user);
                
            } else {
                signInAnonymously(auth)
                    .then(() => {
                        
                    })
                    .catch(error => {
                        callback && callback(error);
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

            callback && callback(lists);
        
        
    }

    async addList(list) {

        const app = firebase.initializeApp(firebaseConfig);
        const db = getFirestore(app);
        await addDoc(collection(db, "/users", "/1A4U2UQQRVZlRYdJuWYRukn9UtG3", "/lists"), list);
    }

    async updateList(list){

        console.log("acaaaaaaaaaaaa",list.id);

        const app = firebase.initializeApp(firebaseConfig);
        const db = getFirestore(app);

        const ref = doc(db, "/users", "/1A4U2UQQRVZlRYdJuWYRukn9UtG3", "/lists", list.id);

        console.log("traaaeerrr",ref);

        await updateDoc(ref, {
            list
        });

    }

    get userId() {

        return getAuth().currentUser.uid;
    }

    get datach() {

        const unsub = collection("/users", "/1A4U2UQQRVZlRYdJuWYRukn9UtG3", "/lists").onSnapshot(querySnapshot => {
            console.log(querySnapshot);
        });

        return unsub;
    }

}


export default Fire;