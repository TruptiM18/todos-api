$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(function(data){
        //console.log(data);
        addTodos(data);
    })
    .catch(function(err){
        console.log(err);
    });
    
    $("#todoInput").keypress(function(event){
        //Key pressed in Enter
        if(event.which == 13){
           createTodo(); 
        }
    });
    
    $(".list").on('click','span',function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
        $(this).parent().remove();
    });
    
    $(".list").on('click','li',function(){
        updateTodo($(this));
    });
});

/* Add an individual todo task */
function addTodo(todo){
    var newTodo = $("<li>" + todo.name + "<span>X</span></li>");
    newTodo.data("id",todo._id);
    newTodo.data("completed",todo.completed);
    $('.list').append(newTodo);
    newTodo.addClass("task");
    if(todo.completed){
        newTodo.addClass("done");
    }
}


/* Adds todos to the page */
function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    })
}

/* Creating a New Todo */
function createTodo(){
    //Send req to create todo
    $.post('/api/todos',{name: $("#todoInput").val()})
    .then(function(todo){
        $("#todoInput").val('');
        addTodo(todo);
    })
    .catch(function(err){
        console.log(err);
    });
    
}

/* Remove a Todo */
function removeTodo(todo){
    var clickedId = todo.data('id');
    var deleteUrl = "api/todos/" + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl,
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(err){
        console.send(err);
    });
}

/* Update Todo */
function updateTodo(todo){
    var updateUrl = "/api/todos/" + todo.data("id");
    var isDone = !todo.data('completed');
    var updatedData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updatedData
    })
    .then(function(){
        todo.data("completed",isDone);
        todo.toggleClass('done');
    })
}