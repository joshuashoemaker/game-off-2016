function getDistance(a, b) { 
    let aX = Math.abs(a.x);
    let aY = Math.abs(a.y);
    let bX = Math.abs(b.x);
    let bY = Math.abs(b.y);

    let xAxisDist = Math.abs(aX - bX);
    let yAxisDist = Math.abs(aY - bY);

    let c = (xAxisDist * xAxisDist) + (yAxisDist * yAxisDist)
    return Math.sqrt(c);
 }

 function isInRange(distance, range){
     if(distance < range){
         return true;
     }
     else{
         return false;
     }
 }

 function moveTowards(a, b, speed){
     let aX = a.x;
     let bX = b.x;
     let newX = 0;

     if(aX < bX){
         newX = aX + speed;
     }
     else{
         newX = aX - speed;
     }
     return newX;
 }