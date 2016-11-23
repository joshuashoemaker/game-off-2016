function nextAnimationFrame(animation){
    if(animation.frameIndex >= animation.frameLength){
            animation.frameIndex = 1;
        }
        else{
            animation.frameIndex++;
        }
        return animation.frameIndex;
}