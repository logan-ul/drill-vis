const formation = [
    { x: 33, y: 35, dir: "N", role: "none" },
    { x: 35, y: 35, dir: "N", role: "none" },
    { x: 37, y: 35, dir: "N", role: "none" },
    { x: 33, y: 33, dir: "N", role: "none" },
    { x: 35, y: 33, dir: "N", role: "none" },
    { x: 37, y: 33, dir: "N", role: "none" },
    { x: 33, y: 31, dir: "N", role: "none" },
    { x: 35, y: 31, dir: "N", role: "none" },
    { x: 37, y: 31, dir: "N", role: "none" },
    { x: 31, y: 33, dir: "N", role: "commander" }
  ];
  const canvas = document.getElementById("drillCanvas");
  const ctx = canvas.getContext("2d");
  let p = 10
  let checkMove = 1 //sets whether or not the dots are moving
  const dirToAngle = {
        N: 90,
        NE: 45,
        E: 0,
        SE: 315,
        S: 270,
        SW: 225,
        W: 180,
        NW: 135
      };
  
  function centerLine(){
      ctx.beginPath();
      ctx.moveTo(0,canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
  }
  centerLine()

  function flightHalt(){
      // stops movement
      if(checkMove != 1){
          checkMove = 1
      }
  }

  async function constantForwardMarch(){
      // moves without stopping
      if(checkMove != 0){
          checkMove = 0
      }else{
          return
      }
      while(checkMove == 0){
          forwardMarchAll()
          await sleep(500)
      }
  }
  async function constantHalfStep(){
      // moves in half step without stopping
      if(checkMove != 2){
          checkMove = 2
      }else{
          return
      }
      while(checkMove == 2){
          forwardHalfStepAll()
          await sleep(500)
      }
  }

  function drawFormation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    centerLine()

    formation.forEach(cadet => {
      ctx.beginPath();
      ctx.arc(cadet.x * 40, cadet.y * 40, 10, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  drawFormation()
  function forwardMarch(cadet) {
      const diag = 1
      if (cadet.dir =="N"){
            cadet.y -= 1; // move up
      }else if(cadet.dir =="E"){
            cadet.x += 1; // move up
      }else if(cadet.dir =="S"){
            cadet.y += 1; // move up
      }else if(cadet.dir =="W"){
            cadet.x -= 1; // move up
      }else if(cadet.dir =="NE"){
            cadet.x += diag; // move up
            cadet.y -= diag;
      }else if(cadet.dir =="NW"){
            cadet.x -= diag; // move up
            cadet.y -= diag;
      }else if(cadet.dir =="SE"){
            cadet.x += diag; // move up
            cadet.y += diag;
      }else if(cadet.dir =="SW"){
            cadet.x -= diag; // move up
            cadet.y += diag;
      }
      drawFormation()
  }

  function forwardMarchAll(){
      forwardMarch(formation[8])
      forwardMarch(formation[7])
      forwardMarch(formation[6])
      forwardMarch(formation[5])
      forwardMarch(formation[4])
      forwardMarch(formation[3])
      forwardMarch(formation[2])
      forwardMarch(formation[1])
      forwardMarch(formation[0])
      forwardMarch(formation[9])
  }
  function forwardHalfStepAll(){
      forwardHalfStep(formation[8])
      forwardHalfStep(formation[7])
      forwardHalfStep(formation[6])
      forwardHalfStep(formation[5])
      forwardHalfStep(formation[4])
      forwardHalfStep(formation[3])
      forwardHalfStep(formation[2])
      forwardHalfStep(formation[1])
      forwardHalfStep(formation[0])
      forwardHalfStep(formation[9])
  }

  function forwardHalfStep(cadet, mult = 1) {
      const diag = 0.5
      if (cadet.dir =="N"){
            cadet.y -= 0.5*mult; // move up
      }else if(cadet.dir =="E"){
            cadet.x += 0.5*mult; // move up
      }else if(cadet.dir =="S"){
            cadet.y += 0.5*mult; // move up
      }else if(cadet.dir =="W"){
            cadet.x -= 0.5*mult; // move up
      }else if(cadet.dir =="NE"){
            cadet.x += diag*mult; // move up
            cadet.y -= diag*mult;
      }else if(cadet.dir =="NW"){
            cadet.x -= diag*mult; // move up
            cadet.y -= diag*mult;
      }else if(cadet.dir =="SE"){
            cadet.x += diag*mult; // move up
            cadet.y += diag*mult;
      }else if(cadet.dir =="SW"){
            cadet.x -= diag*mult; // move up
            cadet.y += diag*mult;
      }
      drawFormation()
  }

  function turnHalfRight(cadet){
      if (cadet.dir == "N"){
          cadet.dir = "NE"
      }else if (cadet.dir == "E"){
          cadet.dir = "SE"
      }else if (cadet.dir == "S"){
          cadet.dir = "SW"
      }else if (cadet.dir == "W"){
          cadet.dir = "NW"
      }else if (cadet.dir == "NE"){
          cadet.dir = "E"
      }else if (cadet.dir == "NW"){
          cadet.dir = "N"
      }else if (cadet.dir == "SE"){
          cadet.dir = "S"
      }else if (cadet.dir == "SW"){
          cadet.dir = "W"
      }else {
          console.log("You're an idiot. turnHalfRight only takes one argument")
      }
  }
  function turnRight(cadet){
      turnHalfRight(cadet)
      turnHalfRight(cadet)
  }
  function turnLeft(cadet){
      turnRight(cadet)
      turnRight(cadet)
      turnRight(cadet)
  }
  function aboutFace(cadet){
      turnRight(cadet)
      turnRight(cadet)
  }
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function halfStepSleep(cadet){
      forwardHalfStep(cadet)
      await sleep(500)
  }


  async function columnRight(){
      let turnedList = []
      if(checkMove !== 0){
          checkMove = 0
      }
      let elements = findElements()
      if(checkMove !== 1){
          checkMove = 1
      }
      console.log(elements[elements.length - 2][0])
      forwardMarchAll()
      await sleep(500)
      if(elements[elements.length-2][0].role == "commander"){
          turnRight(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][0])
          turnHalfRight(elements[elements.length-3][0])
          forwardMarch(elements[elements.length-3][0])
          turnHalfRight(elements[elements.length-2][1])
          forwardMarch(elements[elements.length-2][1])
          forwardMarch(elements[elements.length-2][2])
          forwardMarch(elements[elements.length-3][1])
          forwardMarch(elements[elements.length-3][2])
          forwardMarch(elements[elements.length-2][3])
          turnRight(elements[elements.length - 1][0])
          forwardHalfStep(elements[elements.length - 1][0])
          forwardHalfStep(elements[elements.length-1][1])
          forwardHalfStep(elements[elements.length-1][2])
          await sleep(500)
          forwardHalfStep(elements[elements.length - 1][0])
          forwardHalfStep(elements[elements.length-1][1])
          forwardHalfStep(elements[elements.length-1][2])
          forwardMarch(elements[elements.length-3][0])
          forwardMarch(elements[elements.length-3][1])
          turnHalfRight(elements[elements.length-3][1])
          forwardMarch(elements[elements.length-3][2])
          forwardMarch(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][1])
          turnHalfRight(elements[elements.length-2][1])
          forwardMarch(elements[elements.length-2][2])
          turnHalfRight(elements[elements.length-2][2])
          forwardMarch(elements[elements.length-2][3])
          await sleep(500)
          forwardHalfStep(elements[elements.length - 1][0])
          forwardHalfStep(elements[elements.length-1][1])
          forwardHalfStep(elements[elements.length-1][2])
          forwardMarch(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][1])
          forwardMarch(elements[elements.length-2][2])
          forwardMarch(elements[elements.length-2][3])
          forwardMarch(elements[elements.length-3][0])
          forwardMarch(elements[elements.length-3][1])
          forwardMarch(elements[elements.length-3][2])
          await sleep(500)
          forwardHalfStep(elements[elements.length - 1][0])
          forwardHalfStep(elements[elements.length-1][1])
          turnRight(elements[elements.length-1][1])
          forwardHalfStep(elements[elements.length-1][2])
          forwardMarch(elements[elements.length-3][0])
          turnHalfRight(elements[elements.length-3][0])
          forwardMarch(elements[elements.length-3][1])
          forwardMarch(elements[elements.length-3][2])
          turnHalfRight(elements[elements.length-3][2])
          forwardMarch(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][1])
          forwardMarch(elements[elements.length-2][2])
          forwardMarch(elements[elements.length-2][3])
          turnHalfRight(elements[elements.length-2][2])
          turnHalfRight(elements[elements.length-2][3])
          await sleep(500)
          forwardHalfStep(elements[elements.length - 1][0])
          forwardHalfStep(elements[elements.length-2][1])
          forwardHalfStep(elements[elements.length-1][1])
          forwardHalfStep(elements[elements.length-2][2])
          forwardHalfStep(elements[elements.length-2][3])
          forwardMarch(elements[elements.length-3][0])
          forwardMarch(elements[elements.length-3][1])
          forwardMarch(elements[elements.length-3][2])
          forwardHalfStep(formation[9])
          forwardHalfStep(elements[elements.length-1][2])
          await sleep(500)
          // 6
          forwardHalfStep(elements[elements.length - 1][0])
          forwardHalfStep(elements[elements.length-2][1])
          forwardHalfStep(elements[elements.length-1][1])
          forwardHalfStep(elements[elements.length-2][2])
          forwardHalfStep(elements[elements.length-2][3])
          forwardMarch(elements[elements.length-3][0])
          forwardMarch(elements[elements.length-3][1])
          turnHalfRight(elements[elements.length-3][1])
          forwardMarch(elements[elements.length-3][2])
          forwardHalfStep(formation[9])
          forwardHalfStep(elements[elements.length-1][2])
          await sleep(500)
          // 7
          forwardHalfStep(elements[elements.length - 1][0])
          forwardHalfStep(elements[elements.length-2][1])
          forwardHalfStep(elements[elements.length-1][1])
          forwardHalfStep(elements[elements.length-2][2])
          forwardHalfStep(elements[elements.length-2][3])
          forwardMarch(elements[elements.length-3][0])
          forwardMarch(elements[elements.length-3][1])
          forwardMarch(elements[elements.length-3][2])
          forwardHalfStep(formation[9])
          forwardHalfStep(elements[elements.length-1][2])
          await sleep(500)
          // 8
          forwardHalfStep(elements[elements.length - 1][0])
          forwardHalfStep(elements[elements.length-2][1])
          forwardHalfStep(elements[elements.length-1][1])
          forwardHalfStep(elements[elements.length-2][2])
          forwardHalfStep(elements[elements.length-2][3])
          forwardMarch(elements[elements.length-3][0])
          forwardMarch(elements[elements.length-3][1])
          forwardMarch(elements[elements.length-3][2])
          forwardHalfStep(formation[9])
          forwardHalfStep(elements[elements.length-1][2])
          turnRight(elements[elements.length-1][2])
          turnHalfRight(elements[elements.length-2][3])
          turnHalfRight(elements[elements.length-3][2])
          await sleep(500)
          constantHalfStep()

          
      }else{
          if(elements[elements.length-2][elements[elements.length-2].length-1].role == "commander"){
              turnHalfRight(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              turnRight(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length - 1][0])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              turnHalfRight(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length - 1][0])
              forwardMarch(elements[elements.length-2][0])
              turnHalfRight(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              turnHalfRight(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              turnHalfRight(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardMarch(formation[9])
              await sleep(500)
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-1][1])
              turnRight(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              forwardMarch(elements[elements.length-3][0])
              turnHalfRight(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              turnHalfRight(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              turnHalfRight(elements[elements.length-2][1])
              turnHalfRight(elements[elements.length-2][2])
              forwardMarch(formation[9])
              await sleep(500)
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardHalfStep(formation[9])
              forwardHalfStep(elements[elements.length-1][2])
              await sleep(500)
              // 6
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              turnHalfRight(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardHalfStep(formation[9])
              forwardHalfStep(elements[elements.length-1][2])
              await sleep(500)
              // 7
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardHalfStep(formation[9])
              forwardHalfStep(elements[elements.length-1][2])
              await sleep(500)
              // 8
              forwardHalfStep(elements[elements.length-2][2])
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardHalfStep(formation[9])
              forwardHalfStep(elements[elements.length-1][2])
              turnHalfRight(elements[elements.length-2][2])
              turnHalfRight(elements[elements.length-3][2])
              turnHalfRight(formation[9])
              turnRight(elements[elements.length-1][2])
              await sleep(500)
              // 9
              forwardHalfStepAll()
              await sleep(500)
              // 10
              forwardHalfStepAll()
              await sleep(500)
              // 11
              forwardHalfStepAll()
              await sleep(500)
              // 12
              forwardHalfStepAll()
              turnHalfRight(formation[9])
              await sleep(500)
              // 13
              constantHalfStep()
          }else if(elements[0][0].role == "commander"){
              turnRight(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length - 1][0])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              turnHalfRight(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              turnHalfRight(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length - 1][0])
              forwardMarch(formation[9])
              turnHalfRight(formation[9])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              turnHalfRight(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-2][0])
              turnHalfRight(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              turnHalfRight(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardMarch(formation[9])
              await sleep(500)
              forwardHalfStep(elements[elements.length-1][1])
              turnRight(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              forwardMarch(elements[elements.length-3][0])
              turnHalfRight(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              turnHalfRight(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              turnHalfRight(elements[elements.length-2][1])
              turnHalfRight(elements[elements.length-2][2])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length - 1][0])
              await sleep(500)
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-1][2])
              await sleep(500)
              // 6
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-1][2])
              turnHalfRight(elements[elements.length-3][1])
              await sleep(500)
              // 7
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-1][2])
              await sleep(500)
              // 8
              forwardHalfStep(elements[elements.length - 1][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardMarch(formation[9])
              turnHalfRight(formation[9])
              forwardHalfStep(elements[elements.length-1][2])
              turnHalfRight(elements[elements.length-3][2])
              turnHalfRight(elements[elements.length-2][2])
              turnRight(elements[elements.length-1][2])
              await sleep(500)
              // 9
              forwardHalfStep(elements[elements.length-1][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(formation[9])
              await sleep(500)
              // 10
              forwardHalfStep(elements[elements.length-1][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(formation[9])
              await sleep(500)
              // 11
              forwardHalfStep(elements[elements.length-1][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(formation[9])
              await sleep(500)
              // 12
              forwardHalfStep(elements[elements.length-1][0])
              forwardHalfStep(elements[elements.length-1][1])
              forwardHalfStep(elements[elements.length-1][2])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(formation[9])
              await sleep(500)
              constantHalfStep()
          }else if(elements[elements.length-1][0].role == "commander"){
              turnRight(elements[elements.length - 2][0])
              forwardHalfStep(elements[elements.length - 2][0])
              turnRight(formation[9])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              turnHalfRight(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              turnHalfRight(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              turnHalfRight(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              forwardMarch(elements[elements.length-3][0])
              turnHalfRight(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              turnHalfRight(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              turnRight(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-4][0])
              turnHalfRight(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              turnHalfRight(elements[elements.length-4][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              turnHalfRight(elements[elements.length-3][1])
              turnHalfRight(elements[elements.length-3][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length - 2][0])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              forwardHalfStep(elements[elements.length-2][2])
              await sleep(500)
              // 6
              forwardHalfStep(elements[elements.length - 2][0])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              turnHalfRight(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              forwardHalfStep(elements[elements.length-2][2])
              await sleep(500)
              // 7
              forwardHalfStep(elements[elements.length - 2][0])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              forwardHalfStep(elements[elements.length-2][2])
              await sleep(500)
              // 8
              forwardHalfStep(elements[elements.length - 2][0])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              forwardHalfStep(elements[elements.length-2][2])
              turnRight(elements[elements.length-2][2])
              turnHalfRight(elements[elements.length-3][2])
              turnHalfRight(elements[elements.length-4][2])
              await sleep(500)
              // 9
              constantHalfStep()
          }
      }
  }

  function turnHalfLeft(cadet){
    turnLeft(cadet)
    turnHalfRight(cadet)
    drawFormation()
  }

  async function columnLeft(){
    // Need to switch how the commander moves. Maybe some more
      let turnedList = []
      if(checkMove !== 0){
          checkMove = 0
      }
      let elements = findElements()
      if(checkMove !== 1){
          checkMove = 1
      }
      console.log(elements[elements.length - 2][0])
      forwardMarchAll()
      await sleep(500)
      if(elements[elements.length-2][0].role == "commander"){
          turnLeft(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][0])
          turnHalfLeft(elements[elements.length-1/*hi*/][0])
          forwardMarch(elements[elements.length-1/*hi*/][0])
          turnHalfLeft(elements[elements.length-2][1])
          forwardMarch(elements[elements.length-2][1])
          forwardMarch(elements[elements.length-2][2])
          forwardMarch(elements[elements.length-1/*hi*/][1])
          forwardMarch(elements[elements.length-1/*hi*/][2])
          forwardMarch(elements[elements.length-2][3])
          turnLeft(elements[elements.length-3][0])
          forwardHalfStep(elements[elements.length-3][0])
          forwardHalfStep(elements[elements.length-3][1])
          forwardHalfStep(elements[elements.length-3][2])
          await sleep(500)
          forwardHalfStep(elements[elements.length-3][0])
          forwardHalfStep(elements[elements.length-3][1])
          forwardHalfStep(elements[elements.length-3][2])
          forwardMarch(elements[elements.length-1/*hi*/][0])
          forwardMarch(elements[elements.length-1/*hi*/][1])
          turnHalfLeft(elements[elements.length-1/*hi*/][1])
          forwardMarch(elements[elements.length-1/*hi*/][2])
          forwardMarch(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][1])
          turnHalfLeft(elements[elements.length-2][1])
          forwardMarch(elements[elements.length-2][2])
          turnHalfLeft(elements[elements.length-2][2])
          forwardMarch(elements[elements.length-2][3])
          await sleep(500)
          forwardHalfStep(elements[elements.length-3][0])
          forwardHalfStep(elements[elements.length-3][1])
          forwardHalfStep(elements[elements.length-3][2])
          forwardMarch(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][1])
          forwardMarch(elements[elements.length-2][2])
          forwardMarch(elements[elements.length-2][3])
          forwardMarch(elements[elements.length-1/*hi*/][0])
          forwardMarch(elements[elements.length-1/*hi*/][1])
          forwardMarch(elements[elements.length-1/*hi*/][2])
          await sleep(500)
          forwardHalfStep(elements[elements.length-3][0])
          forwardHalfStep(elements[elements.length-3][1])
          turnLeft(elements[elements.length-3][1])
          forwardHalfStep(elements[elements.length-3][2])
          forwardMarch(elements[elements.length-1/*hi*/][0])
          turnHalfLeft(elements[elements.length-1/*hi*/][0])
          forwardMarch(elements[elements.length-1/*hi*/][1])
          forwardMarch(elements[elements.length-1/*hi*/][2])
          turnHalfLeft(elements[elements.length-1/*hi*/][2])
          forwardMarch(elements[elements.length-2][0])
          forwardMarch(elements[elements.length-2][1])
          forwardMarch(elements[elements.length-2][2])
          forwardMarch(elements[elements.length-2][3])
          turnHalfLeft(elements[elements.length-2][2])
          turnHalfLeft(elements[elements.length-2][3])
          await sleep(500)
          forwardHalfStep(elements[elements.length-3][0])
          forwardHalfStep(elements[elements.length-2][1])
          forwardHalfStep(elements[elements.length-3][1])
          forwardHalfStep(elements[elements.length-2][2])
          forwardHalfStep(elements[elements.length-2][3])
          forwardMarch(elements[elements.length-1/*hi*/][0])
          forwardMarch(elements[elements.length-1/*hi*/][1])
          forwardMarch(elements[elements.length-1/*hi*/][2])
          forwardHalfStep(formation[9])
          forwardHalfStep(elements[elements.length-3][2])
          await sleep(500)
          // 6
          forwardHalfStep(elements[elements.length-3][0])
          forwardHalfStep(elements[elements.length-2][1])
          forwardHalfStep(elements[elements.length-3][1])
          forwardHalfStep(elements[elements.length-2][2])
          forwardHalfStep(elements[elements.length-2][3])
          forwardMarch(elements[elements.length-1/*hi*/][0])
          forwardMarch(elements[elements.length-1/*hi*/][1])
          turnHalfLeft(elements[elements.length-1/*hi*/][1])
          forwardMarch(elements[elements.length-1/*hi*/][2])
          forwardHalfStep(formation[9])
          forwardHalfStep(elements[elements.length-3][2])
          await sleep(500)
          // 7
          forwardHalfStep(elements[elements.length-3][0])
          forwardHalfStep(elements[elements.length-2][1])
          forwardHalfStep(elements[elements.length-3][1])
          forwardHalfStep(elements[elements.length-2][2])
          forwardHalfStep(elements[elements.length-2][3])
          forwardMarch(elements[elements.length-1/*hi*/][0])
          forwardMarch(elements[elements.length-1/*hi*/][1])
          forwardMarch(elements[elements.length-1/*hi*/][2])
          forwardHalfStep(formation[9])
          forwardHalfStep(elements[elements.length-3][2])
          await sleep(500)
          // 8
          forwardHalfStep(elements[elements.length-3][0])
          forwardHalfStep(elements[elements.length-2][1])
          forwardHalfStep(elements[elements.length-3][1])
          forwardHalfStep(elements[elements.length-2][2])
          forwardHalfStep(elements[elements.length-2][3])
          forwardMarch(elements[elements.length-1/*hi*/][0])
          forwardMarch(elements[elements.length-1/*hi*/][1])
          forwardMarch(elements[elements.length-1/*hi*/][2])
          forwardHalfStep(formation[9])
          forwardHalfStep(elements[elements.length-3][2])
          turnLeft(elements[elements.length-3][2])
          turnHalfLeft(elements[elements.length-2][3])
          turnHalfLeft(elements[elements.length-1/*hi*/][2])
          await sleep(500)
          constantHalfStep()

          
      }else{
          if(elements[elements.length-2][elements[elements.length-2].length-1].role == "commander"){
              turnHalfLeft(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              turnLeft(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][0])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              turnHalfLeft(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-2][0])
              turnHalfLeft(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              turnHalfLeft(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              turnHalfLeft(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardMarch(formation[9])
              await sleep(500)
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              turnLeft(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              turnHalfLeft(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              turnHalfLeft(elements[elements.length-1/*hi*/][2])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              turnHalfLeft(elements[elements.length-2][1])
              turnHalfLeft(elements[elements.length-2][2])
              forwardMarch(formation[9])
              await sleep(500)
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardHalfStep(formation[9])
              forwardHalfStep(elements[elements.length-3][2])
              await sleep(500)
              // 6
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              turnHalfLeft(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardHalfStep(formation[9])
              forwardHalfStep(elements[elements.length-3][2])
              await sleep(500)
              // 7
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardHalfStep(formation[9])
              forwardHalfStep(elements[elements.length-3][2])
              await sleep(500)
              // 8
              forwardHalfStep(elements[elements.length-2][2])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardHalfStep(formation[9])
              forwardHalfStep(elements[elements.length-3][2])
              turnHalfLeft(elements[elements.length-2][2])
              turnHalfLeft(elements[elements.length-1/*hi*/][2])
              turnHalfLeft(formation[9])
              turnLeft(elements[elements.length-3][2])
              await sleep(500)
              // 9
              forwardHalfStepAll()
              await sleep(500)
              // 10
              forwardHalfStepAll()
              await sleep(500)
              // 11
              forwardHalfStepAll()
              await sleep(500)
              // 12
              forwardHalfStepAll()
              turnHalfLeft(formation[9])
              await sleep(500)
              // 13
              constantHalfStep()
          }else if(elements[0][0].role == "commander"){
              turnLeft(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][0])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              turnHalfLeft(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              turnHalfLeft(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length-3][0])
              forwardMarch(formation[9])
              turnHalfLeft(formation[9])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              turnHalfLeft(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardMarch(elements[elements.length-2][0])
              turnHalfLeft(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              turnHalfLeft(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardMarch(formation[9])
              await sleep(500)
              forwardHalfStep(elements[elements.length-3][1])
              turnLeft(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              turnHalfLeft(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              turnHalfLeft(elements[elements.length-1/*hi*/][2])
              forwardMarch(elements[elements.length-2][0])
              forwardMarch(elements[elements.length-2][1])
              forwardMarch(elements[elements.length-2][2])
              turnHalfLeft(elements[elements.length-2][1])
              turnHalfLeft(elements[elements.length-2][2])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-3][0])
              await sleep(500)
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-3][2])
              await sleep(500)
              // 6
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-3][2])
              turnHalfLeft(elements[elements.length-1/*hi*/][1])
              await sleep(500)
              // 7
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardMarch(formation[9])
              forwardHalfStep(elements[elements.length-3][2])
              await sleep(500)
              // 8
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-1/*hi*/][0])
              forwardMarch(elements[elements.length-1/*hi*/][1])
              forwardMarch(elements[elements.length-1/*hi*/][2])
              forwardMarch(formation[9])
              turnHalfLeft(formation[9])
              forwardHalfStep(elements[elements.length-3][2])
              turnHalfLeft(elements[elements.length-1/*hi*/][2])
              turnHalfLeft(elements[elements.length-2][2])
              turnLeft(elements[elements.length-3][2])
              await sleep(500)
              // 9
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardHalfStep(elements[elements.length-1/*hi*/][0])
              forwardHalfStep(elements[elements.length-1/*hi*/][1])
              forwardHalfStep(elements[elements.length-1/*hi*/][2])
              forwardMarch(formation[9])
              await sleep(500)
              // 10
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardHalfStep(elements[elements.length-1/*hi*/][0])
              forwardHalfStep(elements[elements.length-1/*hi*/][1])
              forwardHalfStep(elements[elements.length-1/*hi*/][2])
              forwardMarch(formation[9])
              await sleep(500)
              // 11
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardHalfStep(elements[elements.length-1/*hi*/][0])
              forwardHalfStep(elements[elements.length-1/*hi*/][1])
              forwardHalfStep(elements[elements.length-1/*hi*/][2])
              forwardMarch(formation[9])
              await sleep(500)
              // 12
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardHalfStep(elements[elements.length-1/*hi*/][0])
              forwardHalfStep(elements[elements.length-1/*hi*/][1])
              forwardHalfStep(elements[elements.length-1/*hi*/][2])
              forwardMarch(formation[9])
              await sleep(500)
              constantHalfStep()
          }else if(elements[elements.length-1][0].role == "commander"){
              turnLeft(elements[elements.length - 2][0])
              forwardHalfStep(elements[elements.length - 2][0])
              turnLeft(formation[9])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              turnHalfLeft(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              turnHalfLeft(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              turnHalfLeft(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              forwardMarch(elements[elements.length-3][0])
              turnHalfLeft(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              turnHalfLeft(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length-2][0])
              forwardHalfStep(elements[elements.length-2][1])
              turnLeft(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-2][2])
              forwardMarch(elements[elements.length-4][0])
              turnHalfLeft(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              turnHalfLeft(elements[elements.length-4][2])
              forwardMarch(elements[elements.length-3][0])
              forwardMarch(elements[elements.length-3][1])
              forwardMarch(elements[elements.length-3][2])
              turnHalfLeft(elements[elements.length-3][1])
              turnHalfLeft(elements[elements.length-3][2])
              await sleep(500)
              forwardHalfStep(elements[elements.length - 2][0])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              forwardHalfStep(elements[elements.length-2][2])
              await sleep(500)
              // 6
              forwardHalfStep(elements[elements.length - 2][0])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              turnHalfLeft(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              forwardHalfStep(elements[elements.length-2][2])
              await sleep(500)
              // 7
              forwardHalfStep(elements[elements.length - 2][0])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              forwardHalfStep(elements[elements.length-2][2])
              await sleep(500)
              // 8
              forwardHalfStep(elements[elements.length - 2][0])
              forwardHalfStep(elements[elements.length-3][0])
              forwardHalfStep(elements[elements.length-2][1])
              forwardHalfStep(elements[elements.length-3][1])
              forwardHalfStep(elements[elements.length-3][2])
              forwardMarch(elements[elements.length-4][0])
              forwardMarch(elements[elements.length-4][1])
              forwardMarch(elements[elements.length-4][2])
              forwardHalfStep(elements[elements.length-2][2])
              turnLeft(elements[elements.length-2][2])
              turnHalfLeft(elements[elements.length-3][2])
              turnHalfLeft(elements[elements.length-4][2])
              await sleep(500)
              // 9
              constantHalfStep()
          }
      }
  }

  function aboutFaceAll(){
      if(checkMove == 1){
          aboutFace(formation[0])
          aboutFace(formation[1])
          aboutFace(formation[2])
          aboutFace(formation[3])
          aboutFace(formation[4])
          aboutFace(formation[5])
          aboutFace(formation[6])
          aboutFace(formation[7])
          aboutFace(formation[8])
          aboutFace(formation[9])
      }
  }
  async function toTheRearMarch(){
      if(checkMove !== 1){
          checkMove = 1
      }
      // await sleep(500)
      forwardMarchAll()
      await sleep(500)
      aboutFaceAll()
      await sleep(500)
      forwardMarchAll()
      await sleep(500)
      constantForwardMarch()
  }
  function rightFace(){
      if(checkMove == 1){
          turnRight(formation[0])
          turnRight(formation[1])
          turnRight(formation[2])
          turnRight(formation[3])
          turnRight(formation[4])
          turnRight(formation[5])
          turnRight(formation[6])
          turnRight(formation[7])
          turnRight(formation[8])
          turnLeft(formation[9])
      }
  }
  function leftFace(){
      if(checkMove == 1){
          turnLeft(formation[0])
          turnLeft(formation[1])
          turnLeft(formation[2])
          turnLeft(formation[3])
          turnLeft(formation[4])
          turnLeft(formation[5])
          turnLeft(formation[6])
          turnLeft(formation[7])
          turnLeft(formation[8])
          turnRight(formation[9])
      }
  }

  function commanderAboutFace(){
      aboutFace(formation[9])
  }

  async function rightFlank(){
      if(checkMove < 1){
          checkMove++
      }else if(checkMove > 1){
          return
      }else{
          forwardMarchAll()
      }
      rightFace()
      commanderAboutFace()
      await sleep(500)
      constantForwardMarch()
  }
  async function leftFlank(){
      if(checkMove < 1){
          checkMove++
      }else if(checkMove > 1){
          return
      }else{
          forwardMarchAll()
      }
      leftFace()
      commanderAboutFace()
      await sleep(500)
      constantForwardMarch()
  }
  async function reportIn(){
      forwardMarch(formation[9])
      await sleep(500)
      forwardMarch(formation[9])
      await sleep(500)
      aboutFace(formation[9])
  }
  async function rightStep(cadet){
      if (cadet.dir =="N"){
            cadet.x += 0.5; // move up
      }else if(cadet.dir =="E"){
            cadet.y += 0.5; // move up
      }else if(cadet.dir =="S"){
            cadet.x -= 0.5; // move up
      }else if(cadet.dir =="W"){
            cadet.y -= 0.5; // move up
      }
      drawFormation()
  }

  async function leftStep(cadet){
      if (cadet.dir =="N"){
            cadet.x -= 0.5; // move up
      }else if(cadet.dir =="E"){
            cadet.y -= 0.5; // move up
      }else if(cadet.dir =="S"){
            cadet.x += 0.5; // move up
      }else if(cadet.dir =="W"){
            cadet.y += 0.5; // move up
      }
      drawFormation()
  }

  function findElements() {
      const angleDeg = dirToAngle[formation[0].dir]; // use formation direction
      const angleRad = angleDeg * Math.PI / 180;
      
      // Forward vector
      const forward = {
          x: Math.cos(angleRad),
          y: -Math.sin(angleRad)
      };
      
      // Right vector (perpendicular)
      const right = {
          x: Math.cos(angleRad - Math.PI / 2),
          y: -Math.sin(angleRad - Math.PI / 2)
      };
      
      // Use squad leader (index 0 or 9 depending on your setup)
      const origin = formation[4]; // center-ish (more stable than edge)
      
      // Convert everyone into formation-relative coordinates
      const elementsMap = {};
      
      formation.forEach(cadet => {
          if (cadet.role === "commander" && checkMove === 1) return;
          const dx = cadet.x - origin.x;
          const dy = cadet.y - origin.y;
      
          const rightDist = dx * right.x + dy * right.y;
          const forwardDist = dx * forward.x + dy * forward.y;
      
          // Group by column (element)
          const spacing = 1; // tweak this if grouping is off
          const key = Math.round(rightDist / spacing);
      
          if (!elementsMap[key]) elementsMap[key] = [];
      
          elementsMap[key].push({
              cadet,
              forwardDist
          });
      });
  
      // Convert to sorted array of elements
      const elements = Object.keys(elementsMap)
          .sort((a, b) => a - b)
          .map(key => {
              return elementsMap[key]
                  .sort((a, b) => b.forwardDist - a.forwardDist)
                  .map(obj => obj.cadet);
          });
      console.log(angleDeg)
      return elements;
}

  async function closeMarch(){
      console.log(findElements())
      let exception = 0
      if(checkMove == 1){
          let formationByElements = findElements()
          formationByElements[1 + exception].forEach(cadetTemp => {
              rightStep(cadetTemp)
          })
          formationByElements[0 + exception].forEach(cadetTemp => {
              rightStep(cadetTemp)
          })
          await sleep(500)
          formationByElements[1 + exception].forEach(cadetTemp => {
              rightStep(cadetTemp)
          })
          formationByElements[0 + exception].forEach(cadetTemp => {
              rightStep(cadetTemp)
          })
          await sleep(500)
          formationByElements[0 + exception].forEach(cadetTemp => {
              rightStep(cadetTemp)
          })
          await sleep(500)
          formationByElements[0 + exception].forEach(cadetTemp => {
              rightStep(cadetTemp)
          })
      }else if(checkMove == 0){
          let formationByElements = findElements()
          formationByElements[0].forEach(cadetTemp => forwardHalfStep(cadetTemp))
          formationByElements[1].forEach(cadetTemp => {
              
          })
      }
  }
  async function extendMarch(){
      if(checkMove == 1){
          let formationByElements = findElements()
          formationByElements[1].forEach(cadetTemp => {
              leftStep(cadetTemp)
          })
          formationByElements[0].forEach(cadetTemp => {
              leftStep(cadetTemp)
          })
          await sleep(500)
          formationByElements[1].forEach(cadetTemp => {
              leftStep(cadetTemp)
          })
          formationByElements[0].forEach(cadetTemp => {
              leftStep(cadetTemp)
          })
          await sleep(500)
          formationByElements[0].forEach(cadetTemp => {
              leftStep(cadetTemp)
          })
          await sleep(500)
          formationByElements[0].forEach(cadetTemp => {
              leftStep(cadetTemp)
          })
      }else if(checkMove == 0){
          let formationByElements = findElements()
      }
  }


  function findRows() {
      const angleDeg = dirToAngle[formation[0].dir];
      const angleRad = angleDeg * Math.PI / 180;

      // Forward vector
      const forward = {
          x: Math.cos(angleRad),
          y: -Math.sin(angleRad)
      };

      // Right vector
      const right = {
          x: Math.cos(angleRad - Math.PI / 2),
          y: -Math.sin(angleRad - Math.PI / 2)
      };

      const origin = formation[4]; // center of formation
      const rowsMap = {};

      formation.forEach(cadet => {
          if (cadet.role === "commander") return; // skip commander

          const dx = cadet.x - origin.x;
          const dy = cadet.y - origin.y;

          const forwardDist = dx * forward.x + dy * forward.y;
          const rightDist = dx * right.x + dy * right.y;

          const spacing = 2;
          const key = Math.round(forwardDist / spacing);

          if (!rowsMap[key]) rowsMap[key] = [];

          rowsMap[key].push({
              cadet,
              rightDist
          });
      });

      const rows = Object.keys(rowsMap)
          .sort((a, b) => b - a) // front row first
          .map(key => {
              return rowsMap[key]
                  .sort((a, b) => a.rightDist - b.rightDist) // left to right
                  .map(obj => obj.cadet);
          });

      return rows;
  }

  async function openRanksMarch(){
      if(checkMove == 1 && ((Math.abs(formation[9].x - formation[3].x) || Math.abs(formation[9].y - formation[3].y)) > 2)){
          let formationByRows = findRows()
          formationByRows[0].forEach(cad => forwardMarch(cad))
          formationByRows[1].forEach(cad => forwardMarch(cad))
          await sleep(500)
          formationByRows[0].forEach(cad => forwardMarch(cad))
      }
  }
  async function closeRanksMarch(){
      if(checkMove == 1 && (((Math.abs(formation[3].x - formation[5].x) || Math.abs(formation[3].y - formation[5].y)) || (Math.abs(formation[7].x - formation[1].x) || Math.abs(formation[7].y - formation[5].y))) > 4)){
          let formationByRows = findRows()
          formationByRows[2].forEach(cad => forwardMarch(cad))
          formationByRows[1].forEach(cad => forwardMarch(cad))
          await sleep(500)
          formationByRows[2].forEach(cad => forwardMarch(cad))
      }
  }

  async function leftStepMarch(){
      if(checkMove == 1){
          checkMove--
          while(checkMove == 0){
              leftStep(formation[0])
              leftStep(formation[1])
              leftStep(formation[2])
              leftStep(formation[3])
              leftStep(formation[4])
              leftStep(formation[5])
              leftStep(formation[6])
              leftStep(formation[7])
              leftStep(formation[8])
              if(formation[9].dir != formation[0].dir){
                  rightStep(formation[9])
              }else{
                  leftStep(formation[9])
              }
              await sleep(500)
          }
      }
  }
  async function rightStepMarch(){
      if(checkMove == 1){
          checkMove--
          while(checkMove == 0){
              rightStep(formation[0])
              rightStep(formation[1])
              rightStep(formation[2])
              rightStep(formation[3])
              rightStep(formation[4])
              rightStep(formation[5])
              rightStep(formation[6])
              rightStep(formation[7])
              rightStep(formation[8])
              if(formation[9].dir != formation[0].dir){
                  leftStep(formation[9])
              }else{
                  rightStep(formation[9])
              }
              await sleep(500)
          }
      }
  }