
$( document ).ready(function() {


function doIframe() {
    var $iframes = $("iframe.autoHeight"); 
    $iframes.each(function() {
        var iframe = this;
        $(iframe).load(function() {
            setHeight(iframe);
        });
    });
}

function setHeight(e) {
  e.height = e.contentWindow.document.body.scrollHeight + 35;
}

$(window).load(function() {
    doIframe();
});




});