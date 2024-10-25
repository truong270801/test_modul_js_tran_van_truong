var mang = new Array(10, 5, 2, 5, 6, 7, 8, 9);
function checkPrime(number) {
    if (number < 2) return false;
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) return false;
        }
        return true;
}
setTimeout(() => {
    let sum = 0;
    for (let i = 0; i < mang.length; i++) {
        sum += mang[i];
    }
    console.log("Tổng các chữ số trong mảng là:", sum);

    setTimeout(() => {
      

        console.log("Các số nguyên tố trong mảng là:",mang.filter(number =>checkPrime(number)));

        setTimeout(() => {


            console.log("Các số chia hết cho 3 trong mảng là:", mang.filter(number => number % 3 === 0));
        }, 3000);

    }, 3000);

}, 3000);
