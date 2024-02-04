window.onload = function () {
    var header = document.getElementById('header');
    var pictures = new Array('./resources/images/hpBackgroundREV.png', './resources/images/hpBackgroundREV.png');
    var numPics = pictures.length;
    if (document.images) {
        var chosenPic = Math.floor((Math.random() * numPics));
        header.style.background = 'url(' + pictures[chosenPic] + ')';
    }

