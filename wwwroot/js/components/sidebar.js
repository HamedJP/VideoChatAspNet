export let sidebar = document.createElement('div');
sidebar.className =
    'col d-flex flex-column align-items-stretch flex-shrink-0 bg-white'
sidebar.style = 'background:yellow';


let title = document.createElement('h2')
title.textContent = 'لیست کابران'
title.classList =
    'd-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom'

let usersList = document.createElement('div')

usersList.classList = 'list-group list-group-flush border-bottom scrollarea container'

let allUsers = [1, 2, 3, 4, 5]
showUsersInSidebar(-1)

function selectUser(userId) {
    console.log(userId)
    usersList.innerHTML = ''


    showUsersInSidebar(userId)
}

function showUsersInSidebar(chosenUserId) {
    for (let i = 0; i < allUsers.length; i++) {

        let callButton = document.createElement('button');
        callButton.textContent = "\u260E";
        callButton.classList = 'btn btn-info';
        callButton.onclick = () => {
            console.log(`calling ${allUsers[i]}`)
        }

        let user = document.createElement('div')
        user.id = `${allUsers[i]}`
        if (user.id === chosenUserId) {
            user.classList =
                'list-group-item list-group-item-action py-3 active lh-tight userContainer';
            callButton.disabled = false;
        } else {
            user.classList =
                'list-group-item list-group-item-action py-3 lh-tight userContainer';
            callButton.disabled = true;
        }
        let p = document.createElement('p');
        p.textContent = `user ${allUsers[i]}`;
        p.classList = "col";
        user.appendChild(p);
        // callButton.style = "left: 5%;  position: absolute";
        // callButton.classList = "btn btn-primary col";
        user.appendChild(callButton);
        user.onclick = () => {
            selectUser(user.id);
        };
        usersList.appendChild(user);
    }
}


sidebar.appendChild(title)
sidebar.appendChild(usersList)
