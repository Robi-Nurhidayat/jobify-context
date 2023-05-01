import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";

function Landing() {
  return (
    <main>
      <nav>
        <img src={logo} alt="jobify" className="logo" />
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span>
            app
          </h1>

          <p>
            I'm baby pabst ennui hell of you probably haven't heard of them.
            Next level vape biodiesel, solarpunk authentic lo-fi artisan poke
            roof party fixie photo booth PBR&B fanny pack. Lomo yr bitters,
            irony retro dreamcatcher echo park cardigan shabby chic subway tile.
          </p>

          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </main>
  );
}

export default Landing;
