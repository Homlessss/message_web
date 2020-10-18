const components = {};

components.register = `
<section class="register-wrapper">
    <div class="form-wrapper">
        <form action="" class="register-form" id="register-form">
            <img src="../img/logo.png" alt="">
            <div class="name-wrapper">
                <div class="first-name">
                    <input type="text" name="firstName" placeholder="First Name" required>
                    <div class="error" id="error-first-name"></div>
                </div>
                <div class="last-name">
                    <input type="text" name="lastName" placeholder="Last Name" required>
                    <div class="error" id="error-last-name"></div>
                </div>
            </div>
            <div class="email">
                <input type="email" name="email" placeholder="Email" required>
                <div class="error" id="error-email"></div>
            </div>
            <div class="password">
                <input type="password" name="password" placeholder="Password" required>
                <div class="error" id="error-password"></div>
            </div>
            <div class="confirm-password">
                <input type="password" name="confirmPassword" placeholder="Confirm password" required>
                <div class="error" id="error-confirm-password"></div>
            </div>
            <button class="registerBtn" id="register-btn">Register</button>
            <p class="loginUrl">Already have an account? <a href="#" id="loginUrl">Log in</a></p>
        </form>
    </div>
</section>
`
components.login = `
<section class="register-wrapper">
    <div class="form-wrapper">
        <form action="" class="register-form" id="login-form">
            <img src="../img/logo.png" alt="">
            <div class="email">
                <input type="text" name="email" placeholder="Email">
                <div class="error"></div>
            </div>
            <div class="password">
                <input type="password" name="password" placeholder="Password">
                <div class="error"></div>
            </div>
            <button class="registerBtn" id="login-btn">Login</button>
            <p class="loginUrl">Don't have a free account yet? <a href="#" id="registerUrl">Register</a></p>

        </form>
    </div>
</section>
`

components.chat = `
<div class="chat-wrapper">

    <div class="sidebar">
        <div class="my-profile">
            <img src="" alt="Profile Avatar" id="auth-user-ava">
            <div class="info">
                <div class="auth-user-name">
                    <div>
                        <p id="auth-user-name"></p>
                        <img src="../img/arrowIcon.png" class="arrow-icon">
                    </div>
                    <ul class="sidebar-nav">
                        <li>Setting</li>
                        <li>Help</li>
                        <li id="sign-out-btn">Sign Out</li>
                    </ul>
                </div>
                <p id="auth-user-email"></p>
            </div>
        </div>
        <div class="search-conversation">
            <input type="text" placeholder="Search conversation...">
            <img src="../img/searchIcon.png">
        </div>
        <div class="conversations">
            <div class="conversations-header">
                <div>RECENT CHATS <img src="../img/arrowIcon.png"></div>
                <div>+</div>
            </div>
            <div class="conversations-body" id="conversation-body">

            </div>
        </div>
    </div>

    <div class="header">
        <div class="header-info">
            <h1 id="active-conversation-name"></h1>
            <p>Active 1h ago</p>
        </div>
        <div class="header-btn">
            <a><img src="../img/call-icon.png"></a>
            <a><img src="../img/headerSettingBtn.png"></a>
        </div>
    </div>

    <div class="chat-content">
        <div class="chat-content-wrapper" id="chat-content">
        </div>
        <form class="message-form" id="message-form">
            <input type="text" name="message" placeholder="Type a message..." autocomplete="off">
            <button id="send-message-btn"><img src="../img/sendBtn.png"></button>
        </form>
    </div>
    <div class="conversation-ava"></div>
    <div class="conversation-info"></div>
    <div class="member-list"></div>
</div>
`

components.message = `
<div class="chatbox mine" id="chatbox">
    <img src="" class="chatbox-thumb" id="message-thumb">
    <p class="time-stamp" id="message-time"></p>
    <p class="chatbox-message" id="message-content"></p>
</div>
`