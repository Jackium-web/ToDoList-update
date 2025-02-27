var idNo = JSON.parse(localStorage.getItem('idNo')) || 0;
var incomidNo = JSON.parse(localStorage.getItem('incomidNo')) || 0;
var incompleteTasks = JSON.parse(localStorage.getItem('incomplete')) || [];
var completedTasks = JSON.parse(localStorage.getItem('complete')) || [];
var timestamp = new Date().toLocaleString();

function loading(){
    var incompleteTaskView = document.querySelector('.incomplete-tasks');
    var completeTaskVeiw = document.querySelector('.complete-tasks');
    var incompleteTaskElements = '';
    var completeTaskElements = '';
    var incompleteRec = JSON.parse(localStorage.getItem('incomplete'));
    var completeTaskRec = JSON.parse(localStorage.getItem('complete'));
    console.log(incompleteRec.length);
    console.log(completeTaskRec.length);
    if(incompleteRec.length > 0){
        incompleteRec.map(function(record){
            incompleteTaskElements += `
                <div class="content">
                    <div class="date">
                        ${record.createdDate}
                    </div>
                    <div class="task-details">
                        ${record.task}
                    </div>
                    <div class="taskbtns">
                        <button type="button" class="button1" onclick="complete(${record.id})">Complete</button>
                        <button type="button" class="button2" onclick="edit(${record.id})">Edit</button>
                        <button type="button" class="button3" onclick="deleteincompleteTask(${record.id})">Delete</button>
                    </div>
                </div>
            `
    
            incompleteTaskView.innerHTML = incompleteTaskElements;
        });
    }
    else{
        incompleteTaskView.innerHTML = "";
    }

    if(completeTaskRec.length > 0){
        completeTaskRec.map(function(record){
            document.querySelector('.clear_all_incomplete').style.display = 'block';
            completeTaskElements+= `
                <div class="content">
                     <div class="date">
                        ${record.completedDate}
                    </div>
                    <div class="task-details">
                        ${record.task}
                    </div>
                    <div class="taskbtns">
                        <button type="button" class="button3" onclick="deletecompletedTask(${record.id})">Delete</button>
                        <button type="button" class="retrive" onclick="retrive(${record.id})">Retrieve</button>
                    </div>
                </div>
            `
    
            completeTaskVeiw.innerHTML = completeTaskElements;
        });
    }
    else{
        document.querySelector('.clear_all_incomplete').style.display = 'none';
        completeTaskVeiw.innerHTML = "";
    }
}

function addtoStorage(){
    localStorage.setItem('incomplete', JSON.stringify(incompleteTasks));
    localStorage.setItem('complete', JSON.stringify(completedTasks));
    loading();
}

function createTask(){
    
    if(document.querySelector('.create-taskInput').value === ""){
        document.querySelector(".warning-pop").classList.add('warning-animation');
        setTimeout(function(){
            document.querySelector(".warning-pop").classList.remove('warning-animation');
        }, 3000)
    }
    else{
        var taskInput = document.querySelector('.create-taskInput').value;
        var form = document.querySelector('.create');
        var newTask = {id:idNo+=1, task:taskInput, createdDate:timestamp};
        form.reset();
        incompleteTasks.push(newTask);
        addtoStorage();
    }
}

function deleteincompleteTask(id){
    incompleteTasks = incompleteTasks.filter(rec => rec.id !== id);
    addtoStorage();
}

function deletecompletedTask(id){
    completedTasks = completedTasks.filter(rec => rec.id !== id);
    addtoStorage();
}

function complete(id){
  var completedtask = incompleteTasks.find(rec=>rec.id === id);
  var completedTasking = completedtask.task;
  var newCompletedTask = {id:incomidNo+=1, task:completedTasking, completedDate:timestamp};
  completedTasks.push(newCompletedTask);
  incompleteTasks = incompleteTasks.filter(rec =>rec.id !==id);
  addtoStorage();
}

document.querySelector('.create-taskInput').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        createTask(); 
    }
});

function clearAllIncomplete(){
    localStorage.removeItem("complete");
    completedTasks = [];
    addtoStorage();
}


function retrive(id){
    var recod = completedTasks.find(rec=>rec.id===id);
    var retrivedTasks = {id:recod.id, task:recod.task, createdDate:timestamp};
    incompleteTasks.push(retrivedTasks);
    completedTasks = completedTasks.filter(rec =>rec.id !== id);
    addtoStorage();
}



function edit(id){
    document.querySelector('.edit-task').classList.toggle('display');
    var task_source = incompleteTasks.find(rec=>rec.id ===id)
    document.querySelector(".edit").value = task_source.task;
    document.querySelector(".id23").value = task_source.id; 
    document.querySelector('.edit').addEventListener('keyup',(e)=>{
        if(e.keyCode === 13){
            document.querySelector('.edit-task').classList.remove('display');
            update();
        }
    });
}

function update(){
    document.querySelector('.edit-task').classList.remove('display');
    var id = parseInt(document.querySelector(".id23").value);
    var task = document.querySelector('.edit').value;
    var index = incompleteTasks.findIndex(rec =>rec.id === id);
    incompleteTasks[index] = {id, task};
    addtoStorage();
}

function getShareURL() {
    return encodeURIComponent(window.location.href);
}

function shareToFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${getShareURL()}`, '_blank');
}

function shareToTwitter() {
    const text = encodeURIComponent("Check out this Amaizing Task List website");
    window.open(`https://twitter.com/intent/tweet?url=${getShareURL()}&text=${text}`, '_blank');
}

function shareToLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${getShareURL()}`, '_blank');
}

function shareToWhatsApp() {
    window.open(`https://api.whatsapp.com/send?text=Check out this website: ${getShareURL()}`, '_blank');
}

function shareToTelegram() {
    window.open(`https://t.me/share/url?url=${getShareURL()}&text=Check out this Amaizing Task List website`, '_blank');
}

document.querySelector('.share-button').onclick =()=>{
    document.querySelector('.share').style.display = 'flex';
}

document.querySelector('.share').onclick =()=>{
    document.querySelector('.share').style.display = 'none';
}

document.querySelector('.exit').onclick =()=>{
    document.querySelector('.edit-task').classList.toggle('display');
}
