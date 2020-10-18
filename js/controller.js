const controller = {}

// 
controller.initAuth = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            view.setActiveScreen('chat');
        } else {
            view.setActiveScreen('login')
        }
    })
}

controller.register = async function (registerValue) {
    try {
        let registerInfo = {
            displayName: registerValue.firstName + ' ' + registerValue.lastName,
            photoURL: 'https://www.lycatv.tv/img/web/avatar_1.png',
            email: registerValue.email
        }
        await firebase.auth().createUserWithEmailAndPassword(registerValue.email, registerValue.password);
        await firebase.auth().currentUser.updateProfile({
            displayName: registerInfo.displayName,
            photoURL: registerInfo.photoURL
        })
        view.setActiveScreen('chat');
        firebase.firestore().collection('users').add(registerInfo);
    } catch (error) {
        console.log('register error', error)
    }
}

controller.login = function (loginValue) {
    firebase.auth().signInWithEmailAndPassword(loginValue.email, loginValue.password)
        .catch(function (error) {
            var errorCode = error.code;
            console.log(errorCode)
        });
}

controller.generateMessage = function(messageForm) {
    if (messageForm.message.value) {
        let message = {};
    
        message.content = messageForm.message.value;
        message.createAt = new Date();
        message.sender = firebase.auth().currentUser.email;
        view.previewMessage(message);
        model.addMessage(message)
    }
}
