import {useContext} from "react";

import MetadataContext from "../../contexts/metadata";

export default function Footer() {
  const { author, githubUrl } = useContext(MetadataContext)
  return (
    <div className="absolute bottom-0 flex">
      <footer className="mb-2 rounded-md shadow bg-gray-800">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">By {author} @
          <a href={githubUrl} target="_blank" className="hover:underline" rel="noreferrer"> {githubUrl}</a>
        </span>
      </footer>
    </div>
  );
}
