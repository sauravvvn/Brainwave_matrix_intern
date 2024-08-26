const taskinput=document.getElementById('taskinput');
const tasklist=document.getElementById('typetask');
//fn to add task
 function taskadded(){
    if(!taskinput.value.trim()){
        alert("please enter valid task");
    }
   else{
    //create new li elemt for task
    let li=document.createElement('li');
    li.textContent=taskinput.value;
                                         
    //crete span elmnt for delete buton
    let span=document.createElement("span");
    span.innerHTML="\u00d7";

    li.appendChild(span); //apend delete buton to task(li)
   
    //append the new task(li) to task list(ul)
  
    tasklist.appendChild(li);

   taskinput.value='';   //clear the input filed

   //add evntlistner to dlete buton to remove tssk
   span.addEventListener('click', function() {
    tasklist.removeChild(li); 
    saveData();
    
   });
        // Add event listener to mark the task as completed
        li.addEventListener('click', function() {
           li.classList.toggle('checked');
            saveData();
            
        });
        saveData();
    }
}
   
  
 function saveData(){
    localStorage.setItem("data",tasklist.innerHTML)
 }
 function showTasks() {
    let savedData = localStorage.getItem("data");
    if (savedData) {
        tasklist.innerHTML = savedData;

        // Reattach event listeners to the tasks and delete buttons
        let tasks = tasklist.getElementsByTagName('li');
        for (let i = 0; i < tasks.length; i++) {
            let li = tasks[i];
            let span = li.getElementsByTagName('span')[0];

            // Reatach event listener to delete button
            span.addEventListener('click', function() {
                tasklist.removeChild(li);
                saveData(); // Update local storage after delete
            });

            // Reattach event listener to toggle complet status
            li.addEventListener('click', function() {
                li.classList.toggle('checked');
                saveData(); // Update local storage after toggling
            });
        }
    }
}


document.addEventListener('DOMContentLoaded', showTasks);

  //add evnt listnr to "add" bton to triger taskaded fn
  document.getElementById('add').addEventListener('click',taskadded)