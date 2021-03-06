(function() {
    if ('serviceWorker' in navigator) {
        if(!navigator.serviceWorker.controller) {
            navigator.serviceWorker.register('https://jayvir101.github.io/sw.js',{
                scope: 'https://jayvir101.github.io'
            });
        }
    }
})();
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Games.sort(function(a,b) {
    if (a.Title < b.Title) return -1;
    if (a.Title > b.Title) return 1;
    return 0;
});

var Columns = 8;
Games.forEach(function(item,index) {
  var Icon_Holder = document.createElement("div");
  var Icon_Img = document.createElement("img");
  var Icon_Title = document.createElement("div");
  Games_Add_Click(Icon_Img,item.Title);
  Icon_Holder.id = "Icon_Holder";
  Icon_Holder.setAttribute("data-Game-Title",item.Title);
  Icon_Img.id = "Icon_Img";
  Icon_Title.id = "Icon_Title";
  Icon_Img.src = item.Icon;
  Icon_Title.innerText = item.Title.replaceAll("-"," ");
  Icon_Img.title = item.Title;
  Icon_Holder.appendChild(Icon_Img);
  Icon_Holder.appendChild(Icon_Title);
  document.getElementById("Games").appendChild(Icon_Holder);
  if ((index + 1) % Columns === 0) {
    var br = document.createElement("br");
    document.getElementById("Games").appendChild(br);
  }
});

function Games_Add_Click(element,link) {
  var Link = link;
  element.addEventListener("click",function(e) {
    light.app.open("https://jayvir101.github.io/lightning/Games/?link=" + Link,false,{'id':Link});
      firebase.database().ref("GamesCount/" + Link).transaction(function(current) {
          return current + 1;
      });
  });
}

(function() {
    var Icon_Holder = document.querySelectorAll("#Icon_Holder");
    var Search = document.getElementById("Search");
    Search.onkeyup = function() {
        var filter = Search.value.toUpperCase();
        Icon_Holder.forEach(function(item) {
            if(item.getAttribute("data-Game-Title").toUpperCase().replaceAll("-"," ").indexOf(filter) > -1) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    };
})();