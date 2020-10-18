const view = {};

view.setActiveScreen = function (screenName) {
    let app = document.getElementById('app')
    switch (screenName) {
        case 'register': {
            app.innerHTML = components.register;


            let loginUrl = document.getElementById('loginUrl');
            let submitBtn = document.getElementById('register-btn');

            submitBtn.onclick = onRegister;
            loginUrl.onclick = onLogin;

            function onRegister(e) {
                e.preventDefault();
                let registerForm = document.getElementById('register-form');
                let registerValue = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value
                }
                controller.register(registerValue);
            }

            function onLogin() {
                view.setActiveScreen('login')
            }
            break
        }
        case 'login': {
            app.innerHTML = components.login;
            let registerUrl = document.getElementById('registerUrl');
            let loginForm = document.getElementById('login-form');
            let submitBtn = document.getElementById('login-btn')

            registerUrl.onclick = onRegister
            submitBtn.onclick = onSubmit

            function onSubmit(e) {
                e.preventDefault()
                loginValue = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                }
                controller.login(loginValue)
            }

            function onRegister() {
                view.setActiveScreen('register')
            }
            break
        }
        case 'chat': {
            app.innerHTML = components.chat;
            view.setImage('auth-user-ava', firebase.auth().currentUser.photoURL);
            view.setText('auth-user-name', firebase.auth().currentUser.displayName);
            view.setText('auth-user-email', firebase.auth().currentUser.email);
            model.loadConversations();
            let signOutBtn = document.getElementById('sign-out-btn');
            let conversationsBtn = document.getElementById('conversation-body');
            let messageForm = document.getElementById('message-form');

            signOutBtn.onclick = onSignOut;
            conversationsBtn.onclick = onConversation;
            messageForm.onsubmit = onSendMessage;


            function onSignOut() {
                firebase.auth().signOut()
            }

            function onConversation(e) {
                model.setActiveConversation(e.target.id)
                let activeConversationName = document.getElementById('active-conversation-name');
                let activeConversation = document.getElementById(e.target.id);
                activeConversation = activeConversation.getElementsByTagName('p')[0].innerText;
                activeConversationName.innerHTML = activeConversation;
            }

            function onSendMessage(e) {
                e.preventDefault();
                controller.generateMessage(messageForm);
                messageForm.message.value = ``;
            }

            break
        }
    }
}

view.setText = function (id, content) {
    document.getElementById(id).innerHTML = content
}

view.setImage = function (id, URL) {
    document.getElementById(id).src = URL
}

view.showConversations = function (conversations) {
    let ref = document.getElementById('conversation-body');
    conversations.sort(function(a, b) {
        return b.lastMessage.createAt.seconds - a.lastMessage.createAt.seconds
    })
    model.setActiveConversation(conversations[0].id);
    document.getElementById('active-conversation-name').innerText = conversations[0].name;
    ref.innerHTML = ``;

    for (let conversation of conversations) {
        ref.innerHTML += `
            <div class="conversation-item" id="${conversation.id}">
                <img src="${conversation.thumb}">
                <div>
                    <p class="conversation-item-name">${conversation.name}</p>
                    <p class="conversation-item-message">${conversation.lastMessage.content}</p>
                </div>
            </div>
        `
    }
}

view.showMessage = function (messages) {
    let chatContent = document.getElementById('chat-content');
    chatContent.innerHTML = '';
    for (let id in messages) {
        let sender = 'chatbox their';
        if (messages[id].sender.email === firebase.auth().currentUser.email) {
            sender = 'chatbox mine';
        }
        chatContent.innerHTML += `
            <div class="${sender}">
                <img src="${messages[id].sender.photoURL}" class="chatbox-thumb" id="messages">
                <p class="time-stamp" id="message-time">${messages[id].createAt}</p>
                <div class="chatbox-message-wrapper">
                    <p class="chatbox-message" id="message-content"> ${messages[id].content}</p>
                    <span class="deleteBtn" id="${id}">x</span>
                </div>
            </div>
        `
    };

    let messageCollection = document.getElementsByClassName('deleteBtn');
    view.addDeleteEvent(messageCollection);

    chatContent.scrollTop = chatContent.scrollHeight;
}

view.previewMessage = function (message) {
    let chatContent = document.getElementById('chat-content');
    photoURL = firebase.auth().currentUser.photoURL;
    dateHours = model.convertTime(message.createAt);
    chatContent.innerHTML += `
        <div class="chatbox mine">
            <img src="${photoURL}" class="chatbox-thumb" id="messages">
            <p class="time-stamp" id="message-time">${dateHours}</p>
            <div class="chatbox-message-wrapper">
                <p class="chatbox-message" id="message-content"> ${message.content}</p>
                <span class="deleteBtn">x</span>
            </div>
        </div>
    `
    chatContent.scrollTop = chatContent.scrollHeight;
}

view.addDeleteEvent = function(collection) {
    for (let item of collection) {
        item.onclick = function(e) {
            model.deleteMessage(model.activeConversationId, e.target.id)
        }
    }
}