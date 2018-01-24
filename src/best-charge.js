/*module.exports=*/function bestCharge(selectedItems,allItems,discountChoose) {
  var buyFoodItems=buyFood(selectedItems,allItems);
  buyFoodItems=chooseBest(buyFoodItems,discountChoose);
  var printStr=printItems(buyFoodItems);
  return printStr;
}

function buyFood(selectedItems,allItems) {
  var items=splitItems(selectedItems);
  var buyFoodItems=[];
  items.forEach(function (ele) {
    var a=allItems.find(function (e) {return e.id==ele[0];});
    if(!a){
      return "发生错误，菜单无此选项！";
    }
    buyFoodItems.push({id:a.id,name:a.name,price:a.price,count:ele[1],sum:a.price*ele[1]});
  });
  return buyFoodItems;
}

function splitItems(items) {
  var itemsAfterSplit=[];
  for(var i=0;i<items.length;i++){
    itemsAfterSplit.push([items[i].substring(0,8),parseInt(items[i].substring(11,12))]);
  }
  return itemsAfterSplit;
}

function chooseBest(items,discountChoose) {
  let charge1=0;
  let addPrice=0;
  let charge2=0;
  items.forEach(function (ele) {
    if(discountChoose[1].items.indexOf(ele.id)>=0){
      charge2+=ele.sum/2;
      ele.discount=ele.sum/2;
      ele.charge="指定菜品半价";
    }
    else{
      ele.discount=0;
      ele.charge="指定菜品半价";
    }
    addPrice+=ele.sum;
  });
  charge1=addPrice>30?parseInt(addPrice/30)*6:0;
  if(charge1>=charge2){
    items.forEach(function (ele) {
      ele.discount=charge1;
      ele.charge="满30减6元";
    });
  }
  if(charge1==0&&charge2==0){
    items.forEach(function (ele) {
      ele.charge="无优惠";
    });
  }
  return items;
}

function printItems(items) {
  var str='============= 订餐明细 =============\n';
  var discountItemsWithCharge2=[];
  var chargeType;
  var saveMoney=0;
  var MoneyNoCharge=0;
  for(var ele of items){
    str+=ele.name+' x '+ele.count+' = '+ele.sum+'元\n';
    if(ele.charge=='指定菜品半价'&&ele.discount!=0){
      discountItemsWithCharge2.push(ele.name);
      saveMoney+=ele.discount;
      chargeType=ele.charge;
      MoneyNoCharge+=ele.sum;
    }
    if(ele.charge=='满30减6元'){
      chargeType=ele.charge;
      saveMoney=ele.discount;
      MoneyNoCharge+=ele.sum;
    }
    if(ele.discount==0){
      chargeType=ele.charge;
      MoneyNoCharge+=ele.sum;
    }
  }
  str+='-----------------------------------\n';
  if(chargeType=='指定菜品半价'){
    str+='使用优惠:\n'+
        chargeType+'('+discountItemsWithCharge2.join('，')+')，省'+saveMoney+'元\n'+
      '-----------------------------------\n';
  }
  if(chargeType=='满30减6元'){
    str+='使用优惠:\n'+
      chargeType+'，省'+saveMoney+'元\n'+
      '-----------------------------------\n';
  }
  str+='总计：'+parseInt(MoneyNoCharge-saveMoney)+'元\n'+
    '===================================';
  return str;
}
