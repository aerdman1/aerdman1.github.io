window.onload = function () {
    var header = document.getElementById('header');
    var pictures = new Array('./resources/images/hpBackgroundREV.png', './resources/images/hpBackgroundREV.png');
    var numPics = pictures.length;
    if (document.images) {
        var chosenPic = Math.floor((Math.random() * numPics));
        header.style.background = 'url(' + pictures[chosenPic] + ')';
    }


//Crazy Lines!
var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),

    opts = {

        len: 210,
        count: 999,
        baseTime: 110,
        addedTime: 2,
        dieChance: .05,
        spawnChance: 1,
        sparkChance: 1,
        sparkDist: .1,
        sparkSize: .1,

        color: 'hsl(hue,100%,light%)',
        baseLight: 22,
        addedLight: 33, 
        shadowToTimePropMult: 1,
        baseLightInputMultiplier: .01,
        addedLightInputMultiplier: .02,

        cx: w / 2,
        cy: h / 2,
        repaintAlpha: .01,
        hueChange: .5
    },

    tick = 0,
    lines = [],
    dieX = w / 2 / opts.len,
    dieY = h / 2 / opts.len,

    baseRad = Math.PI * 2 / 12;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, w, h);

function loop() {

    window.requestAnimationFrame(loop);

    ++tick;

    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha);
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    if (lines.length < opts.count && Math.random() < opts.spawnChance)
        lines.push(new Line);

    lines.map(function (line) { line.step(); });
}
function Line() {

    this.reset();
}
Line.prototype.reset = function () {

    this.x = 0;
    this.y = 0;
    this.addedX = 0;
    this.addedY = 0;

    this.rad = 0;

    this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();

    this.color = opts.color.replace('hue', tick * opts.hueChange);
    this.cumulativeTime = 0;

    this.beginPhase();
}
Line.prototype.beginPhase = function () {

    this.x += this.addedX;
    this.y += this.addedY;

    this.time = 0;
    this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;

    this.rad += baseRad * (Math.random() < .5 ? 1 : -1);
    this.addedX = Math.cos(this.rad);
    this.addedY = Math.sin(this.rad);

    if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY)
        this.reset();
}
Line.prototype.step = function () {

    ++this.time;
    ++this.cumulativeTime;

    if (this.time >= this.targetTime)
        this.beginPhase();

    var prop = this.time / this.targetTime,
        wave = Math.sin(prop * Math.PI / 2),
        x = this.addedX * wave,
        y = this.addedY * wave;

    ctx.shadowBlur = prop * opts.shadowToTimePropMult;
    ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier));
    ctx.fillRect(opts.cx + (this.x + x) * opts.len, opts.cy + (this.y + y) * opts.len, 2, 2);

    if (Math.random() < opts.sparkChance)
        ctx.fillRect(opts.cx + (this.x + x) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, opts.cy + (this.y + y) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, opts.sparkSize, opts.sparkSize)
}
loop();

window.addEventListener('resize', function () {

    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    opts.cx = w / 2;
    opts.cy = h / 2;

    dieX = w / 2 / opts.len;
    dieY = h / 2 / opts.len;
});
    }