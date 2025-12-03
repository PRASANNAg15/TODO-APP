const currentdate = new Date();
let tasklist = document.getElementById("todolist");
let editvalue = null;
let form = document.getElementById("form");
let arr = [];
window.onload=()=>{
    render();
}
document.getElementById("ntask").innerText=0;
function handleClear() {
    arr = [];
    alert("Tasks cleared")
     document.getElementById("ntask").innerText=arr.length;
    localStorage.setItem('tasklist',JSON.stringify(arr));
    render();
}
let dispbutton = document.getElementById("display");
let handleSubmit = () => {
    let task = document.getElementById("task").value;
   let date = currentdate.getDate();
    let year = currentdate.getFullYear();
    let month = currentdate.getMonth();
    let deadline=document.getElementById("date").value;
    let len = arr.length;
    let id = null;
    if (len > 0) {
        id = len + 1;
    }
    else {
        id = 1;
    }
    let formatedDate = `${date}-${month+1}-${year}`;
    arr.push({
        id: id,
        task: task,
        date: formatedDate,
        deadline:deadline,
        completed:false,
    });
    alert("Task added successfully");
    localStorage.setItem('tasklist',JSON.stringify(arr));
}

function render() {
    tasklist.innerHTML = "";
    dispbutton.style.cursor = "pointer";
     arr=JSON.parse(localStorage.getItem('tasklist'))||[];
    if (!(arr.length > 0)) {
        alert("List is empty , add new goals");
    }
    else {
        tasklist.style.display = "grid";
        for (i = 0; i < arr.length; i++) // loop to render the elements 
            {
// creating the elements needed to form the card layout            
            let div = document.createElement("div");//div
            let buttoncontainer = document.createElement("div");//button container
            buttoncontainer.className = "bcontainer";
            div.className = "taskitems";
            let edit = document.createElement("button");//edit button
            edit.textContent = "EDIT";
            edit.style.background = "linear-gradient(90deg,orange,red)";
            edit.style.color = "white";
            let id = document.createElement("h1");//h1
            let t = document.createElement("h3");//h3 
            let d1=document.createElement("p");//p3 for deadline
            let d = document.createElement("p");//p for current date
            let delbutton = document.createElement("button");//delete button
            delbutton.textContent = "DELETE";
            delbutton.style.background = "linear-gradient(90deg,orange,red)";
            delbutton.style.color = "white";
            let complete=document.createElement("button");//complete button
            complete.textContent="COMPLETED";
            complete.style.background="linear-gradient(90deg,orange,red)";
            complete.style.color="white";

//assgining values from the array
            id.textContent = arr[i].id;
            t.textContent = arr[i].task;
            d.textContent = arr[i].date;
            d1.textContent=arr[i].deadline;

//appending values
            div.appendChild(id);
            div.appendChild(t);
            t.style.textDecoration=(arr[i].completed)?"line-through":"none";
            div.appendChild(d);
            div.appendChild(d1);
            buttoncontainer.appendChild(delbutton);
            buttoncontainer.appendChild(edit);
            buttoncontainer.appendChild(complete);
            div.appendChild(buttoncontainer);
            div.style.backgroundColor=(arr[i].completed==true)?"lightgreen":"gold";
            tasklist.appendChild(div);
  
         document.getElementById("ntask").innerText=arr.length;//TOTAL GOALS
        
            delbutton.addEventListener("click", (e) => {
                let parent = e.target.parentElement.parentElement;
                let child = parent.firstChild.textContent;
                arr = arr.filter(item => !(item.id == child));
                 document.getElementById("ntask").innerText=arr.length;
                 localStorage.setItem('tasklist',JSON.stringify(arr));
                render();
            });


            edit.addEventListener("click", (e) => {
                form.style.display = "block";
                editvalue = e.target.parentElement.parentElement;
            });
            document.getElementById("handleEdit").addEventListener("click", () => {
               let update = document.getElementById("updatevalue").value;
                if (update == "") {
                    alert("Invalid value to update")
                }
                else {
                    let child=editvalue.firstChild.textContent;
                    editvalue.querySelector("h3").textContent = update;
                    arr.forEach(item=>{
                        if(item.id==child)
                        {
                            item.task=update;
                        }
                    })
                     localStorage.setItem('tasklist',JSON.stringify(arr));
                    form.style.display = "none";
                }
            }

            );

            complete.addEventListener("click",(e)=>{
                let parent=e.target.parentElement.parentElement;
                parent.querySelector("h3").style.textDecoration="line-through"; 
                parent.querySelector("h3").style.color="green";
                parent.style.background="lightgreen";
               let val=parent.firstChild.textContent;
               arr.forEach(item=>
               {
                if(item.id==val)
                {
                    item.completed=true;
                    localStorage.setItem('tasklist',JSON.stringify(arr));
                }
               }
               )
            });

        }
    }
}

let filter = document.getElementById("search");
filter.addEventListener("keyup", (e) => {
    let value = e.target.value;
    let values = tasklist.getElementsByTagName("h3");
    Array.from(values).forEach((item) => {
        let text = item.textContent;
        if (!(text.includes(value))) {

            item.parentElement.style.display = "none";
        }
        else {
            item.parentElement.style.display = "grid";

        }
    })
});

