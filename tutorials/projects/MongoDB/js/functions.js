$(document).ready( function(){
         
         
            create_ace("javascript");
         
});
         
       
       
// ace object creat function
// add new id to all <pre> tags and create a new object for that
function create_ace (code) { 
   
    var num = document.getElementsByTagName('pre');   
    for(var i=0; i<num.length; i++){
        var editor = "editor"+i;
        document.getElementsByTagName('pre')[i].setAttribute("id",editor);
        var editor = ace.edit(editor);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
        editor.setReadOnly(true);
        editor.setShowGutter(true);   
        editor.setOptions({
            //maxLines: Infinity
            maxLines: editor.session.getLength();
        });
    }        
}


