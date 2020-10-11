import React, { useRef, useEffect } from 'react'

const Canvas = props => {


    const drawArrow = (context) => {
        context.lineWidth = 1;
        context.fillStyle = "#565C98";
        context.beginPath();
        context.moveTo(300 - 10, 20 - (3 + 5));
        context.lineTo(300 + 10, 20 - (3 + 5));
        context.lineTo(300 + 10, 20 - (3 - 15));
        context.lineTo(300 + 20, 20 - (3 - 15));
        context.lineTo(300 + 0, 20 - (3 - 33));
        context.lineTo(300 - 20, 20 - (3 - 15));
        context.lineTo(300 - 10, 20 - (3 - 15));
        context.lineTo(300 - 10, 20 - (3 + 5));
        context.fill();
    }

    const calcSliceDeg = (slices) => {
        const totalWeight = slices.reduce((a, b) => {
            return parseInt(a) + parseInt(b.weight)
        }, [0]);

        const segmentDeg = parseInt(360 / totalWeight)


        //Find the highest
        const highestContender = slices.reduce((a, b) => a.weight > b.weight ? a : b);
        //Find if there are others
        let allHighestContenders = []
        for (let slice of slices) {

            if (slice.weight === highestContender.weight) {
                allHighestContenders.push(slice)
            }
        }

        //Randomly add the surplus degs for one of the highest
        let bonusContestantName = undefined
        if (allHighestContenders.length > 0) {
            const ranIndex = Math.floor(Math.random() * allHighestContenders.length);
            bonusContestantName = allHighestContenders[ranIndex].name;
        }


        //Check if there's surplus
        let surplus = 360;
        for (let slice of slices) {
            const toBeAdded = segmentDeg * slice.weight;
            slice.sliceDeg = toBeAdded;
            surplus -= toBeAdded;
        }

        for (let slice of slices) {
            if (slice.name === bonusContestantName) {
                slice.sliceDeg += surplus
                break;
            }
        }
        return slices;
    }

    const rand = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    const getColor = (index) => {
        return ['#A6A2DC', ' #7473BD', '#565C98']
        // if slices.length % 2 === 0 
    }

    var color = ['#A6A2DC', ' #7473BD', '#565C98'];
    let slices = [
        { name: 'Tatu', weight: 2, sliceDeg: 45 },
        { name: 'Santeri', weight: 2, sliceDeg: 45 },
        { name: 'Rasmus', weight: 1, sliceDeg: 45 },
        { name: 'Matti', weight: 2, sliceDeg: 45 },
        { name: 'Teppo', weight: 2, sliceDeg: 45 },
        { name: 'Veeti', weight: 10, sliceDeg: 45 },
    ]

    slices = calcSliceDeg(slices);
    var deg = rand(0, 360);
    var speed = 0;
    var slowDownRand = 0;
    var completed = false;
    //var ctx = canvas.getContext('2d');
    var width = 500; // size
    var center = width / 2 + 50;      // center
    var isStopped = false;
    setTimeout(function () {
        isStopped = true;
    }.bind(this, isStopped), 10000)
    var lock = false;

    const canvasRef = useRef(null)

    const draw = (ctx, frameCount) => {


        function deg2rad(deg) {
            return deg * Math.PI / 180;
        }

        function drawSlice(deg, color, sliceDeg) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.moveTo(center, center);
            ctx.arc(center, center, width / 2, deg2rad(deg), deg2rad(deg + sliceDeg));
            ctx.lineTo(center, center);
            ctx.fill();
        }

        function drawText(deg, text) {
            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(deg2rad(deg));
            ctx.textAlign = "center";
            ctx.fillStyle = "#fff";
            ctx.font = 'bold 30px sans-serif';
            ctx.fillText(text, 150, 10);
            ctx.restore();
        }

        function drawImg() {
            ctx.clearRect(0, 0, width, width);
            for (var i = 0; i < slices.length; i++) {
                drawSlice(deg, pickColor(i), slices[i].sliceDeg);
                drawText(deg + slices[i].sliceDeg / 2, slices[i].name);
                deg += slices[i].sliceDeg;
            }
        }

        function pickColor(index) {
            return getColor(index)[(index % color.length)];
        }

        function resolveWinner(endDeg) {
            let currentDeg = 0;
            for (let slice of slices) {
                if (endDeg <= currentDeg + slice.sliceDeg) {
                    return slice
                }
                currentDeg += slice.sliceDeg
            }
        }

        function anim() {
            deg += speed;
            deg %= 360;
            // Increment speed
            if (!isStopped && speed < 3) {
                speed = speed + 1 * 0.1;
            }
            // Decrement Speed
            if (isStopped) {
                if (!lock) {
                    lock = true;
                    slowDownRand = rand(0.994, 0.998);
                }
                speed = speed > 0.2 ? speed *= slowDownRand : 0;
            }
            // Stopped!
            if (lock && !speed && !completed) {
                const winner = resolveWinner((360 - deg - 90) % 360)
                completed = true;

                return console.log("You got:\n" + winner.name); // Get Array Item from end Degree
            }

            drawImg();
            drawArrow(ctx);

        };

        anim();

    }

    const resizeCanvasToDisplaySize = (canvas) => {

        const { width, height } = canvas.getBoundingClientRect()

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width
            canvas.height = height
            return true // here you can return some usefull information like delta width and delta height instead of just true
            // this information can be used in the next redraw...
        }

        return false
    }


    const postdraw = (ctx, index) => {
        index++
        ctx.restore()
    }

    const predraw = (context, canvas) => {
        context.save()
        resizeCanvasToDisplaySize(canvas)
        const { width, height } = context.canvas
        context.clearRect(0, 0, width, height)
    }




    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId
        const render = () => {
            frameCount++
            draw(context, frameCount)
            window.requestAnimationFrame(render);
        }
        render()
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])


    return <canvas width={1000} height={600} ref={canvasRef} {...props} />
}

export default Canvas
