import firebase from 'firebase/app';
import "firebase/auth";



const register = (email, password) => {
    console.log('registering');
    const status = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            return {
                user,
                'status': 0
            };
        })
        .catch((error) => {
            return {
                error,
                'status': 1
            };
        })
    return status;
}

const signIn = (email, password) => {
    const status = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            return {
                user,
                'status': 0
            };
        })
        .catch((error) => {
            return {
                error,
                'status': 1
            };
        })
    return status;
}

export { register, signIn };

