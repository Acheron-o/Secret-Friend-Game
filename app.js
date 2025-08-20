//The main goal of this challenge is to improve your own abilities in programming log. Here you must develop the logic to solve the problem
let typedFriends = []
//Create a function that stores the friend's name when the "ADD" button is clicked
function addFriend() {
    let friendName = document.querySelector('input').value;
    typedFriends.push(friendName);
    document.querySelector('input').value = '';
    console.log(typedFriends);
}
