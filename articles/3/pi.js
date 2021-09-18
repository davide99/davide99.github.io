function init_canvas() {
    const canvas = document.getElementById("canvas");
    
    window.pi_ctx = {
        canvas: canvas,
        ctx: canvas.getContext("2d"),
        p: document.getElementById("par_pi"),
        size: Math.min(canvas.width, canvas.height),
        mean_pi: 0,
        iter: 0,
        should_stop: true,
    
        animate: function() {
            var in_points = 0;
            const tot_points = 10000;
    
            for (let i = 0; i < tot_points; i++) {
                const x = Math.random();
                const y = Math.random();
            
                //Sono nel cerchio o meno?
                if (Math.hypot(x, y) < 1) {
                    this.ctx.fillStyle = "rgb(255,0,0)";
                    in_points++;
                } else {
                    this.ctx.fillStyle = "rgb(0,255,0)";
                }
                this.ctx.fillRect(Math.ceil(x * this.size), Math.ceil(y * this.size), 1, 1);
            }
    
            this.iter++;
            const current_pi = in_points * 4.0 / tot_points;
            this.mean_pi = (this.mean_pi * (this.iter-1) + current_pi)/this.iter;
            this.p.innerHTML = "<b>Current</b>: " + current_pi + "<br><b>Mean</b>: " + this.mean_pi + "<br><b>Iteration</b>: " + this.iter;
            const t = this;
    
            if (!this.should_stop){
                requestAnimationFrame(function() {
                    t.animate();
                });
            }
        },
    
        change_state: function() {
            this.should_stop = !this.should_stop;
            
            if (!this.should_stop)
                this.animate();
        }
    };
    
    //Disegno quadrato
    pi_ctx.ctx.fillStyle = "rgba(0,255,0,0.2)";
    pi_ctx.ctx.strokeStyle = "rgb(0,255,0)";
    pi_ctx.ctx.rect(0, 0, pi_ctx.size, pi_ctx.size);
    pi_ctx.ctx.fill();
    pi_ctx.ctx.stroke();
    
    //Disegno 1/4 di cerchio
    pi_ctx.ctx.fillStyle = "rgba(255,0,0,0.2)";
    pi_ctx.ctx.strokeStyle = "rgb(255,0,0)";
    pi_ctx.ctx.beginPath();
    pi_ctx.ctx.arc(0, 0, pi_ctx.size, 0, 0.5*Math.PI);
    pi_ctx.ctx.lineTo(0, 0);
    pi_ctx.ctx.lineTo(pi_ctx.size, 0);
    pi_ctx.ctx.fill();
    pi_ctx.ctx.stroke();
}

window.addEventListener("load", init_canvas, true);