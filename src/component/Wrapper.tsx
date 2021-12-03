import { P5Instance } from "react-p5-wrapper";

export default function sketch(p5: P5Instance) {
    let MAX_HEIGHT = window.innerHeight / 2;
    let DENSITY = 20;
    let GAP = MAX_HEIGHT / DENSITY;
    let STROKE_COLOR = "Blue";
    let TONES_1 = [[238, 66, 102], [31, 64, 104], [242, 228, 181]];
    

  p5.setup = () => {
    p5.createCanvas(MAX_HEIGHT,MAX_HEIGHT);
    p5.noLoop();
    }

    //update the Canvas when recevie the new props
  p5.updateWithProps = props => {
    if (props.density !== null) {
        GAP = MAX_HEIGHT / props.density;
        p5.clear();
        p5.redraw();
    }
    if (props.stroke !== null) {
        STROKE_COLOR = props.stroke;
        p5.clear();
        p5.redraw();
    }
    if (props.colorSet !== null){
        TONES_1 = props.colorSet;
        p5.clear();
        p5.redraw();
    }
  };

  p5.draw = () => {
    let lines = [];
    let odd = false;
    p5.stroke(STROKE_COLOR);
    for(let y = GAP / 2; y <= MAX_HEIGHT; y += GAP) {
        odd = !odd;
        let trait = [];
        let oddFactor = odd ? GAP/2 : 0;
        for(let x = GAP / 4; x <= MAX_HEIGHT; x += GAP) {
          trait.push({
            x: x + (Math.random()*.8 - 0.4) * GAP + oddFactor,
            y: y + (Math.random()*.8 - 0.4) * GAP
          });
        }
        lines.push(trait);
      }
    odd = true;
    for(let y = 0; y < lines.length - 1; y++) {
        odd = !odd;
        let dotLine = [];
        for(let i = 0; i < lines[y].length; i++) {
          dotLine.push(odd ? lines[y][i]   : lines[y+1][i]);
          dotLine.push(odd ? lines[y+1][i] : lines[y][i]);
        }
        for(let i = 0; i < dotLine.length - 2; i++) {

          let random_index = Math.floor(Math.random() * TONES_1.length);
          let [r, g, b] = TONES_1[random_index];
          p5.fill(r, g, b);
          p5.triangle(dotLine[i].x, dotLine[i].y, dotLine[i+1].x, dotLine[i+1].y, dotLine[i+2].x, dotLine[i+2].y)

        }
      }
  };

}
