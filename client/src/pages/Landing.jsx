import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
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
    </Wrapper>
  );
}

// Wrapper nya ambil dari assets -> Wappers
// const Wrapper = styled.main`
//   nav {
//     width: var(--fluid-width);
//     max-width: var(--max-width);
//     margin: 0 auto;
//     height: var(--nav-height);
//     display: flex;
//     align-items: center;
//   }

//   .page {
//     min-height: calc(100vh - var(--nav-height));
//     display: grid;
//     align-items: center;
//     margin-top: -3rem;
//   }

//   h1 {
//     font-weight: 700;
//     span {
//       color: var(--primary-500);
//     }
//   }

//   p {
//     color: var(--grey-600);
//   }

//   .main-img {
//     display: none;
//   }

//   @media (min-width: 62em) {
//     .page {
//       grid-template-columns: 1fr 1fr;
//       column-gap: 3rem;
//     }

//     .main-img {
//       display: block;
//     }
//   }
// `;

export default Landing;
