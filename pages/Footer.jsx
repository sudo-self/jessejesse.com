import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-center">
      <div className="max-w-screen-md mx-auto py-8">
        <div className="flex items-center justify-center text-md">
          <span className="text-violet-700 mx-1">&#9825;</span>
          <Link 
            href="https://jessejesse.com" 
            className="text-violet-700 font-bold hover:underline ml-1"
          >
            JesseJesse.com
          </Link>
        </div>
      </div>
    </footer>
  );
}