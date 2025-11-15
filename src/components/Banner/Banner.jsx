import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="mt-28 md:mt-8">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[300px] md:h-[500px]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex items-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1600&q=80')",
            }}
          >
            <div className="w-full h-full bg-black/50 flex items-center">
              <div className="container mx-auto px-6 md:px-12 lg:px-20 text-white">
                <h2 className="text-4xl md:text-6xl font-bold">
                  Build Better Habits
                </h2>
                <p className="max-w-lg mt-4 text-gray-200">
                  HabitSpark helps you create consistency, track your progress,
                  and stay motivated every single day.
                </p>
                <div className="mt-6 flex gap-3">
                  <Link
                    to="/AddHabbit"
                    className="btn bg-orange-500 border-none text-white hover:bg-orange-600"
                  >
                    Start a Habit
                  </Link>
                  <Link
                    to="/PublicHabbits"
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-orange-600"
                  >
                    Explore Habits
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex items-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80')",
            }}
          >
            <div className="w-full h-full bg-black/50 flex items-center justify-center text-center px-6">
              <div className="text-white max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold">
                  Track. Improve. Succeed.
                </h2>
                <p className="mt-4 text-gray-200">
                  Every small action counts. Track your daily progress and watch
                  your growth over time.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    to="/MyHabbit"
                    className="btn bg-white text-orange-600 border-none hover:bg-orange-100"
                  >
                    My Habits
                  </Link>
                  <Link
                    to="/AddHabbit"
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-orange-600"
                  >
                    Add Habit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex items-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1600&q=80')",
            }}
          >
            <div className="w-full h-full bg-black/50 flex items-center">
              <div className="container mx-auto px-6 md:px-12 lg:px-20 text-white text-right">
                <h2 className="text-4xl md:text-6xl font-bold text-center md:text-right">
                  Join the Community
                </h2>
                <p className="max-w-lg ml-auto mt-4 text-gray-200">
                  Discover public habits, get inspired by others, and share your
                  journey. Together we grow.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <Link
                    to="/PublicHabbits"
                    className="btn bg-orange-500 border-none text-white hover:bg-orange-600"
                  >
                    View Public Habits
                  </Link>
                  <Link
                    to="/AddHabbit"
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-orange-600"
                  >
                    Create Yours
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
