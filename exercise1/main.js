function checkPerfectNumber(num) {
    let sum = 0;
    for (let i = 1; i <= num / 2; i++) {
        if (num % i === 0) {
            sum += i;
        }
    }
    if(sum === num && num !== 0){
        return true;
    }else{
        return false;
    }
   
}

setInterval(() => {
    const numRandom =  Math.floor(Math.random() * 100) + 1;
    console.log(numRandom)
    if(checkPerfectNumber(numRandom)){
        console.log("là số hoàn hảo")

    }
    else{
        console.log("không phải là số hoàn hảo")
    }
},2000);