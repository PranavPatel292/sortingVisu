var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

sortArray = []
let stats = []
let col_width = 10;
let comp = 0;
const canvas_width = document.getElementById("myCanvas").width;
const canvas_height = document.getElementById("myCanvas").height;

let w = Math.floor(canvas_width / col_width);

function init(){
    for(let j = 0; j < w; ++j){
    let height = Math.floor(Math.random() * canvas_height) + 1;
    sortArray.push(height);
    stats[j] = -1
    }
}

init();

const FRAMES_PER_SECOND = 60;  // Valid values are 60,30,20,15,10...
// set the mim time to render the next frame
const FRAME_MIN_TIME = (1000/60) * (20 / FRAMES_PER_SECOND) - (1000/60) * 0.5;
var lastFrameTime = 0;  // the last frame time


//equl of draw loop in P5..
//only problem is how to call the quicksort function.!

function update(time){
    if(time-lastFrameTime < FRAME_MIN_TIME){ //skip the frame if the call is too early
        requestAnimationFrame(update);
        return; // return as there is nothing to do
    }
    lastFrameTime = time; // remember the time of the rendered frame
    // render the frame
    draw1();
    requestAnimationFrame(update); // get next farme
}

requestAnimationFrame(update); // start animation

quickSort(sortArray, 0, sortArray.length)

//bubblesort(sortArray)
//insertionSort(sortArray)


function draw1(){
    ctx.clearRect(0, 0, canvas_width, canvas_height)
    ctx.beginPath();
    ctx.fillStyle = 'gray'
    ctx.fillRect(0, 0, canvas_width, canvas_height)
    for(let i = 0; i <= sortArray.length; ++i){
        
            
            if(stats[i] == 0){
            ctx.fillStyle = '#e0777d';
            ctx.fillRect(i * col_width, canvas_height, col_width, -sortArray[i])
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.strokeRect(i * col_width, canvas_height, col_width, -sortArray[i]);
            //document.getElementById('pivot').innerHTML = "Biggest element is: "+ (sortArray[i]);
        }
        else if(stats[i] == 1){
            ctx.fillStyle = '#d6ffb7';
            ctx.fillRect(i * col_width, canvas_height, col_width, -sortArray[i])
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.strokeRect(i * col_width, canvas_height, col_width, -sortArray[i]);
        }
        else{
            ctx.fillStyle = 'white';
            ctx.fillRect(i * col_width, canvas_height, col_width, -sortArray[i])
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.strokeRect(i * col_width, canvas_height, col_width, -sortArray[i]);
        }
        document.getElementById('count').innerHTML = "Total elements in the sorting are: "+ sortArray.length;
        document.getElementById('comp').innerHTML = "Total comparison done: "+ comp;
    }

}

async function quickSort(array, start, end){
    if(start >= end) return
    let index = await partition(array, start, end)
    stats[index] = -1;
    await quickSort(array, start, index - 1)
    await quickSort(array, index + 1, end)
}

async function partition(array, start, end){
    for(let i = start; i < end; ++i){
        stats[i] = 1;
    }
    let pivotIndex = start;
    let pivotElement = array[end];
    stats[pivotIndex] = 0;
    for(let i = start; i < end; ++i){
        if(array[i] <= pivotElement){
            comp++;
            await swap(array, i, pivotIndex);
            stats[pivotIndex] = -1;
            pivotIndex++;
            stats[pivotIndex] = 0;

        }
    }
    await swap(array, pivotIndex, end)
    for(let i = start; i < end; ++i){
        stats[i] = -1;
    }
    return pivotIndex;
}

async function swap(array, i, j){
    await sleep(50);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function bubblesort(array){
    let old_value;
    for(let i = 0; i < array.length; ++i){
        for(let j = 0; j < array.length - i - 1; ++j){
            stats[j] = 0;
            if(array[j] > array[j + 1]){
                //document.getElementById('pivot').innerHTML = "Currnet biggest value: "+ (array[j]);
                comp++
                await swap(array, j, j + 1)
                stats[j + 1] = -1
                stats[j] = -1
            }
            else{ 

            for(let i = 0; i < stats.length; ++i){
            stats[i] = -1;
            }

            stats[j] = 1;

         }
        }
        
        for(let i = 0; i < stats.length; ++i){
            stats[i] = -1;
        }   
    }
    stats[0] = -1;
}


async function insertionSort(array){
    let key;
    for(let i = 1; i < array.length; ++i){
        key = array[i]
        j = i - 1;
        for(let k = 0; k < j; ++k){
            stats[k] = 1;
        }
        while(j >= 0 && array[j] > key){
            stats[j] = 0
            comp++;
            await change(array, j + 1, j)
            j = j - 1;
        }
        array[j + 1] = key;
         j = i - 1;
        for(let k = 0; k < array.length; ++k){
            stats[k] = -1;
        }
    }

   
}

async function change(array, j, i){
    await sleep(5);
    array[j] = array[i]
}