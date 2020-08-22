var path = 1;
var count = 0;
for(var i=0;i<related_1.length;i++){
  if(related_1[i].id == id_2){
    console.log("found");
    path = 1;
    count = 1;
    related_1 = [];
    break;
  }
}
if(count!=1){
for(var i =0;i<related_1.length;i++){
  var datas2 = check(related_1[i].id);
  for(var j = 0;j<20;j++){
    if(datas2[j] == id_2){
      console.log("found");
      path = path + 1;
      count = 1;
      related_1 = [];
      break;
    }
    else{
      datasBig.push(datas2[j]);
    }
  }
  if(count==1){
    break;
  }
}
related_1 = datasBig ;
datasBig = [];
path = path + 1;
}

if(count!=1){
for(var i =0;i<related_1.lenth;i++){
var datas2 = check(related_1[i].id);
for(var j=0;j<20;j++){
if(datas2[j] == id_2){
 console.log("found");
 path = path + 1;
 count = 1;
 break;
 related_1 = [];
}
else{
 datasBig.push(datas2[j]);
}
}
if(count == 1){
break;
}
}
related_1 = datasBig;
datasBig = [];
path = path + 1;
}

if(count!=1){
  for(var i =0;i<related_1.lenth;i++){
    var datas2 = check(related_1[i].id);
    for(var j = 0; j < 20; j++){
      if(datas2[j] == id_2){
        console.log("found");
        path = path + 1;
        count = 1;
        related_1 = [];
        break;
      }
      else{
        datasBig.push(datas2[j]);
      }
    }
    if(count == 1){
      break;
    }
  }
  related_1 = datasBig;
  datasBig = [];
path = path + 1;
}



while(count!=1){
if(count!=1){
  for(var i =0;i<related_1.lenth;i++){
    var datas2 = check(related_1[i].id);
    for(var j = 0; j < 20; j++){
      if(datas2[j] == id_2){
        console.log("found");
        path = path + 1;
        count = 1;
        related_1 = [];
        break;
      }
      else{
        datasBig.push(datas2[j]);
      }
    }
    if(count == 1){
      break;
    }
  }
  related_1 = datasBig;
  datasBig = [];
path = path + 1;
}
}
