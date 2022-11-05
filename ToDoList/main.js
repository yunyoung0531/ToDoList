//유저가 값을 입력한다
// + 버튼을 클릭하면 할 일이 추가된다.
//delete 버튼을 누르면 할 일이 삭제된다.
//check 버튼을 누르면 할 일이 끝나면서 밑줄이 쳐진다.
//1. check 버튼을 클릭하는 순간 false -> true //#toggleComplete()
//2. true 이면 끝난 걸로 간주하고 밑줄 쳐짐
//3. false 이면 안 끝난 걸로 간주하고 그대로
//not done, done 탭을 누르면 언더바가 이동한다
//not done 탭은 진행중인 아이템만 done 탭은 끝난 아이템만 나옴
//all 탭은 전체 아이템 다 보여줌

let taskInput = document.getElementById("task-input")
//console.log(taskInput)
let addButton = document.getElementById("add-button")
addButton.addEventListener("click", addTask)
let taskList = []
let tabs = document.querySelectorAll(".task-tabs div") //.task-tabs div에 있는 모든 거를 다 갖고 온다
let filterList = []
let mode = "all"

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) { filter(event)})
}

function addTask() {
    //console.log("clicked")
    //task -> 객체 / 관련 있는 정보를 하나로 묶어줌
    let task = {
        id:randomIDgenerate(), //유니크
        taskContent: taskInput.value,
        isComplete: false //끝났는지 여부의 필드 //기본값 false
    }
    //let taskContent = taskInput.value 
    taskList.push(task)
    console.log(taskList)
    taskListRender()
}

function taskListRender() {
    let list = []
    if (mode == "all") {
        list = taskList
    }
    else if (mode == "ongoing" || mode == "done") {
        list == filterList
    }
    

    let resultHTML = ''  //string변수

    for (let i = 0; i < list.length; i++) 
    {
        if (list[i].isComplete == true) {
            resultHTML += `<div class = "task">
            <div class = "task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">check</button>
                <button onclick="deleteTask('${list[i].id}')">delete</button>
            </div>
        </div>`
        }
        else //false면
        {
            resultHTML += `<div class = "task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">check</button>
                        <button onclick="deleteTask('${list[i].id}')">delete</button>
                    </div>
                </div>`
        }
        /*resultHTML += `<div class = "task">
                    <div>${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${taskList[i].id}')">check</button>
                        <button>delete</button>
                    </div>
                </div>`
                */
    }

    document.getElementById("task-board").innerHTML = resultHTML
    //innerHTML -> div 안에 있는 HTML전체 내용을 가져오는 것.
}

//내가 어떤 아이템(할 일)을 선택했는지 이 함수가 알아야한다.
function toggleComplete(id) {
    //console.log("check 됐음.")
    console.log("id: ", id)
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete //false -> true, true -> false
            break;
        }
    }
    taskListRender()
    
}

function randomIDgenerate() //func toggleComplete - func addTask -  let task - id
{
    return '_' + Math.random().toString(36).substr(2, 9)
}

function deleteTask(id) //할 일을 삭제하는 함수
{
    //console.log("삭제")
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1) //i번째에 있는 거 딱 하나만 삭제.
            break;
        }
    }
    taskListRender()
}

function filter(event) {
    mode = event.target.id
    console.log("filter 클릭됨.", event.target.id) //event.target 어떤 이벤트를 클릭했는지 알려줌
    
    document.getElementById("under-line").style.width =
    event.target.offsetWidth + "px"
    document.getElementById("under-line").style.top =
    event.target.offsetTop + event.target.offsetHeight + "px"
    document.getElementById("under-line").style.left =
    event.target.offsetLeft + "px"

    if (mode == "all") {
        //전체 리스트 보여줘
        taskListRender()
    }
    else if (mode == "ongoing") {
        //진행 중인 것만
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i])
            }
        }
        taskList = filterList
        taskListRender()
    }
    else if (mode == "done") {
        //끝난 것만
        for (let i = 0; i <taskList.length; i++) {
            if (taskList[i].isComplete == true) //끝난거면
            {
                filterList.push(taskList[i])
            }
        }
        taskListRender()
    }
}