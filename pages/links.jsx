import React from 'react';
import Body from '../components/Body.jsx'; // Adjust the path as needed
import { MediaLinks } from '../components/data/MediaLinks'; // Adjust the path as needed

const Link = () => {
  return (
    <Body title="Links">
      <h1 className="font-extrabold text-6xl tracking-tight">Links</h1>
      <p className="text-lg">All my profile links to find me on the web.</p>
      <div className="mt-8">
        {MediaLinks.map((links) => (
          <a
            href={links.url}
            aria-label={"Link of Jesse Ropers " + links.name}
            target="_blank"
            className="dark:bg-[#1d1d20] hover:-translate-y-1 duration-150 flex bg-[#e2e8f0] rounded-lg shadow-lg cursor-pointer  pl-3 items-center my-4 p-1"
            key={links.name}
          >
            <p className="font-bold !m-0">{links.name}&thinsp;</p>
            <div className="flex-1" />
            <p className="font-code text-gray-500"> {/* Apply text-gray-500 class here */}
              &thinsp;@<span className="font-code">{links.username}</span>
            </p>
          </a>
        ))}
      </div>
    </Body>
  );
};

export default Link;