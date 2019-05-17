const changeRoom = room => () => {
    console.log("actualRoom id is:", room.id)
    const button = document.querySelector(`#room_${room.name}`)
    //const icon = document.querySelector(`#icon_${room.name}`)

    const previusSelection = document.querySelectorAll('.buttonMenu.active')
    if (previusSelection && previusSelection.length > 0) {
        for (const menuButton of previusSelection) {
            menuButton.classList.remove("active")
        }
    }

    button.classList.add("active")
    //icon.classList.add("active")
}

const getRoomTemplate = (room) => {

    let template = `<i id="icon_${room.name}" class="fa fa-circle-o buttonMenu"></i>`

    let button = document.createElement('button')
    button.innerHTML = room.name
    button.id = `room_${room.name}`
    button.classList.add("buttonMenu")
    button.addEventListener("click", changeRoom(room))

    let newLi = document.createElement('li')
    //newLi.innerHTML = template
    newLi.appendChild(button)

    return newLi
}

const getRooms = async () => {
    console.log("________________________________________________________________________________________")
    const rooms = await firebase.database().ref("Room/").once('value')
    const roomsCollection = Object.entries(rooms.val())
    console.log(roomsCollection)
    const ulRooms = document.querySelector("#treeview-menu")
    for (let room of roomsCollection) {

        ulRooms.appendChild(getRoomTemplate(room[1]))
        // let newRoom = document.createElement('li')
        // let italic = document.createElement('i')
        // let buttonRoom = document.createElement('button')
        // italic.classList.add("fa")
        // italic.classList.add("fa-circle-o")
        // let textnode = document.createTextNode(room[1].Name);
        // newRoom.appendChild(italic)
        // newRoom.appendChild(textnode)
        // ulRooms.appendChild(newRoom)
    }
    console.log("the rooms are:", rooms.val())
    console.log("________________________________________________________________________________________")

    // < li class="active" > <a href="index.html"><i class="fa fa-circle-o"></i> Carros</a></li >
    //     <li><a href="index.html"><i class="fa fa-circle-o"></i> Motos</a></li>
    //     <li><a href="index.html"><i class="fa fa-circle-o"></i> Aves</a></li>
}
getRooms() 