import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import PinnedRepos from "./PinnedRepos";
import RecentlyBlog from "./RecentlyBlog";
import Head from "next/head";
import Confetti from "react-dom-confetti";

const firebaseConfig = {
  apiKey: "AIzaSyAFRwmutdSXr2XlY_VROUkN0QRna8kbDvc",
  authDomain: "fresh-squeezed-lemons.firebaseapp.com",
  databaseURL: "https://fresh-squeezed-lemons-default-rtdb.firebaseio.com",
  projectId: "fresh-squeezed-lemons",
  storageBucket: "fresh-squeezed-lemons.appspot.com",
  messagingSenderId: "680668621920",
  appId: "1:680668621920:web:df718ab12a9a62eda4e705",
  measurementId: "G-BWS491WFX8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export default function HomePage() {
  const [viewCount, setViewCount] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const fetchAndIncrementViewCount = async () => {
      try {
        const snapshot = await firebase.database().ref("viewCount").once("value");
        const count = snapshot.val();
        setViewCount(count);

        setInterval(() => {
          setCurrentTime(getCurrentTime());
        }, 1000);

        await incrementViewCount();
      } catch (error) {
        console.error("Error fetching view count:", error);
      }
    };

    fetchAndIncrementViewCount();
  }, []);

  const incrementViewCount = async () => {
    try {
      const countRef = firebase.database().ref("viewCount");
      await countRef.transaction((currentCount) => {
        return (currentCount || 0) + 1;
      });
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  const triggerConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
    }, 1000);
  };

  return (
    <main>
      <Head>
        <meta charSet="UTF-8" />
        <title>JesseJesse.com</title>
      </Head>

      <Confetti active={confettiActive} />

      <div className="xs:ml-0 ml-2">
        <div className="flex flex-col-reverse sm:flex-row items-start my-5 ">
          <div className="flex flex-col pr-8">
            <div className="flex items-center">
              <h1 className="font-extrabold mt-6 text-4xl md:text-5xl tracking-tight notranslate">
                Jesse Roper
              </h1>
            </div>

            <div className="flex items-center ml-6">
              <button onClick={triggerConfetti} className="hover:text-green-500 flex items-center">
                {viewCount}
                <img src="https://api.iconify.design/game-icons:protection-glasses.svg?color=%23ffffff" alt="Icon" className="ml-1" />
              </button>
            </div>

            <p className="text-blue-600 dark:text-blue-400 mb-3 ml-6 flex items-center">
              {currentTime}
              <img src="https://api.iconify.design/typcn:watch.svg?color=%23ffffff" alt="Icon" className="ml-1" />
            </p>
          </div>

          <div className="flex-1"></div>

          <div className="w-[130px] sm:w-[140px] relative sm:my-[25px] my-[-15px] sm:mx-0 mx-[-10px] ">
            <Image
              placeholder="blur"
              src={require("/public/jesseroper.jpg")}
              alt="eliaschen"
              className="w-auto rounded-full grayscale"
            />
          </div>
        </div>
      </div>

      <div className="mt-[40px] mb-[20px]">
        <h1 className="tracking-tighter text-4xl mb-6 font-extrabold">Blogs</h1>
        <RecentlyBlog />
      </div>

      <div className="mt-[70px]">
        <h1 className="tracking-tighter text-4xl mb-6 font-extrabold">Repos</h1>
        <PinnedRepos />
      </div>
    </main>
  );
}


          
     
