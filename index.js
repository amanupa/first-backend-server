console.log("Hello World!");

 function add(a,b){
    return a+b;
}
console.log(add(2,8));

function sortAray(arr){
    for(var i=0;i < arr.length;i++){
        for(var y=i;y<arr.length;y++){
            if(arr[i]>arr[y+1]){
                var x=arr[i];
                arr[i]=arr[y+1];
                arr[y+1]=x;
            }

        }
       
    }
}
var array=[8,6,2,1,9,4];

sortAray(array);
printSortedArray(array);

function printSortedArray(jrr){
    for(var j=0;j<jrr.length;j++){
        console.log(jrr[j]);
    }
}