class Shape { 
  constructor(world, pos, size,options){
    this.world = world;
    this.pos = pos;
    this.size = size;
    this.color = color;
    this.body = this.createBody(pos, options);
    Matter.Composite.add(engine.world, this.body);
  }

  createBody(pos, options){

  }
  dipsplay(){

  }
}