jQuery(document).ready(function(){
    jQuery.get('http:/localhost:8080/api/',{},function(data,statusMessage,jqxhr) {
        console.log(status);
        console.log(message);
        console.dir(jqxml);
    });
}); 