import { FaStar, FaPen } from 'react-icons/fa6';
import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import DOMPurify from 'dompurify';

const extensions = [StarterKit];

function renderReviewBody(body) {
  try {
    const json = typeof body === 'string' ? JSON.parse(body) : body;
    const html = generateHTML(json, extensions);
    return DOMPurify.sanitize(html);
  } catch {
    return DOMPurify.sanitize(body ?? '');
  }
}

export default function Review({ userName, rating, date, body, isOwner, onEdit }) {
  const initial = userName?.charAt(0).toUpperCase();
  const shortDate = date?.split('T')[0];

  return (
    <div className='bg-white p-5 rounded-2xl shadow-sm border border-black/5 w-full transition-shadow hover:shadow-md
    min-w-100'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex h-9 w-9 items-center justify-center 
          rounded-full bg-main text-white font-display font-bold text-sm shrink-0'>
            {initial}
          </div>
          <div>
            <p className='font-display font-bold leading-tight'>{userName}</p>
            <p className='font-display text-xs text-gray-400'>{shortDate}</p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='flex gap-0.5'>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < rating ? 'text-[#E4B65F]' : 'text-gray-200'}
                size={14}
              />
            ))}
          </div>

          {isOwner && (
            <button
              onClick={onEdit}
              aria-label='Edit review'
              className='flex h-7 w-7 items-center justify-center rounded-full text-gray-400
              hover:text-main hover:bg-gray-100 transition-colors shrink-0'
            >
              <FaPen size={12} />
            </button>
          )}
        </div>
      </div>
      <div className='reviewBody mt-3 text-gray-600 text-sm leading-relaxed'
        dangerouslySetInnerHTML={{ __html: renderReviewBody(body) }} />
    </div>
  );
}