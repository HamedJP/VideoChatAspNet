export let sidebar = document.createElement('div');
sidebar.className =
    'col d-flex flex-column align-items-stretch flex-shrink-0 bg-white'
sidebar.style = 'background:yellow';


let title = document.createElement('h2')
title.textContent = 'لیست کابران'
title.classList =
    'd-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom'

let usersList = document.createElement('div')

usersList.classList = 'list-group list-group-flush border-bottom scrollarea'

let allUsers = [1, 2, 3, 4, 5]
showUsersInSidebar(-1)

function selectUser(userId) {
    console.log(userId)
    usersList.innerHTML = ''

    // for (let i = 0; i < allUsers.length; i++) {
    //     let user = document.createElement('a')
    //     user.id = `${allUsers[i]}`
    //     if (user.id === userId) {
    //         user.classList =
    //             'list-group-item list-group-item-action active py-3 lh-tight'
    //     }
    //     else {
    //         user.classList =
    //             'list-group-item list-group-item-action py-3 lh-tight'
    //     }
    //     user.textContent = `user ${allUsers[i]}`
    //     user.onclick = () => {
    //         selectUser(user.id)

    //     }
    //     usersList.appendChild(user)
    // }

    showUsersInSidebar(userId)
}

function showUsersInSidebar(chosenUserId) {
    for (let i = 0; i < allUsers.length; i++) {

        let callButton = document.createElement('button');
        callButton.textContent = "\u260E";
        
    let user = document.createElement('div')
        user.id = `${allUsers[i]}`
        if (user.id === chosenUserId) {
            user.classList =
                'list-group-item list-group-item-action py-3 active lh-tight row';
            callButton.disabled = false;
        } else {
            user.classList =
                'list-group-item list-group-item-action py-3 lh-tight row';
            callButton.disabled = true;
        }
        let p = document.createElement('p');
        p.textContent = `user ${allUsers[i]}`;
        p.classList = "col";
        user.appendChild(p);
  // callButton.style = "left: 5%;  position: absolute";
    callButton.classList = " col";
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
