const mainDiv = document.querySelector('#main');
const container = document.querySelector('.container');

mainDiv.style.marginTop = '50px';
// creating div rows

let cellID = 0;
let bombPositions = randomDeath();
let cellClicked = 0;
var flag = true;
for(let i=0;i<9;++i){
    const rowDiv = document.createElement('div');

    rowDiv.classList.add('row');
     
    while(cellID<=81){
        x();
        function x(){
            const cellDiv = document.createElement('div');
            const pTag = document.createElement('p');
            const image = document.createElement('img');
            const cellDiv2 = document.createElement('div');

            pTag.setAttribute('id',`cell_${cellID+1}`);
            cellDiv2.classList.add('col','bg-danger');
            cellDiv.classList.add('col','border','bg-warning');
            cellDiv.style.width = "4px";
            pTag.style.alignItems = 'center';
            pTag.style.fontWeight = 'bold';
            pTag.classList.add('bg-warning',"d-flex", "justify-content-center");
            pTag.style.paddingTop = '5px';
            pTag.style.textAlign = 'center';
            cellDiv.appendChild(pTag);
            rowDiv.appendChild(cellDiv);
            cellDiv2.style.width = "100%";

            pTag.style.visibility = 'hidden';

            image.src = "https://img.icons8.com/emoji/48/000000/bomb-emoji.png";
            image.style.height = '30px';
            image.style.width = '30px';
            image.style.alignItems = 'center';

            if(bombPositions.includes((cellID+1))){
                pTag.appendChild(image);
            }else{
                pTag.innerHTML = (cellID+1);
            }
            
            cellDiv.addEventListener('click',function(){
                
                if(pTag.classList.contains('bg-warning') && flag && cellClicked<=71){
                    pTag.style.visibility = 'visible';
                    
                    

                    if(pTag.childElementCount === 0){
                        cellDiv.classList.replace('bg-warning','bg-success');
                        pTag.classList.replace('bg-warning','bg-success')
                        pTag.classList.add('text-white');                 
                        scoreCount(pTag.innerHTML);
                        ++cellClicked;
                    }else{
                        displayAllBombs(cellDiv);
                        
                    }

                    if(cellClicked===71){
                        document.getElementById('resultDisplay').innerHTML = 'win';
                    }
                    

                }
                
                
                
            })
   
            ++cellID;
        }
        if(cellID%9==0){ 
            break;
        }
        
    }
 
    container.appendChild(rowDiv);
    
}
// function for eventListener
// function to display all the bombs
function displayAllBombs(cellDiv){
    if(bombPositions.includes(parseInt(cellDiv.children[0].getAttribute('id').slice(5)))){
        bombPositions.forEach((bombPosition)=>{
            let cell_ = document.getElementById(`cell_${bombPosition}`);
            cell_.parentNode.classList.replace('bg-warning','bg-danger');
            cell_.classList.replace('bg-warning','bg-danger');
            cell_.style.visibility = 'visible';            
        })
    }

    document.getElementById('resultDisplay').innerHTML = 'game over';
    flag=false;
}
// function to count score
function scoreCount(score){
    if(document.getElementById('gameScore').innerHTML === ""){
        document.getElementById('gameScore').innerHTML = 0;
    }

    let prevScore_ = document.getElementById('gameScore').innerHTML;
    document.getElementById('gameScore').innerHTML=parseInt(prevScore_)+parseInt(score);

}


// function to generate 10 random numbers between 1 and 81
function randomDeath(){
    let arr = [];
    while(arr.length < 10){
        var r = Math.floor(Math.random() * 81) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

// reset button working
function refresh(){
    document.getElementById('gameScore').innerHTML="";
    document.getElementById('resultDisplay').innerHTML = "";
    for(let i=1;i<=81;++i){
        const div_ = document.getElementById(`cell_${i}`);

        if(div_.style.visibility === 'visible')
            div_.style.visibility = 'hidden';

        if(div_.childElementCount === 0){
            div_.parentNode.classList.replace('bg-success','bg-warning');
            div_.classList.replace('bg-success','bg-warning');
        }else{
            div_.parentNode.classList.replace('bg-danger','bg-warning');
            div_.classList.replace('bg-danger','bg-warning');
        }  

        flag=true;
        cellClicked=0;
    }
}