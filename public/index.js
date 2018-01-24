// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释

function calculatePrice() {
  var items=document.getElementsByTagName("table")[0];
  var str=[];
  var allItems=loadAllItems();
  var discountChoose=loadPromotions();
  for(var i=0;i<items.rows.length;i++) {
    var num=items.rows[i].cells[0].firstChild.value;
    if(parseInt(num))
      str.push((items.rows[i].cells[1].innerHTML).trim()+' x '+(num).trim());
  }
  var message=bestCharge(str,allItems,discountChoose);
  var input=document.getElementById("message");
  input.innerHTML=message;
}

function clear() {
  var items=document.getElementsByTagName("table")[0];
  for(var i=0;i<items.rows.length;i++) {
    items.rows[i].cells[0].firstChild.value='0';
  }
  var message=document.getElementById("message");
  message.innerHTML=" ";
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
}

function showMenu() {
  var str='<table>';
  var ele=loadAllItems();
  for(var i=0;i<ele.length;i++) {
    str+='<tr><td>'+'<input type="number" name="number" value="0" min="0" max="9">'+'</td><td>  '+
      ele[i].id+'</td><td>'+ele[i].name+'</td><td>'+ele[i].price+'</td></tr>';
  }
  str+='</table>';
  document.getElementById("items").innerHTML=str;
  showDiscount();
}

function showDiscount() {
  var str='<ul>优惠信息：';
  var ele=loadPromotions();
  for(var i=0;i<ele.length;i++) {
    str+='<li>'+ele[i].type+'</li>';
  }
  str+='</ul>';
  document.getElementById("promotions").innerHTML=str;
}
