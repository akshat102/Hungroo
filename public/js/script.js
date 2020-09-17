const span = document.getElementById("span-detector");
const clients =["EVERYONE","FITNESS FREAK","VEGANS","DEVELOPERS"];
function typewriter(clients, span) {                
            let text="";
            let isDeleting=false;
            let wordIndex = 0;
            function typer(){
                wordIndex = wordIndex % clients.length;
                let word =clients[wordIndex];
                if (isDeleting) {
                    text = word.substring(0,text.length-1);
                } else {
                text = word.substring(0,text.length+1);   
                }
                if(text.length == word.length && isDeleting==false){
                    isDeleting=true;
                }else if(isDeleting==true && text==""){
                            wordIndex++;
                            isDeleting=false;
                }
            span.textContent = text; 
            setTimeout(typer, 200);
            }   
        typer(); 
        }
    typewriter(clients,span);
           