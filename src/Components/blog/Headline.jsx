import React from "react";
import headline1 from "../../assets/blog/headline/headline1.jpeg";
import headline2 from "../../assets/blog/headline/headline2.jpeg";
import tutorials from "../../assets/blog/headline/tutorials.png";
import community from "../../assets/blog/headline/community.png";
import contest from "../../assets/blog/headline/contests.png";
import guides from "../../assets/blog/headline/guides.png";
import inspiration from "../../assets/blog/headline/inspiration.png";

import headline3 from "../../assets/blog/headline/headline3.jpeg";
import "../../styles/blog/headline.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";

export default function Headline() {
  return (
    <div className="container headline py-2">
      <div className="row">
        <div className="col-lg-6 gap-2 p-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-2 bg-dark text-white position-relative">
                <img src={headline1} className="card-img" alt="..." />

                {/* Styled Timer at Top Right */}
                <div className="timer position-absolute top-0 end-0 m-2 p-1 d-flex align-items-center">
                  <div>From the team</div>
                  <div className="d-flex align-items-center ms-2">
                    <CiClock2 />
                    <span className="ms-1">10 min ago</span>
                  </div>
                </div>

                <div className="card-img-overlay d-flex flex-column justify-content-end">
                  <div className="content px-3">
                    <div className="d-flex justify-content-between">
                      <div>JC Coach Collins</div>
                      <div>2 weeks ago</div>
                    </div>
                    <p className="card-text lg:text-xs text-[10px]">
                      "I built Studiosphere 360 on a foundation of over 25 years
                      in the music industry—from running acclaimed educational
                      institutions to mentoring the next generation of talent.
                      This platform is designed for those who aren’t afraid to
                      push boundaries and challenge the status quo. Welcome to
                      the revolution—let’s redefine what’s possible in music
                      together." — JC Coach Collins With his deep industry roots
                      and no-nonsense approach, JC Coach Collins is the
                      visionary steering this ship. His commitment to empowering
                      creators and reshaping the music business is evident in
                      every facet of Studiosphere 360.
                    </p>
                    <div className="d-flex justify-content-end">
                      <div className="d-flex align-items-center py-1 gap-2 article_button px-3">
                        <span>Read On</span>
                        <FaLongArrowAltRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-2 bg-dark text-white position-relative">
                <img src={headline2} className="card-img" alt="..." />

                {/* Styled Timer at Top Right */}
                <div className="timer position-absolute top-0 end-0 m-2 p-1 d-flex align-items-center">
                  <div>From the team</div>
                  <div className="d-flex align-items-center ms-2">
                    <CiClock2 />
                    <span className="ms-1">10 min ago</span>
                  </div>
                </div>

                <div className="card-img-overlay d-flex flex-column justify-content-end">
                  <div className="content px-3">
                    <div className="d-flex justify-content-between">
                      <div>Blaze Hunter</div>
                      <div>2 weeks ago</div>
                    </div>
                    <p className="card-text lg:text-xs text-[10px]">
                      "Innovation in music isn’t just about new sounds—it’s
                      about new ways of thinking. At Studiosphere 360, we’re
                      tearing down the traditional barriers that have long
                      stifled creativity. I’m proud to be part of a movement
                      that gives artists the tools to create freely and succeed
                      on their own terms. Let’s blaze a trail into the future of
                      music together." — Blaze Hunter Blaze Hunter brings a
                      fierce passion for creative freedom and technological
                      innovation to our team. His insights and forward-thinking
                      vision help fuel the dynamic, transformative experience
                      that defines Studiosphere 360.
                    </p>
                    <div className="d-flex justify-content-end">
                      <div className="d-flex align-items-center py-1 gap-2 article_button px-3">
                        <span>Read On</span>
                        <FaLongArrowAltRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-2 bg-dark text-white position-relative">
                <img src={headline3} className="card-img" alt="..." />

                {/* Styled Timer at Top Right */}
                <div className="timer position-absolute top-0 end-0 m-2 p-1 d-flex align-items-center">
                  <div>From the team</div>
                  <div className="d-flex align-items-center ms-2">
                    <CiClock2 />
                    <span className="ms-1">10 min ago</span>
                  </div>
                </div>

                <div className="card-img-overlay d-flex flex-column justify-content-end">
                  <div className="content px-3">
                    <div className="d-flex justify-content-between">
                      <div>Join the Movement</div>
                      <div>2 weeks ago</div>
                    </div>
                    <p className="card-text lg:text-xs text-[10px]">
                      Studiosphere 360 is more than a service—it’s the future of
                      music creation and business innovation. With JC Coach
                      Collins, Blaze Hunter, and the entire Studiosphere team
                      leading the charge, you’re now part of a transformative
                      journey that will change the way music is recorded,
                      created, and experienced. Thank you for joining us. Stay
                      tuned for more insights, updates, and behind-the-scenes
                      looks at how we’re continually pushing the envelope.
                      Welcome to Studiosphere 360—let’s create the future
                      together.
                    </p>
                    <div className="d-flex justify-content-end">
                      <div className="d-flex align-items-center py-1 gap-2 article_button px-3">
                        <span>Read On</span>
                        <FaLongArrowAltRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 backgroundImage">
          <div className="row">
            <div className="text-white py-2">
              <h1>
                <p className="text-xl">Find Your Topic</p>
              </h1>
            </div>
            <div className="col-lg-6 my-1">
              <div className="card card_section text-center">
                <div className="data">
                  <img src={tutorials} alt="Tutorials" />
                  <div>Tutorials</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 my-1">
              <div className="card card_section text-center">
                <div className="data">
                  <img src={community} alt="Tutorials" />
                  <div>Community</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row py-2">
            <div className="col-lg-6 my-1">
              <div className="card py-1 card_section text-center">
                <div className="data">
                  <img src={guides} alt="Tutorials" />
                  <div>Guides</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 my-1">
              <div className="card card_section text-center">
                <div className="data">
                  <img src={contest} alt="Tutorials" />
                  <div>Contests</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gap-2">
            <div className="col-lg-6 my-1">
              <div className="card card_section text-center">
                <div className="data">
                  <img src={inspiration} alt="Tutorials" />
                  <div>Inspirations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
