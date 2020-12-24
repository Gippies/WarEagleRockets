function getClientWidth(){
    if( typeof window.innerWidth === "number" ) {
        return window.innerWidth;//Non-IE
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        return document.documentElement.clientWidth;//IE 6+ in 'standards compliant mode'
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        return document.body.clientWidth;//IE 4 compatible
    }
    return 0;
}
/*
    This function returns the height of the available screen real estate that we have
*/
function getClientHeight(){
    if( typeof window.innerHeight === "number" ) {
        return window.innerHeight;//Non-IE
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        return document.documentElement.clientHeight;//IE 6+ in 'standards compliant mode'
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        return document.body.clientHeight;//IE 4 compatible
    }
    return 0;
}

let $canvas = $('#canvas');
$canvas.attr("width", getClientWidth().toString());
$canvas.attr("height", getClientHeight().toString());
$('#rect1').attr("y", (getClientHeight() - parseInt($('#rect1').attr("height"))).toString());
$('#rect2').attr("x", (getClientWidth() / 2 - parseInt($('#rect2').attr("width")) / 2).toString());
$('#rect2').attr("y", (getClientHeight() - parseInt($('#rect2').attr("height"))).toString());
$('#rect3').attr("x", (getClientWidth() - parseInt($('#rect3').attr("width"))).toString());
$('#rect3').attr("y", (getClientHeight() - parseInt($('#rect3').attr("height"))).toString());
