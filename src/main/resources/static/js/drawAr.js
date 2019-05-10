let canvas = document.getElementById('drawArea')
const ctx = canvas.getContext('2d');

let drawing = false

let lines = []

const drawLines = ()=>{
 for (let myLine of lines) {        
     drawLine(myLine)
  }
}


const drawLine = myLine =>{
  console.log("drawline")
  ctx.beginPath(); 
  if(myLine){
  let before = myLine[0]
  for (let point of myLine) {          
      ctx.moveTo(before.x, before.y);    
      ctx.lineTo(point.x, point.y); 
      before = point
  }  
}   
  ctx.stroke();
}

const getPoint = (e)=>{
  return  {
    x:e.clientX,
    y:e.clientY
  }
}

const handleMouseDown = e =>{  
  drawing = true
  let point = getPoint(e)
  lines.push([point])
}

const handleMouseMove = e =>{  
  let line = lines[lines.length-1]  
  if(drawing){
    let point = getPoint(e)
    line.push(point)        
  }   
  drawLines()
}

const handleMouseUp = e=>{
  drawing = false
  console.log("mi linea=>",JSON.stringify(lines))
}

canvas.addEventListener('mousedown', handleMouseDown)
canvas.addEventListener('mousemove',handleMouseMove)
canvas.addEventListener('mouseup',handleMouseUp)

drawLines()