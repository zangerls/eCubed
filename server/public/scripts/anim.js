/* JAVASCRIPT TEMPLATE FOR THE ANIMATION FLOATING BALL ON THE LANDING PAGE - USES THE ANIME.JS LIBRARY */

function fitElementToParent(el, padding) {
    let timeout = null;
    function resize() {
        if (timeout) clearTimeout(timeout);
        anime.set(el, {scale: 1});
        let pad = padding || 0;
        let parentEl = el.parentNode;
        let elOffsetWidth = el.offsetWidth - pad;
        let parentOffsetWidth = parentEl.offsetWidth;
        let ratio = parentOffsetWidth / elOffsetWidth;
        timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
    }
    resize();
    window.addEventListener('resize', resize);
}

let sphereAnimation = (function() {

    
    let sphereEl = document.querySelector('.sphere-animation');
    let spherePathEls = sphereEl.querySelectorAll('.sphere path');
    let pathLength = spherePathEls.length;
    let hasStarted = false;
    let aimations = [];

    fitElementToParent(sphereEl);

    
        let breathAnimationGreen = anime({
            begin: function() {
                for (var i = 0; i < pathLength; i++) {
                    aimations.push(anime({
                        targets: spherePathEls[i],
                        stroke: {value: ['rgb(53, 204, 187)', 'rgba(163, 163, 163,.35)'], duration: 500},
                        translateX: [2, -4],
                        translateY: [2, -4],
                        easing: 'easeOutQuad',
                        autoplay: false
                    }));
                }
            },
            update: function(ins) {
                aimations.forEach(function(animation, i) {
                    var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
                    animation.seek(animation.duration * percent);
                });
            },
            duration: Infinity,
            autoplay: false
        });

        let breathAnimationRed = anime({
            begin: function() {
                for (var i = 0; i < pathLength; i++) {
                    aimations.push(anime({
                        targets: spherePathEls[i],
                        stroke: {value: ['rgb(209, 19, 19)', 'rgba(163, 163, 163,.35)'], duration: 500},
                        translateX: [2, -4],
                        translateY: [2, -4],
                        easing: 'easeOutQuad',
                        autoplay: false
                    }));
                }
            },
            update: function(ins) {
                aimations.forEach(function(animation, i) {
                    var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
                    animation.seek(animation.duration * percent);
                });
            },
            duration: Infinity,
            autoplay: false
        });
    

    

    let introAnimation = anime.timeline({
        autoplay: false
    })
        .add({
            targets: spherePathEls,
            strokeDashoffset: {
                value: [anime.setDashoffset, 0],
                duration: 3900,
                easing: 'easeInOutCirc',
                delay: anime.stagger(190, {direction: 'reverse'})
            },
            duration: 2000,
            delay: anime.stagger(60, {direction: 'reverse'}),
            easing: 'linear'
        }, 0);

    let shadowAnimation = anime({
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: 30000,
        easing: 'easeOutQuint',
        autoplay: false
    }, 0);

    async function init() {

        /* SCRAPES THE ASSET STATUS FROM THE LANDING PAGE */
        let status = document.getElementById('assetText').innerHTML;

        /* LETS THE BALL WAVE IN RED IF STATUS CONTAINS THE WORD INACTIVE */
        if (status.includes("inactive") === true) {
            breathAnimationRed.play();
        }
        /* IF ASSET STATUS DOES NOT CONTAIN WORD INACTIVE THE BALL WAVES BLUE */
        else {
            breathAnimationGreen.play();
        }

        introAnimation.play();
        shadowAnimation.play();
    }

    init();

})();