const model = {
    conversation: null,
    activeConversationId: null,
}

model.loadConversations = function () {
    let conversations = firebase.firestore().collection('conversations')
        .where('users', 'array-contains', firebase.auth().currentUser.email)
        .onSnapshot(async function (querySnapshot) {
            let conversations = await Promise.all(querySnapshot.docs.map(async function (doc) {
                let conversation = {};
                let data = doc.data();
                conversation.targetEmail = data.users[0];
                if (conversation.targetEmail === firebase.auth().currentUser.email) {
                    conversation.targetEmail = data.users[1];
                }

                conversation.lastMessage = data.messages[data.messages.length - 1];
                conversation.id = doc.id;

                let userConversation = await firebase.firestore().collection('users').where('email', '==', conversation.targetEmail).get()
                conversation.thumb = userConversation.docs[0].data().photoURL;
                conversation.name = userConversation.docs[0].data().displayName;
                return conversation
            }));
            view.showConversations(conversations);
        });

}

model.setActiveConversation = async function (id) {
    model.activeConversationId = id;
    firebase.firestore().collection('conversations').doc(id)
        .onSnapshot(async function (conversation) {
            messages = conversation.data().messages
            messages = await Promise.all(messages.map(async function (message) {
                //get message image
                let senderInfo = await firebase.firestore().collection('users').where('email', '==', message.sender).get();
                senderInfo = senderInfo.docs[0].data();
                message.sender = {
                    email: message.sender,
                    name: senderInfo.displayName,
                    photoURL: senderInfo.photoURL
                }
                //convert message time
                let dateHours = model.convertTime(message.createAt.toDate());
                message.createAt = dateHours;
                return message
            }))
            view.showMessage(messages)
        })

}

model.addMessage = function (message) {
    firebase.firestore().collection('conversations')
        .doc(model.activeConversationId).update({
            messages: firebase.firestore.FieldValue.arrayUnion(message)
        })
}

model.convertTime = function (date) {
    let dateMinutes = date.getMinutes();
    if (dateMinutes < 10) {
        dateMinutes = '0' + dateMinutes;
    }
    let dateHours = date.getHours();
    if (dateHours > 12) {
        dateHours = (dateHours - 12) + ':' + dateMinutes + ' PM'
    } else {
        dateHours += ':' + dateMinutes + ' AM'
    }
    return dateHours;
}

model.deleteMessage = async function(conversationId, messageId) {
    let conversationRef = firebase.firestore().collection('conversations').doc(conversationId);
    let conversation = await conversationRef.get();
    let messages = conversation.data().messages
    conversationRef.update({
        messages: firebase.firestore.FieldValue.arrayRemove(messages[messageId])
    })
    // console.log(message.data())
}