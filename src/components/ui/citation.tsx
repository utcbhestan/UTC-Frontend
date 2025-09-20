import React from 'react';
import { ExternalLink } from 'lucide-react';

const CitationLink = ({ id, callType, citations }) => {
  const citation = citations[id];

  if (!citation) {
    return null;
  }

  const { title, url, date, siteName, sourceContent } = citation;

  return (
    <div className="mt-2 text-xs sm:text-sm text-gray-600">
      {callType === 'quote' ? (
        <span>
          Source: <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {title}
          </a> ({siteName}, {date})
          <ExternalLink className="inline-block w-3 h-3 ml-1" />
        </span>
      ) : (
        <span>
          [{id}] <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {sourceContent}
          </a> ({siteName}, {date})
          <ExternalLink className="inline-block w-3 h-3 ml-1" />
        </span>
      )}
    </div>
  );
};

export default CitationLink;