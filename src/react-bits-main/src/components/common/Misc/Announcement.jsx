import { useState, useEffect, useCallback } from 'react';
import { FiX, FiShare2 } from 'react-icons/fi';

const Announcement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const announcementMessage = "";

  const STORAGE_KEYS = {
    lastMessage: 'announcement-last-message',
    userClosed: 'announcement-user-closed'
  };

  const parseMessageWithLinks = useCallback((message) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(message)) !== null) {
      if (match.index > lastIndex) {
        parts.push(message.substring(lastIndex, match.index));
      }

      const [, linkText, linkUrl] = match;
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          className="announcement-link"
          target={linkUrl.startsWith('http') ? '_blank' : '_self'}
          rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {linkText}
        </a>
      );

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < message.length) {
      parts.push(message.substring(lastIndex));
    }

    return parts.length > 0 ? parts : message;
  }, []);

  const checkIfMobile = useCallback(() => {
    return window.innerWidth < 768 || 'ontouchstart' in window;
  }, []);

  useEffect(() => {
    const lastStoredMessage = localStorage.getItem(STORAGE_KEYS.lastMessage);
    const userClosed = localStorage.getItem(STORAGE_KEYS.userClosed) === 'true';

    const shouldShow = (
      lastStoredMessage !== announcementMessage ||
      !lastStoredMessage ||
      (lastStoredMessage === announcementMessage && !userClosed)
    );

    if (shouldShow) {
      setIsVisible(true);

      localStorage.setItem(STORAGE_KEYS.lastMessage, announcementMessage);

      if (lastStoredMessage !== announcementMessage) {
        localStorage.removeItem(STORAGE_KEYS.userClosed);
      }
    }

    setIsMobile(checkIfMobile());

    const handleResize = () => {
      setIsMobile(checkIfMobile());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkIfMobile, announcementMessage, STORAGE_KEYS.lastMessage, STORAGE_KEYS.userClosed]);

  const closeAnnouncement = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEYS.userClosed, 'true');
  };

  const shareToX = useCallback((text) => {
    const tweetText = encodeURIComponent(text);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, '_blank');
  }, []);

  const handleShare = useCallback(async () => {
    const shareText = announcementMessage.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');

    if (isMobile) {
      if (navigator.share) {
        try {
          const response = await fetch('/vue-bits.jpg');
          const blob = await response.blob();
          const file = new File([blob], 'vue-bits.jpg', { type: 'image/jpeg' });

          await navigator.share({
            title: 'Vue Bits - Official Vue Port of React Bits',
            text: shareText,
            files: [file]
          });
        } catch (error) {
          try {
            await navigator.share({
              title: 'Vue Bits - Official Vue Port of React Bits',
              text: shareText,
              url: window.location.origin
            });
          } catch (fallbackError) {
            console.log('Sharing failed:', fallbackError);
          }
        }
      }
    } else {
      const twitterText = announcementMessage.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$2');
      shareToX(twitterText);
    }
  }, [announcementMessage, isMobile, shareToX]);

  if (!announcementMessage || announcementMessage.trim() === '') {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        {parseMessageWithLinks(announcementMessage)}
      </div>
      <div className="announcement-actions">
        <button
          onClick={handleShare}
          className="announcement-share"
          aria-label={isMobile ? "Share" : "Share on X"}
        >
          <FiShare2 size={16} />
          <span className="announcement-share-text">
            {isMobile ? "Share" : "Share on X"}
          </span>
        </button>
        <button
          onClick={closeAnnouncement}
          className="announcement-close"
          aria-label="Close announcement"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
};

export default Announcement;