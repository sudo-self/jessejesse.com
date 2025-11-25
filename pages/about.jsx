import React from "react";
import Body from "/components/Body.jsx";
import Image from "next/image";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";

const About = () => {
  return (
    <Body title="About">
      <h1 className="font-extrabold text-6xl tracking-tight">About Me</h1>
      <div className="mt-5">
        <h2 className="text-lg">
          Veteran Developer & IT Professional.
        </h2>
      </div>
      <br />

      {/* Military Service Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-blue-600">Military Service</h2>
        <p>
          Having served in the military, I've gained invaluable experience and
          skills that have shaped my character and work ethic. The discipline,
          teamwork, and problem-solving abilities I honed during my service
          continue to influence my approach to various aspects of life and
          work.
        </p>
      </section>

      {/* Education Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-green-600">Education</h2>
        <p>
          I graduated from Colorado Technical University with a Bachelor's
          degree in Information Technology in 2022. Currently, I'm pursuing my
          Master's degree in Information Technology to further expand my
          knowledge and expertise in the IT domain.
        </p>
      </section>

      {/* IT Professional Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-red-600">IT Professional</h2>
        <p>
          Combining my military background with my academic achievements, I've
          embarked on a fulfilling journey in the world of Information
          Technology. With a focus on networking, I've had the opportunity to
          work on diverse projects and collaborate with talented individuals
          across different spaces.
        </p>
      </section>

      {/* Writing on Dev.to Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-yellow-600">Writing on Dev.to</h2>
        <p>
          In addition to my IT career, I enjoy sharing my knowledge and insights
          through writing. You can often find me on{" "}
          <Link
            href="https://dev.to/sudo-self/"
            className="underline decoration-2 decoration-wavy font-bold underline-offset-6"
          >
            Dev.to
          </Link>
          , where I contribute articles on various Java frameworks and tech
          topics. Writing allows me to connect with a wider audience and
          contribute to the vibrant developer community.
        </p>
      </section>

      {/* What You'll Find Here Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-purple-600">
          What You'll Find Here
        </h2>
        <p>
          On this website, you'll discover a blend of my professional
          experiences, tech-related articles, and perhaps even some personal
          reflections. Whether you're here to learn something new, gain insights
          into the tech industry, or simply explore different perspectives, I
          hope you find value in what I have to offer.
        </p>
      </section>

      {/* Stack Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-teal-600">Stack</h2>
        <p>
          This entire stack is built with JSX and Next.js using the App Router.
          Several APIs are integrated, including Github, Dev.to, and Youtube.
          The guestbook is authenticated using Google Firebase. The website is
          styled with Tailwind CSS and deployed via Vercel, with DNS managed
          through Cloudflare. Next.js enables the creation of full-stack web
          applications with speed and accuracy.
        </p>
      </section>

      {/* Badges Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">Developer Badges</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Image
            src="https://github.com/sudo-self/sudo-self/assets/119916323/591566e1-cd9a-445c-9d0b-82ca60b4c37f"
            alt="Pull Shark"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <Image
            src="https://github.com/sudo-self/sudo-self/assets/119916323/9d692e82-ae9f-4703-9355-74a0e8bebbfe"
            alt="Quickdraw"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <Image
            src="https://github.com/sudo-self/sudo-self/assets/119916323/5c4f6626-7c67-4277-97a6-b67b77d08953"
            alt="Starstruck"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <Image
            src="https://github.com/sudo-self/sudo-self/assets/119916323/f135932f-d44f-4bb9-b72a-ac23219112bc"
            alt="Yolo"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <Image
            src="https://github.com/user-attachments/assets/4962670c-d88b-4bfd-8697-753044e16c33"
            alt="Dev Badge 3"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <Image
            src="https://github.com/user-attachments/assets/3aa8db8c-ec26-4248-85a2-a147c1b74e06"
            alt="Dev Badge 2"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <Image
            src="https://github.com/user-attachments/assets/a3a9c3b1-4389-4ccb-a6d7-c48ef81ea222"
            alt="Dev Badge 1"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <Image
            src="https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/Android%20studio.svg"
            alt="Android Studio"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <Image
            src="https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/gdeveloper.svg"
            alt="Google Developer"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <Image
            src="https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/firebase.svg"
            alt="Firebase"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <Image
            src="https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/Image%205.jpg"
            alt="Development Badge"
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
      </section>
    </Body>
  );
};

export default About;
