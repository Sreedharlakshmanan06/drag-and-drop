let startX, startY, startWidth, startHeight;
let isResizingX = false;
let isResizingY = false;

/**
 * Box drag & Drop functions
 */
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, part) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    console.log(part)
    if(part == 'default'){
        var targetPart = document.getElementById(part);
        targetPart.appendChild(draggedElement);
    }else{
        var targetPart = document.getElementById('part' + part);
        targetPart.appendChild(draggedElement);
    }
}


/**
 * Box Resize functions
 */

 function startResizeX(event) {
    event.preventDefault();
    isResizingX = true;
    startY = event.clientY;
    document.addEventListener('mousemove', resizeX);
    document.addEventListener('mouseup', stopResizeX);
}

function startResizeY(event) {
    event.preventDefault();
    isResizingY = true;
    startX = event.clientX;
    document.addEventListener('mousemove', resizeY);
    document.addEventListener('mouseup', stopResizeY);
}

function resizeX(event) {
    if (isResizingX) {
        const deltaY = event.clientY - startY;
        document.getElementById('partA').style.height = (parseInt(document.defaultView.getComputedStyle(document.getElementById('partA')).height, 10) + deltaY) + 'px';
        document.getElementById('partB').style.height = (parseInt(document.defaultView.getComputedStyle(document.getElementById('partB')).height, 10) + deltaY) + 'px';
        document.getElementById('partC').style.height = (parseInt(document.defaultView.getComputedStyle(document.getElementById('partC')).height, 10) - deltaY) + 'px';
        document.getElementById('partD').style.height = (parseInt(document.defaultView.getComputedStyle(document.getElementById('partD')).height, 10) - deltaY) + 'px';
        
        document.getElementById('dragx').style.top = document.getElementById('partA').getBoundingClientRect().height + 'px';
        startY = event.clientY;
    }
}

function resizeY(event) {
    if (isResizingY) {
        const deltaX = event.clientX - startX;
        document.getElementById('partA').style.width = (parseInt(document.defaultView.getComputedStyle(document.getElementById('partA')).width, 10) + deltaX) + 'px';
        document.getElementById('partB').style.width = (parseInt(document.defaultView.getComputedStyle(document.getElementById('partB')).width, 10) - deltaX) + 'px';
        document.getElementById('partC').style.width = (parseInt(document.defaultView.getComputedStyle(document.getElementById('partC')).width, 10) + deltaX) + 'px';
        document.getElementById('partD').style.width = (parseInt(document.defaultView.getComputedStyle(document.getElementById('partD')).width, 10) - deltaX) + 'px';
        document.getElementById('dragy').style.left = document.getElementById('partA').getBoundingClientRect().width + 'px';
        startX = event.clientX;
    }
}

function stopResizeX() {
    isResizingX = false;
    document.removeEventListener('mousemove', resizeX);
    document.removeEventListener('mouseup', stopResizeX);
}

function stopResizeY() {
    isResizingY = false;
    document.removeEventListener('mousemove', resizeY);
    document.removeEventListener('mouseup', stopResizeY);
}