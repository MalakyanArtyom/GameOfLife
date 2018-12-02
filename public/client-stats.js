var socket = io.connect('http://localhost:4444');
var table = document.getElementById("statistics");


setInterval(function(){
    socket.emit("get stats", []);
}, 10000);


socket.on("send stats",function(statistics){
    statistics = JSON.parse(statistics);
    table.innerHTML = "";
    tableHTML = "<tr><td>Ժամանակ</td><td>Ձվեր</td><td>frameCount</td></tr>";
    for(var st of statistics){
        tableHTML+="<tr>";
        tableHTML+="<td>"+st.timestamp+"</td>";
        tableHTML+="<td>"+st.eggsput+"</td>";
        tableHTML+="<td>"+st.framecount+"</td>";
        tableHTML+="</tr>";
    }

    table.innerHTML = tableHTML;
})