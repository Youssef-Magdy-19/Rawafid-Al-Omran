import { Link } from 'react-router-dom';
import { Home, Search, FileQuestion } from 'lucide-react';
import { Button } from '@components';

export function NotFoundPage() {

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Display */}
        <div className="mb-8">
          <div className="text-[150px] md:text-[200px] font-bold text-gray-100 leading-none select-none">
            404
          </div>
          <div className="-mt-16 md:-mt-24 relative">
            <FileQuestion className="h-24 w-24 md:h-32 md:w-32 text-primary-500 mx-auto" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Home className="h-5 w-5" />}
            >
              Back to Home
            </Button>
          </Link>
          <Link to="/search">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Search className="h-5 w-5" />}
            >
              Search
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Or explore these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/services" className="text-primary-500 hover:text-primary-600 hover:underline">
              Services
            </Link>
            <Link to="/projects" className="text-primary-500 hover:text-primary-600 hover:underline">
              Projects
            </Link>
            <Link to="/about" className="text-primary-500 hover:text-primary-600 hover:underline">
              About Us
            </Link>
            <Link to="/blog" className="text-primary-500 hover:text-primary-600 hover:underline">
              Blog
            </Link>
            <Link to="/careers" className="text-primary-500 hover:text-primary-600 hover:underline">
              Careers
            </Link>
            <Link to="/contact" className="text-primary-500 hover:text-primary-600 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}