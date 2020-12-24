function getClientWidth(){
    let myWidth = 0;
    if( typeof window.innerWidth === "number" ) {
        myWidth = window.innerWidth;//Non-IE
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        myWidth = document.documentElement.clientWidth;//IE 6+ in 'standards compliant mode'
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        myWidth = document.body.clientWidth;//IE 4 compatible
    }
    return myWidth;
}
/*
    This function returns the height of the available screen real estate that we have
*/
function getClientHeight(){
    let myHeight = 0;
    if( typeof window.innerHeight === "number" ) {
        myHeight = window.innerHeight;//Non-IE
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        myHeight = document.documentElement.clientHeight;//IE 6+ in 'standards compliant mode'
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        myHeight = document.body.clientHeight;//IE 4 compatible
    }
    return myHeight;
}

let $canvas = $('#canvas');
$canvas.attr("width", getClientWidth().toString());
$canvas.attr("height", getClientHeight().toString());
$('#rect1').attr("y", (getClientHeight() - parseInt($('#rect1').attr("height"))).toString());
$('#rect2').attr("x", (getClientWidth() / 2 - parseInt($('#rect2').attr("width")) / 2).toString());
$('#rect2').attr("y", (getClientHeight() - parseInt($('#rect2').attr("height"))).toString());
$('#rect3').attr("x", (getClientWidth() - parseInt($('#rect3').attr("width")) / 2).toString());
$('#rect3').attr("y", (getClientHeight() - parseInt($('#rect3').attr("height"))).toString());
