const Palette = () => {
  return (
    <div className="flex flex-col items-center gap-1">
      <h1>H1 heading</h1>
      <h2>H2 heading</h2>
      <h3>H3 heading</h3>
      <h4>H4 heading</h4>
      <h5>H5 heading</h5>
      <p>hello world</p>
      <button className="btn btn-sm">click me!</button>
      <button className="btn">click me!</button>
      <button className="btn btn-lg">click me!</button>

      <button className="btn btn-sm bg-success">click me!</button>
      <button className="btn bg-success">click me!</button>
      <button className="btn btn-lg bg-success">click me!</button>

      <button className="btn-outline btn-outline-sm">click me!</button>
      <button className="btn-outline">click me!</button>
      <button className="btn-outline btn-outline-lg">click me!</button>
      <div className="max-w-5xl with-border">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi asperiores hic accusantium nisi corporis
          dolores itaque quia, dolorem culpa quasi nesciunt reprehenderit quod omnis explicabo ratione saepe laudantium!
          Numquam, quam?
        </p>
      </div>
      <div className="max-w-5xl">
        <p className="text-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi asperiores hic accusantium nisi corporis
          dolores itaque quia, dolorem culpa quasi nesciunt reprehenderit quod omnis explicabo ratione saepe laudantium!
          Numquam, quam?
        </p>
      </div>
      <a href="www.google.cl" className="link">
        go to Google!
      </a>
      <div className="w-60 h-20 card flex justify-center items-center">
        <div className="w-40 h-10 inner-card"></div>
      </div>
    </div>
  );
};

export default Palette;
