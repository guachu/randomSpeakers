const getDraw = async roomName => {
    let result = {}
    let path = `Room/${roomName}/Draws/`
    const rooms = await firebase.database().ref(path).once('value')
    console.log(path)
    if (rooms) {
        result = rooms.val()
    }
    return result
}

const changeRoom = room => async (event) => {
    lines = []
    others = {}
    event.stopPropagation()
    const button = document.querySelector(`#room_${room.name}`)
	
    roomName = room.node
    roomid = room.id

    connectAndSubscribe(room.id)

    const previusSelection = document.querySelectorAll('.buttonMenu.active')
    if (previusSelection && previusSelection.length > 0) {
        for (const menuButton of previusSelection) {
            menuButton.classList.remove("active")
        }
    }
    console.log("________________________________________________________________________________________")
    let draw = await getDraw(room.node)
    console.log(draw)

    let otherPainters = {}
    if (draw && currentUser.nickName) {
        let draws = Object.entries(draw)
        for (let element of draws) {
            if (element[0] === currentUser.nickName) {
                lines = element[1].lines
            }
            else {
                otherPainters[element[0]] = {
                    lines: element[1].lines,
                    color: element[1].color
                }
            }
        }

    }
    others = otherPainters
    drawErase()
    drawLines()
    drawOthers()
    console.log(lines)
    console.log("________________________________________________________________________________________")
    button.classList.add("active")
}

const getRoomTemplate = (room, active) => {

    let button = document.createElement('button')
    button.innerHTML = room.name
    button.id = `room_${room.name}`
    button.classList.add("buttonMenu")
    button.addEventListener("click", changeRoom(room))
	if (active) {
        button.classList.add("active")
        roomid = room.id
        connectAndSubscribe(room.id)
    }

    let newLi = document.createElement('li')
    newLi.appendChild(button)

    return newLi
}

const getRooms = async () => {
    const rooms = await firebase.database().ref("Room/").once('value')
    const roomsCollection = Object.entries(rooms.val())
    const ulRooms = document.querySelector("#treeview-menu")
	let active = true
    for (let room of roomsCollection) {

		let completeRoom = room[1]
        completeRoom.node = room[0]
        ulRooms.appendChild(getRoomTemplate(completeRoom, active))
        active = false
    }
}

const toogleMenu = () => {
    const menuTemas = document.querySelector("#MenuTemas")
    console.log("click en menu")
    menuTemas.classList.toggle('active')
}

const addToggleInMenu = () => {
    const menuTemas = document.querySelector("#MenuTemas")
    menuTemas.addEventListener('click', toogleMenu)
}

const init = () => {
    addToggleInMenu()
    getRooms()
}

init() 