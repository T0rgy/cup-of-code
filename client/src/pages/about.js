import Hero from "../components/Hero";

function About() {
  return (
    <div>
      <Hero />
      <div className="container">
        <img
          className="rounded-circle coffee"
          src="../../images/A_small_cup_of_coffee.JPG"
          alt="coffee"
        />
        <div className="about">
          <h1>About US</h1>
          <p>
            Our roots begin in 2000 where we started off as a corner store with
            basic coffee and tea but now moved to have smoothies and other types of
            drinks. We specialize in our customer service and pride ourselves in
            giving a unique experience to each customer.
          </p>
        </div>

        <div className="about">
          <h1>Our Coffee</h1>
          <p>
            We have coffee from all over the world. We make it fresh with all
            organic ingredients. You can come watch as we make it in front of you.
          </p>
          
        </div>

        <div className="about">
          <h1>Our Food</h1>
          <p>
            We have food from all over the world. We make it fresh with all
            organic ingredients. You can come watch as we make it in front of you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
