class Airplane
{
    constructor(color)
    {
        this._color = color;

        this.reinit();
        this._trail_clk = 0;
        this._trail = [5].fill([-1, -1], 0, 4)
        this._trail_idx = 0;
    }

    reinit()
    {
        const base_spd = windowWidth / 200;
        this._xpos = windowWidth * Math.random();
        this._ypos = -150;

        this._xvel = 10 * (Math.random() - 0.5);
        this._xaccel = 0.1 * (Math.random() - 0.5);
        this._yvel = base_spd + (base_spd / 2) * (Math.random() - 0.5);
    }

    display() 
    {
        fill(this._color);
        
        push();
        translate(this._xpos, this._ypos);
        rotate(-Math.atan2(this._xvel, this._yvel));
        rect(-25, 10, 50, 15);
        ellipse(0, 80, 20, 130);
        ellipse(0, 100, 150, 20);
        pop();

        for (const t of this._trail)
        {
            circle(t[0], t[1], 10);
        }
    }

    step()
    {
        if (this._trail_clk == 0)
        {
            this._trail[this._trail_idx] = [this._xpos, this._ypos];
            this._trail_idx = (this._trail_idx + 1) % 5;
        }
        
        this._trail_clk = (this._trail_clk + 1) % 5;
        this._xpos += this._xvel;
        this._xvel += this._xaccel;
        this._ypos += this._yvel;

        if (this._ypos > windowHeight + 10)
            this.reinit();
    }
}

var airplanes = [];

function setup() 
{
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('landingPageCanvas');

    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    for (idx = 0; idx < 7; idx++)
        airplanes.push(new Airplane(color(colors[idx])));
}
  
function draw() 
{
    noStroke();
    fill(color(135, 206, 250));
    rect(0, 0, windowWidth, windowHeight)

    for (idx = 0; idx < 7; idx++)
    {
        airplane = airplanes[idx];
        airplane.display();
        airplane.step();
    }
}