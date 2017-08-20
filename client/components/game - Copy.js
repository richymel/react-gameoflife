export default function game (p) {
  let rotation = 0;
 
  p.setup = function () {
    console.log('setup');
    p.createCanvas(600, 400, p.WEBGL);
  };
 /*
  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation){
      rotation = props.rotation * Math.PI / 180;
    }
  };
 */
  p.draw = function () {
    console.log('draw is running');
    p.background(100);
    p.noStroke();
    p.push();
    //p.rotateY(rotation);
    p.box(100);
    p.pop();
    p.fill(255,255,0);
    p.rectangle(50,50,100,250);
  };
};