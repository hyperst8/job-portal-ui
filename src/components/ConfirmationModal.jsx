import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info' // 'info', 'warning', 'danger', 'success'
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const cx = (light, dark) => (isDark ? dark : light);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          icon: '⚠️',
          iconBg: cx('bg-yellow-100', 'bg-yellow-900/30'),
          iconColor: cx('text-yellow-600', 'text-yellow-400'),
          confirmBtn: cx('bg-yellow-600 hover:bg-yellow-700', 'bg-yellow-700 hover:bg-yellow-800')
        };
      case 'danger':
        return {
          icon: '🗑️',
          iconBg: cx('bg-red-100', 'bg-red-900/30'),
          iconColor: cx('text-red-600', 'text-red-400'),
          confirmBtn: cx('bg-red-600 hover:bg-red-700', 'bg-red-700 hover:bg-red-800')
        };
      case 'success':
        return {
          icon: '✓',
          iconBg: cx('bg-green-100', 'bg-green-900/30'),
          iconColor: cx('text-green-600', 'text-green-400'),
          confirmBtn: cx('bg-green-600 hover:bg-green-700', 'bg-green-700 hover:bg-green-800')
        };
      default: // info
        return {
          icon: 'ℹ️',
          iconBg: cx('bg-primary-100', 'bg-primary-900/30'),
          iconColor: cx('text-primary-600', 'text-primary-400'),
          confirmBtn: 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className={`relative rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-scale-in ${cx('bg-white', 'bg-gray-800')}`}>
        <div className={`mx-auto w-16 h-16 rounded-full ${styles.iconBg} flex items-center justify-center mb-6`}>
          <span className={`text-3xl ${styles.iconColor}`}>
            {styles.icon}
          </span>
        </div>

        <h3 className={`text-2xl font-bold text-center mb-4 ${cx('text-gray-900', 'text-white')}`}>
          {title}
        </h3>

        <p className={`text-center mb-8 ${cx('text-gray-600', 'text-gray-400')}`}>
          {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`flex-1 px-6 py-3 border-2 rounded-xl font-semibold transition-colors ${cx(
              'border-gray-200 text-gray-700 hover:bg-gray-50',
              'border-gray-600 text-gray-300 hover:bg-gray-700'
            )}`}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-6 py-3 text-white rounded-xl font-semibold transition-colors ${styles.confirmBtn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
